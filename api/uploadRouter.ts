import { z } from "zod";
import { createRouter, publicQuery } from "./middleware";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { randomUUID } from "crypto";

// R2 config from env vars
const R2_ENDPOINT = process.env.R2_ENDPOINT || "";
const R2_ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID || "";
const R2_SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY || "";
const R2_BUCKET_NAME = process.env.R2_BUCKET_NAME || "createshape3d-images";
const R2_PUBLIC_URL = process.env.R2_PUBLIC_URL || "";

function getR2Client() {
  return new S3Client({
    region: "auto",
    endpoint: R2_ENDPOINT,
    credentials: {
      accessKeyId: R2_ACCESS_KEY_ID,
      secretAccessKey: R2_SECRET_ACCESS_KEY,
    },
  });
}

function isR2Configured() {
  return !!(R2_ENDPOINT && R2_ACCESS_KEY_ID && R2_SECRET_ACCESS_KEY);
}

export const uploadRouter = createRouter({
  upload: publicQuery
    .input(z.object({
      filename: z.string(),
      data: z.string(), // base64
      mimeType: z.string(),
    }))
    .mutation(async ({ input }) => {
      const ext = input.filename.split('.').pop() || 'png';
      const safeName = `${randomUUID()}.${ext}`;
      
      // Decode base64
      const buffer = Buffer.from(input.data.split(',')[1] || input.data, 'base64');
      
      if (isR2Configured()) {
        // Upload to Cloudflare R2
        const client = getR2Client();
        await client.send(new PutObjectCommand({
          Bucket: R2_BUCKET_NAME,
          Key: safeName,
          Body: buffer,
          ContentType: input.mimeType,
        }));
        
        // Build public URL
        const publicUrl = R2_PUBLIC_URL 
          ? `${R2_PUBLIC_URL.replace(/\/$/, '')}/${safeName}`
          : `${R2_ENDPOINT}/${R2_BUCKET_NAME}/${safeName}`;
        
        return {
          url: publicUrl,
          filename: safeName,
          size: buffer.length,
        };
      } else {
        // Fallback: save to local filesystem (for development)
        const { writeFile, mkdir } = await import("fs/promises");
        const { existsSync } = await import("fs");
        const { join } = await import("path");
        const uploadDir = join(process.cwd(), "public", "uploads");
        
        if (!existsSync(uploadDir)) {
          await mkdir(uploadDir, { recursive: true });
        }
        
        const filepath = join(uploadDir, safeName);
        await writeFile(filepath, buffer);
        
        return {
          url: `/uploads/${safeName}`,
          filename: safeName,
          size: buffer.length,
        };
      }
    }),
});

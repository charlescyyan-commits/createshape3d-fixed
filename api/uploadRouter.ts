import { z } from "zod";
import { createRouter, adminQuery, publicQuery } from "./middleware";
import { writeFile, mkdir } from "fs/promises";
import { existsSync } from "fs";
import { join } from "path";
import { randomUUID } from "crypto";

const UPLOAD_DIR = join(process.cwd(), "public", "uploads");

async function ensureDir() {
  if (!existsSync(UPLOAD_DIR)) {
    await mkdir(UPLOAD_DIR, { recursive: true });
  }
}

export const uploadRouter = createRouter({
  upload: publicQuery
    .input(z.object({
      filename: z.string(),
      data: z.string(), // base64
      mimeType: z.string(),
    }))
    .mutation(async ({ input }) => {
      await ensureDir();
      
      const ext = input.filename.split('.').pop() || 'png';
      const safeName = `${randomUUID()}.${ext}`;
      const filepath = join(UPLOAD_DIR, safeName);
      
      // Decode base64 and save
      const buffer = Buffer.from(input.data.split(',')[1] || input.data, 'base64');
      await writeFile(filepath, buffer);
      
      return {
        url: `/uploads/${safeName}`,
        filename: safeName,
        size: buffer.length,
      };
    }),
});

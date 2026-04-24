import { useState, useRef } from 'react';
import { Upload, Loader2, X, GripVertical } from 'lucide-react';
import { trpc } from '@/providers/trpc';
import { toast } from 'sonner';

interface MultiImageUploadProps {
  images: string[];
  onChange: (images: string[]) => void;
  maxImages?: number;
}

export default function MultiImageUpload({ images, onChange, maxImages = 8 }: MultiImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const uploadMutation = trpc.upload.upload.useMutation();

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    if (images.length + files.length > maxImages) {
      toast.error(`Maximum ${maxImages} images allowed`);
      return;
    }

    setUploading(true);
    const newUrls: string[] = [];

    for (const file of Array.from(files)) {
      if (!file.type.startsWith('image/')) {
        toast.error(`${file.name} is not an image`);
        continue;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast.error(`${file.name} exceeds 5MB`);
        continue;
      }

      try {
        const base64 = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });

        const result = await uploadMutation.mutateAsync({
          filename: file.name,
          data: base64,
          mimeType: file.type,
        });
        newUrls.push(result.url);
        toast.success(`${file.name} uploaded`);
      } catch (err: any) {
        toast.error(err.message || `Failed to upload ${file.name}`);
      }
    }

    if (newUrls.length > 0) {
      onChange([...images, ...newUrls]);
    }
    setUploading(false);
    if (inputRef.current) inputRef.current.value = '';
  };

  const removeImage = (index: number) => {
    onChange(images.filter((_, i) => i !== index));
  };

  const moveImage = (from: number, to: number) => {
    if (to < 0 || to >= images.length) return;
    const newImages = [...images];
    const [moved] = newImages.splice(from, 1);
    newImages.splice(to, 0, moved);
    onChange(newImages);
  };

  return (
    <div>
      <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
        {/* Existing images */}
        {images.map((url, index) => (
          <div key={`${url}-${index}`} className="relative group aspect-square">
            <img
              src={url}
              alt={`Product ${index + 1}`}
              className={`w-full h-full object-cover rounded-lg border ${index === 0 ? 'border-blue-500 ring-2 ring-blue-100' : 'border-neutral-200'}`}
            />
            {index === 0 && (
              <span className="absolute top-1 left-1 bg-blue-600 text-white text-[10px] px-1.5 py-0.5 rounded font-medium">Main</span>
            )}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-1">
              <button
                type="button"
                onClick={() => moveImage(index, index - 1)}
                disabled={index === 0}
                className="p-1 bg-white rounded hover:bg-neutral-100 disabled:opacity-30"
                title="Move left"
              >
                <GripVertical className="w-3 h-3 rotate-90" />
              </button>
              <button
                type="button"
                onClick={() => moveImage(index, index + 1)}
                disabled={index === images.length - 1}
                className="p-1 bg-white rounded hover:bg-neutral-100 disabled:opacity-30"
                title="Move right"
              >
                <GripVertical className="w-3 h-3 -rotate-90" />
              </button>
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="p-1 bg-white rounded hover:bg-red-50 text-red-500"
                title="Remove"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}

        {/* Upload button */}
        {images.length < maxImages && (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className="aspect-square border-2 border-dashed border-neutral-300 rounded-lg flex flex-col items-center justify-center gap-1 hover:border-blue-500 hover:bg-blue-50/50 transition-colors disabled:opacity-50"
          >
            {uploading ? (
              <Loader2 className="w-5 h-5 text-neutral-400 animate-spin" />
            ) : (
              <>
                <Upload className="w-5 h-5 text-neutral-400" />
                <span className="text-[10px] text-neutral-400">Add Image</span>
              </>
            )}
          </button>
        )}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileSelect}
        className="hidden"
      />
      <p className="text-xs text-neutral-400 mt-2">
        First image is the main product image. You can upload up to {maxImages} images. Drag using arrow buttons to reorder.
      </p>
    </div>
  );
}

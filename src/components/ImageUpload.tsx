import { useState, useRef } from 'react';
import { Upload, Loader2, X } from 'lucide-react';
import { trpc } from '@/providers/trpc';
import { toast } from 'sonner';

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  className?: string;
}

export default function ImageUpload({ value, onChange, className = '' }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const uploadMutation = trpc.upload.upload.useMutation();

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image must be less than 5MB');
      return;
    }

    setUploading(true);
    try {
      // Convert to base64
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64 = reader.result as string;
        try {
          const result = await uploadMutation.mutateAsync({
            filename: file.name,
            data: base64,
            mimeType: file.type,
          });
          onChange(result.url);
          toast.success('Image uploaded successfully');
        } catch (err: any) {
          toast.error(err.message || 'Upload failed');
        } finally {
          setUploading(false);
        }
      };
      reader.readAsDataURL(file);
    } catch {
      setUploading(false);
      toast.error('Failed to read file');
    }
  };

  return (
    <div className={className}>
      {value ? (
        <div className="relative">
          <img
            src={value}
            alt="Product"
            className="w-full aspect-square object-cover rounded-xl border border-neutral-200"
          />
          <button
            onClick={() => onChange('')}
            className="absolute top-2 right-2 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center shadow-sm hover:bg-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <button
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="w-full aspect-square border-2 border-dashed border-neutral-300 rounded-xl flex flex-col items-center justify-center gap-2 hover:border-blue-500 hover:bg-blue-50/50 transition-colors disabled:opacity-50"
        >
          {uploading ? (
            <Loader2 className="w-8 h-8 text-neutral-400 animate-spin" />
          ) : (
            <>
              <Upload className="w-8 h-8 text-neutral-400" />
              <span className="text-sm text-neutral-500">Click to upload</span>
              <span className="text-xs text-neutral-400">PNG, JPG up to 5MB</span>
            </>
          )}
        </button>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />
    </div>
  );
}

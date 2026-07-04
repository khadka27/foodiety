"use client";

import { useState, useRef, DragEvent, ChangeEvent, useEffect } from "react";
import { UploadCloud, X, Image as ImageIcon, Link as LinkIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface ImageUploadProps {
  onUpload: (
    uploaded: string | Array<{ src: string; alt: string; title: string }>,
    metadata?: { alt: string; title: string }
  ) => void;
  multiple?: boolean;
  value?: string | string[];
  label?: string;
  directory?: string; // Target directory on server (e.g. services, gallery, recipes, restaurants, cms)
}

export function ImageUpload({
  onUpload,
  multiple = false,
  value,
  label,
  directory = "cms",
}: ImageUploadProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [previews, setPreviews] = useState<string[]>([]);
  const [urlValue, setUrlValue] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Synchronize internal previews state when value prop changes (e.g., on form reset or item change)
  useEffect(() => {
    if (multiple) {
      setPreviews(Array.isArray(value) ? value : []);
    } else {
      if (typeof value === "string" && value) {
        setPreviews([value]);
        // Set urlValue only if it's a standard URL (not a base64 string)
        setUrlValue(value.startsWith("data:image/") ? "" : value);
      } else {
        setPreviews([]);
        setUrlValue("");
      }
    }
  }, [value, multiple]);

  const processFiles = (files: FileList) => {
    const validImageFiles = Array.from(files).filter((file) => file.type.startsWith("image/"));

    if (validImageFiles.length === 0) {
      toast.error("Please drop or select valid image files.");
      return;
    }

    // Process all files and upload to the server
    const uploadPromises = validImageFiles.map((file) => {
      return new Promise<{ src: string; alt: string; title: string }>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = async (e) => {
          const base64 = e.target?.result as string;
          try {
            const res = await fetch("/api/upload", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                file: base64,
                filename: file.name,
                directory: directory,
              }),
            });
            const json = await res.json();
            if (json.success && json.data) {
              resolve({
                src: json.data.url,
                alt: json.data.alt,
                title: json.data.title,
              });
            } else {
              reject(new Error(json.error || "Upload failed"));
            }
          } catch (err) {
            reject(err);
          }
        };
        reader.onerror = () => reject(new Error("File reading failed"));
        reader.readAsDataURL(file);
      });
    });

    toast.promise(Promise.all(uploadPromises), {
      loading: "Uploading and processing image(s)...",
      success: (results) => {
        const newSrcs = results.map((r) => r.src);
        if (multiple) {
          const updatedPreviews = [...previews, ...newSrcs];
          setPreviews(updatedPreviews);
          // Pass full array of objects for bulk gallery creation
          const allItems = [
            ...previews.map((src) => ({ src, alt: "Gallery Photo", title: "Gallery Photo" })),
            ...results,
          ];
          onUpload(allItems);
        } else {
          setPreviews([results[0].src]);
          setUrlValue(results[0].src);
          onUpload(results[0].src, { alt: results[0].alt, title: results[0].title });
        }
        return `Successfully uploaded ${results.length} image(s)!`;
      },
      error: (err) => `Upload failed: ${err.message || err}`,
    });
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(e.dataTransfer.files);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFiles(e.target.files);
    }
  };

  const triggerBrowse = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveImage = (index: number) => {
    const updated = previews.filter((_, i) => i !== index);
    setPreviews(updated);
    if (multiple) {
      const allItems = updated.map((src) => ({ src, alt: "Gallery Photo", title: "Gallery Photo" }));
      onUpload(allItems);
    } else {
      setUrlValue("");
      onUpload("");
    }
  };

  const handleUrlInputChange = (val: string) => {
    setUrlValue(val);
    if (!multiple) {
      onUpload(val);
    }
  };

  const handleAddUrl = () => {
    if (urlValue.trim()) {
      const cleanUrl = urlValue.trim();
      const updatedPreviews = [...previews, cleanUrl];
      setPreviews(updatedPreviews);

      // Extract filename from URL as simple alt text
      let filename = "External Photo";
      try {
        const urlObj = new URL(cleanUrl);
        const pathParts = urlObj.pathname.split("/");
        const lastPart = pathParts[pathParts.length - 1];
        if (lastPart) {
          filename = lastPart.split("?")[0] || "External Photo";
        }
      } catch (_) {}

      const allItems = [
        ...previews.map((src) => ({ src, alt: "Gallery Photo", title: "Gallery Photo" })),
        { src: cleanUrl, alt: filename, title: filename },
      ];
      onUpload(allItems);
      setUrlValue("");
      toast.success("Image URL added to list!");
    }
  };

  return (
    <div className="space-y-3 w-full">
      {label && <label className="text-xs font-bold text-muted-foreground uppercase">{label}</label>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Local device upload */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={triggerBrowse}
          className={`border-2 border-dashed rounded-3xl p-5 text-center cursor-pointer transition-all duration-300 flex flex-col items-center justify-center space-y-2 bg-muted/5 min-h-[140px] ${
            isDragOver
              ? "border-[#c05c31] bg-[#c05c31]/5 shadow-inner"
              : "border-border hover:border-[#c05c31]/60 hover:bg-muted/15"
          }`}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            multiple={multiple}
            accept="image/*"
            className="hidden"
          />
          <UploadCloud
            className={`h-8 w-8 transition-colors ${
              isDragOver ? "text-[#c05c31]" : "text-muted-foreground"
            }`}
          />
          <div className="space-y-1">
            <p className="text-xs font-bold text-foreground">
              Drag & drop local image, or <span className="text-[#c05c31]">browse</span>
            </p>
            <p className="text-[9px] text-muted-foreground">Supports PNG, JPG, GIF up to 5MB</p>
          </div>
        </div>

        {/* URL Input option */}
        <div className="flex flex-col justify-center p-5 border rounded-3xl border-border bg-muted/5 space-y-3 min-h-[140px]">
          <div className="space-y-1">
            <h4 className="text-xs font-bold text-foreground flex items-center gap-1.5">
              <LinkIcon size={12} className="text-[#c05c31]" />
              Paste Image URL
            </h4>
            <p className="text-[10px] text-muted-foreground">Link an external photo address</p>
          </div>
          <div className="flex gap-2">
            <Input
              placeholder="https://images.unsplash.com/..."
              value={urlValue}
              onChange={(e) => handleUrlInputChange(e.target.value)}
              className="rounded-xl text-xs bg-background h-9 flex-1"
            />
            {multiple && (
              <Button
                type="button"
                onClick={handleAddUrl}
                className="bg-[#c05c31] hover:bg-[#a64b25] text-white text-xs rounded-xl h-9 px-3"
              >
                Add
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Previews section */}
      {previews.length > 0 && (
        <div className="pt-2 space-y-1">
          <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider">
            Active Image Preview ({previews.length})
          </span>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
            {previews.map((src, idx) => (
              <div
                key={idx}
                className="relative h-20 rounded-2xl overflow-hidden border border-border shadow-sm group"
              >
                <img
                  src={src}
                  className="w-full h-full object-cover"
                  alt="preview"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=300&q=80";
                  }}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-200 flex items-center justify-center">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveImage(idx);
                    }}
                    className="bg-red-500 hover:bg-red-600 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-all duration-200 scale-75 group-hover:scale-100 shadow-md flex items-center justify-center"
                    title="Remove image"
                  >
                    <X size={14} className="stroke-[2.5]" />
                  </button>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-black/60 py-0.5 px-1.5 text-[7px] text-white truncate text-center group-hover:opacity-0 transition-opacity duration-200">
                  {src.startsWith("/") ? "Saved Local File" : "External URL"}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

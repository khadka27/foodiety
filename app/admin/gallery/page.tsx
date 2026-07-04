"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Trash2, Camera, AlertCircle, Heart, Star, X } from "lucide-react";
import { toast } from "sonner";
import apiClient from "@/lib/api-client";
import { ImageUpload } from "@/components/admin/ImageUpload";

export const dynamic = "force-dynamic";

export default function AdminGalleryManager() {
  const [config, setConfig] = useState<any>(null);
  const [images, setImages] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  // Form states
  const [showForm, setShowForm] = useState(false);
  const [formTitle, setFormTitle] = useState("");
  const [formSrc, setFormSrc] = useState("");
  const [formCategory, setFormCategory] = useState("Dishes");
  const [formFeatured, setFormFeatured] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<Array<{ src: string; alt: string; title: string }>>([]);
  const [galleryCategories, setGalleryCategories] = useState<any[]>([]);

  useEffect(() => {
    setIsMounted(true);
    fetchData();
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/categories?type=GALLERY");
      const json = await res.json();
      if (json.success && json.data) {
        setGalleryCategories(json.data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/config");
      const json = await res.json();
      if (json.success && json.data) {
        setConfig(json.data);
        setImages(json.data.gallery || []);
      }
    } catch (e) {
      console.error(e);
      toast.error("Failed to load gallery data");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveGallery = async (updatedGallery: any[]) => {
    const updatedConfig = { ...config, gallery: updatedGallery };
    try {
      const res = await apiClient.post("/config", updatedConfig);
      if (res.data.success) {
        setConfig(updatedConfig);
        setImages(updatedGallery);
        toast.success("Gallery database updated successfully in database!");
        resetForm();
      }
    } catch (err: any) {
      console.error(err);
      toast.error("Failed to save changes: " + err.message);
    }
  };

  const resetForm = () => {
    setShowForm(false);
    setFormTitle("");
    setFormSrc("");
    setFormCategory(galleryCategories[0]?.name || "Dishes");
    setFormFeatured(false);
    setUploadedImages([]);
  };

  const handleAdd = () => {
    if (uploadedImages.length === 0) {
      toast.error("Please add at least one image (local upload or paste URL).");
      return;
    }

    const newItems = uploadedImages.map((img, idx) => ({
      id: Date.now() + idx,
      title: (uploadedImages.length === 1 && formTitle.trim()) ? formTitle.trim() : img.title,
      src: img.src,
      category: formCategory,
      featured: formFeatured,
      likes: 0
    }));

    const updated = [...newItems, ...images];
    handleSaveGallery(updated);
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to remove this gallery photo?")) {
      const updated = images.filter(img => img.id !== id);
      handleSaveGallery(updated);
    }
  };

  if (!isMounted || isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 rounded-full border-2 border-[#c05c31]/20 border-t-[#c05c31] animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight font-outfit text-gray-800 dark:text-white">Gallery Manager</h2>
          <p className="text-muted-foreground text-sm">Upload, tag, and feature culinary showcase photos rendered on the public website.</p>
        </div>
        {!showForm && (
          <Button onClick={() => setShowForm(true)} className="bg-[#c05c31] hover:bg-[#a64b25] text-white flex items-center gap-2 rounded-xl">
            <Plus size={16} /> Upload Photo
          </Button>
        )}
      </div>

      {showForm && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="p-6 border border-[#c05c31]/20 bg-white dark:bg-gray-800 rounded-3xl shadow-xl space-y-4">
          <div className="flex justify-between items-center border-b pb-2">
            <h3 className="font-bold text-lg text-[#c05c31] dark:text-[#ebc63c]">Upload New Photo</h3>
            <Button size="icon" variant="ghost" onClick={resetForm}><X size={16} /></Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2 flex flex-col justify-between">
              <div className="space-y-2">
                <label className="text-xs font-bold text-muted-foreground uppercase">Photo Title</label>
                <Input 
                  placeholder="e.g. Artisanal Sourdough (optional for bulk)" 
                  value={formTitle} 
                  onChange={e => setFormTitle(e.target.value)} 
                  className="rounded-lg text-xs" 
                  disabled={uploadedImages.length > 1}
                />
                {uploadedImages.length > 1 && (
                  <p className="text-[10px] text-muted-foreground italic">Titles will be auto-generated from filenames in bulk upload mode.</p>
                )}
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-muted-foreground uppercase">Category</label>
                <Select value={formCategory} onValueChange={setFormCategory}>
                  <SelectTrigger className="rounded-lg text-xs bg-background">
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {galleryCategories.map(c => (
                      <SelectItem key={c.id} value={c.name} className="cursor-pointer">{c.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2 md:col-span-2">
              <ImageUpload
                directory="gallery"
                multiple={true}
                value={uploadedImages.map(img => img.src)}
                onUpload={(files) => {
                  if (Array.isArray(files)) {
                    setUploadedImages(files);
                  }
                }}
                label="Gallery Uploads"
              />
            </div>
          </div>
          <div className="flex items-center space-x-2 select-none cursor-pointer">
            <input type="checkbox" id="formFeatured" checked={formFeatured} onChange={e => setFormFeatured(e.target.checked)} className="rounded text-[#c05c31] focus:ring-[#c05c31]/30" />
            <label htmlFor="formFeatured" className="text-xs font-semibold text-foreground/80 cursor-pointer">Highlight this image as a featured card in layout listings</label>
          </div>
          <div className="flex space-x-2 pt-2 justify-end">
            <Button variant="ghost" className="border" onClick={resetForm}>Cancel</Button>
            <Button onClick={handleAdd} className="bg-[#c05c31] hover:bg-[#a64b25] text-white">
              Upload Photo Card
            </Button>
          </div>
        </motion.div>
      )}

      {images.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed rounded-3xl border-border bg-white dark:bg-gray-800">
          <Camera className="mx-auto h-12 w-12 text-muted-foreground opacity-60" />
          <h3 className="mt-4 text-sm font-semibold text-gray-900 dark:text-white">No photos uploaded</h3>
          <p className="mt-1 text-sm text-muted-foreground">Start uploading culinary photos to populate the gallery.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {images.map((img) => (
            <div key={img.id} className="group relative bg-white dark:bg-gray-800 border border-border rounded-3xl shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow">
              <div className="h-48 w-full relative overflow-hidden">
                <img src={img.src} alt={img.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute top-3 left-3 bg-[#ebc63c] text-stone-900 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full shadow-sm">
                  {img.category}
                </div>
                {img.featured && (
                  <div className="absolute top-3 right-3 bg-[#c05c31] text-white p-1 rounded-full shadow-sm">
                    <Star size={12} className="fill-current" />
                  </div>
                )}
              </div>
              <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-sm text-foreground line-clamp-1">{img.title}</h4>
                  <div className="flex items-center gap-1 text-[11px] text-muted-foreground mt-1">
                    <Heart size={11} className="text-[#c05c31] fill-current" /> {img.likes} likes
                  </div>
                </div>
                <div className="pt-3 border-t border-border flex justify-end">
                  <Button size="icon" variant="ghost" className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20" onClick={() => handleDelete(img.id)}>
                    <Trash2 size={14} />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

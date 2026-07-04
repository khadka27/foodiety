"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
 Select,
 SelectContent,
 SelectItem,
 SelectTrigger,
 SelectValue,
} from "@/components/ui/select";
import { Plus, Trash2, Edit, Save, X, Utensils, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import apiClient from "@/lib/api-client";
import { ImageUpload } from "@/components/admin/ImageUpload";

export const dynamic = "force-dynamic";

export default function AdminServicesManager() {
 const [config, setConfig] = useState<any>(null);
 const [services, setServices] = useState<any[]>([]);
 const [isLoading, setIsLoading] = useState(true);
 const [isMounted, setIsMounted] = useState(false);

 // Form states
 const [editingIndex, setEditingIndex] = useState<number | null>(null);
 const [showForm, setShowForm] = useState(false);
 const [formTitle, setFormTitle] = useState("");
 const [formDescription, setFormDescription] = useState("");
 const [formImage, setFormImage] = useState("");
 const [formFeatures, setFormFeatures] = useState("");
 const [formCategory, setFormCategory] = useState("");
 const [serviceCategories, setServiceCategories] = useState<any[]>([]);

 useEffect(() => {
 setIsMounted(true);
 fetchData();
 fetchCategories();
 }, []);

 const fetchCategories = async () => {
 try {
 const res = await fetch("/api/categories?type=SERVICE");
 const json = await res.json();
 if (json.success && json.data) {
 setServiceCategories(json.data);
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
 setServices(json.data.services || []);
 }
 } catch (e) {
 console.error(e);
 toast.error("Failed to load services data");
 } finally {
 setIsLoading(false);
 }
 };

 const handleSaveServices = async (updatedServices: any[]) => {
 const updatedConfig = { ...config, services: updatedServices };
 try {
 const res = await apiClient.post("/config", updatedConfig);
 if (res.data.success) {
 setConfig(updatedConfig);
 setServices(updatedServices);
 toast.success("Services updated successfully in database!");
 resetForm();
 }
 } catch (err: any) {
 console.error(err);
 toast.error("Failed to save changes: " + err.message);
 }
 };

 const resetForm = () => {
 setEditingIndex(null);
 setShowForm(false);
 setFormTitle("");
 setFormDescription("");
 setFormImage("");
 setFormFeatures("");
 setFormCategory(serviceCategories[0]?.name || "");
 };

 const handleOpenEdit = (idx: number) => {
 const s = services[idx];
 setEditingIndex(idx);
 setFormTitle(s.title || "");
 setFormDescription(s.description || "");
 setFormImage(s.image || "");
 setFormFeatures((s.features || []).join(", "));
 setFormCategory(s.category || serviceCategories[0]?.name || "");
 setShowForm(true);
 };

 const handleAddOrUpdate = () => {
 if (!formTitle.trim() || !formDescription.trim()) {
 toast.error("Title and description are required.");
 return;
 }

 const newService = {
 title: formTitle.trim(),
 description: formDescription.trim(),
 image: formImage.trim() || "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80",
 features: formFeatures.split(",").map(f => f.trim()).filter(Boolean),
 category: formCategory || serviceCategories[0]?.name || "Catering",
 gradient: " ",
 glow: "shadow-orange-500/20"
 };

 let updated = [...services];
 if (editingIndex !== null) {
 updated[editingIndex] = newService;
 } else {
 updated.push(newService);
 }

 handleSaveServices(updated);
 };

 const handleDelete = (idx: number) => {
 if (confirm("Are you sure you want to delete this service?")) {
 const updated = services.filter((_, i) => i !== idx);
 handleSaveServices(updated);
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
 <h2 className="text-3xl font-bold tracking-tight font-outfit text-gray-800 dark:text-white">Services Manager</h2>
 <p className="text-muted-foreground text-sm">Create and organize dynamic service cards rendered on the public website.</p>
 </div>
 {!showForm && (
 <Button onClick={() => setShowForm(true)} className="bg-[#c05c31] hover:bg-[#a64b25] text-white flex items-center gap-2 rounded-xl">
 <Plus size={16} /> Add Service
 </Button>
 )}
 </div>

 {showForm && (
 <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="p-6 border border-[#c05c31]/20 bg-white dark:bg-gray-800 rounded-3xl shadow-xl space-y-4">
 <div className="flex justify-between items-center border-b pb-2">
 <h3 className="font-bold text-lg text-[#c05c31] dark:text-[#ebc63c]">{editingIndex !== null ? "Edit Service Card" : "New Service Card"}</h3>
 <Button size="icon" variant="ghost" onClick={resetForm}><X size={16} /></Button>
 </div>
 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
 <div className="space-y-2 flex flex-col justify-between">
 <div className="space-y-2">
 <label className="text-xs font-bold text-muted-foreground uppercase">Service Title</label>
 <Input placeholder="e.g. Fine Dining Catering" value={formTitle} onChange={e => setFormTitle(e.target.value)} className="rounded-lg text-xs" />
 </div>
 <div className="space-y-2">
 <label className="text-xs font-bold text-muted-foreground uppercase">Service Category</label>
 <Select value={formCategory} onValueChange={setFormCategory}>
 <SelectTrigger className="rounded-lg text-xs bg-background">
 <SelectValue placeholder="Select Category" />
 </SelectTrigger>
 <SelectContent>
 {serviceCategories.map(c => (
 <SelectItem key={c.id} value={c.name} className="cursor-pointer">{c.name}</SelectItem>
 ))}
 </SelectContent>
 </Select>
 </div>
 <div className="space-y-2">
 <label className="text-xs font-bold text-muted-foreground uppercase">Features Checklist (comma separated)</label>
 <Input placeholder="Custom Menu, Professional Servers, Free setup" value={formFeatures} onChange={e => setFormFeatures(e.target.value)} className="rounded-lg text-xs" />
 </div>
 </div>
 <div className="space-y-2">
 <ImageUpload
 directory="services"
 value={formImage}
 onUpload={(src, meta) => {
 setFormImage(src as string);
 if (!formTitle && meta?.title) {
 setFormTitle(meta.title);
 }
 }}
 label="Service Image"
 />
 </div>
 </div>
 <div className="space-y-2">
 <label className="text-xs font-bold text-muted-foreground uppercase">Description</label>
 <Textarea placeholder="Describe the service offer..." value={formDescription} onChange={e => setFormDescription(e.target.value)} className="rounded-lg text-xs min-h-[80px]" />
 </div>

 <div className="flex space-x-2 pt-2 justify-end">
 <Button variant="ghost" className="border" onClick={resetForm}>Cancel</Button>
 <Button onClick={handleAddOrUpdate} className="bg-[#c05c31] hover:bg-[#a64b25] text-white flex items-center gap-1.5">
 <Save size={14} /> {editingIndex !== null ? "Update Card" : "Save Card"}
 </Button>
 </div>
 </motion.div>
 )}

 {services.length === 0 ? (
 <div className="text-center py-12 border-2 border-dashed rounded-3xl border-border bg-white dark:bg-gray-800">
 <AlertCircle className="mx-auto h-12 w-12 text-muted-foreground opacity-60" />
 <h3 className="mt-4 text-sm font-semibold text-gray-900 dark:text-white">No services found</h3>
 <p className="mt-1 text-sm text-muted-foreground">Get started by creating a new service offer.</p>
 </div>
 ) : (
 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
 {services.map((s, idx) => (
 <div key={idx} className="bg-white dark:bg-gray-800 border border-border rounded-3xl shadow-md overflow-hidden flex flex-col justify-between hover:shadow-lg transition-shadow">
 <div>
 <div className="h-44 w-full relative">
 <img src={s.image} alt={s.title} className="w-full h-full object-cover" />
 <div className="absolute top-3 left-3 bg-[#c05c31] text-white text-[10px] font-black uppercase px-2 py-0.5 rounded-full">
 {s.badge || "Standard"}
 </div>
 </div>
 <div className="p-5 space-y-3">
 <h4 className="font-bold text-lg text-foreground font-playfair">{s.title}</h4>
 <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">{s.description}</p>
 {s.features?.length > 0 && (
 <div className="space-y-1">
 <p className="text-[10px] font-black uppercase tracking-wider text-[#d97742]">Included features:</p>
 <ul className="text-[11px] text-foreground/80 space-y-0.5">
 {s.features.map((feat: string, i: number) => (
 <li key={i} className="flex items-center gap-1.5 truncate">
 <span className="w-1.5 h-1.5 rounded-full bg-[#ebc63c]" />
 {feat}
 </li>
 ))}
 </ul>
 </div>
 )}
 </div>
 </div>
 <div className="p-5 border-t border-border flex justify-end gap-2 bg-muted/20">
 <Button size="sm" variant="outline" className="flex items-center gap-1.5 text-xs text-foreground" onClick={() => handleOpenEdit(idx)}>
 <Edit size={12} /> Edit
 </Button>
 <Button size="sm" variant="ghost" className="flex items-center gap-1.5 text-xs text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20" onClick={() => handleDelete(idx)}>
 <Trash2 size={12} /> Delete
 </Button>
 </div>
 </div>
 ))}
 </div>
 )}
 </div>
 );
}

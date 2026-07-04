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
import { Plus, Trash2, Edit, Save, X, Tags, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import apiClient from "@/lib/api-client";

export const dynamic = "force-dynamic";

type CategoryType = "RECIPE" | "RESTAURANT" | "GALLERY" | "SERVICE";

interface Category {
  id: string;
  name: string;
  slug: string;
  type: CategoryType;
  createdAt: string;
  updatedAt: string;
}

export default function AdminCategoriesManager() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const [filterType, setFilterType] = useState<string>("ALL");

  // Form states
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formName, setFormName] = useState("");
  const [formType, setFormType] = useState<CategoryType>("RECIPE");

  useEffect(() => {
    setIsMounted(true);
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/categories");
      const json = await res.json();
      if (json.success && json.data) {
        setCategories(json.data);
      }
    } catch (e) {
      console.error(e);
      toast.error("Failed to load categories");
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setShowForm(false);
    setFormName("");
    setFormType("RECIPE");
  };

  const handleOpenEdit = (cat: Category) => {
    setEditingId(cat.id);
    setFormName(cat.name);
    setFormType(cat.type);
    setShowForm(true);
  };

  const handleAddOrUpdate = async () => {
    if (!formName.trim()) {
      toast.error("Category name is required.");
      return;
    }

    const payload = {
      name: formName.trim(),
      type: formType,
    };

    try {
      let res;
      if (editingId) {
        res = await apiClient.put(`/categories/${editingId}`, payload);
        if (res.data.success) {
          toast.success("Category updated successfully!");
        }
      } else {
        res = await apiClient.post("/categories", payload);
        if (res.data.success) {
          toast.success("Category created successfully!");
        }
      }
      fetchCategories();
      resetForm();
    } catch (err: any) {
      console.error(err);
      toast.error(err.response?.data?.error || "Failed to save category");
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this category? Any linked items will keep the category string, but it will be removed from category listings.")) {
      try {
        const res = await apiClient.delete(`/categories/${id}`);
        if (res.data.success) {
          toast.success("Category deleted successfully!");
          fetchCategories();
        }
      } catch (err: any) {
        console.error(err);
        toast.error("Failed to delete category");
      }
    }
  };

  const getTypeBadge = (type: CategoryType) => {
    switch (type) {
      case "RECIPE":
        return <Badge className="bg-orange-500/10 text-orange-500 border border-orange-500/20 uppercase text-[9px] font-bold">Recipes</Badge>;
      case "RESTAURANT":
        return <Badge className="bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 uppercase text-[9px] font-bold">Venues</Badge>;
      case "GALLERY":
        return <Badge className="bg-blue-500/10 text-blue-500 border border-blue-500/20 uppercase text-[9px] font-bold">Gallery</Badge>;
      case "SERVICE":
        return <Badge className="bg-purple-500/10 text-purple-500 border border-purple-500/20 uppercase text-[9px] font-bold">Services</Badge>;
      default:
        return <Badge variant="outline">{type}</Badge>;
    }
  };

  const filteredCategories = categories.filter((cat) => {
    if (filterType === "ALL") return true;
    return cat.type === filterType;
  });

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
          <h2 className="text-3xl font-bold tracking-tight font-outfit text-gray-800 dark:text-white">Categories Manager</h2>
          <p className="text-muted-foreground text-sm">Create and organize dynamic category labels linked across all sections of the application.</p>
        </div>
        {!showForm && (
          <Button onClick={() => setShowForm(true)} className="bg-[#c05c31] hover:bg-[#a64b25] text-white flex items-center gap-2 rounded-xl">
            <Plus size={16} /> Add Category
          </Button>
        )}
      </div>

      {showForm && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="p-6 border border-[#c05c31]/20 bg-white dark:bg-gray-800 rounded-3xl shadow-xl space-y-4">
          <div className="flex justify-between items-center border-b pb-2">
            <h3 className="font-bold text-lg text-[#c05c31] dark:text-[#ebc63c]">{editingId ? "Edit Category" : "New Category"}</h3>
            <Button size="icon" variant="ghost" onClick={resetForm}><X size={16} /></Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-muted-foreground uppercase">Category Name</label>
              <Input placeholder="e.g. Fine Dining, Vegan Appetizers" value={formName} onChange={e => setFormName(e.target.value)} className="rounded-lg text-xs" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-muted-foreground uppercase">Category Type</label>
              <Select value={formType} onValueChange={(val: any) => setFormType(val)}>
                <SelectTrigger className="rounded-lg text-xs bg-background">
                  <SelectValue placeholder="Select Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="RECIPE" className="cursor-pointer">Recipes</SelectItem>
                  <SelectItem value="RESTAURANT" className="cursor-pointer">Restaurants / Venues</SelectItem>
                  <SelectItem value="GALLERY" className="cursor-pointer">Gallery</SelectItem>
                  <SelectItem value="SERVICE" className="cursor-pointer">Services</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex space-x-2 pt-2 justify-end">
            <Button variant="ghost" className="border" onClick={resetForm}>Cancel</Button>
            <Button onClick={handleAddOrUpdate} className="bg-[#c05c31] hover:bg-[#a64b25] text-white flex items-center gap-1.5">
              <Save size={14} /> {editingId ? "Update Category" : "Save Category"}
            </Button>
          </div>
        </motion.div>
      )}

      {/* Filters selector */}
      <div className="flex flex-wrap gap-2 border-b pb-4">
        {[
          { id: "ALL", label: "All Types" },
          { id: "RECIPE", label: "Recipes" },
          { id: "RESTAURANT", label: "Restaurants" },
          { id: "GALLERY", label: "Gallery" },
          { id: "SERVICE", label: "Services" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilterType(tab.id)}
            className={`px-4 py-1.5 text-xs font-bold uppercase tracking-wider rounded-full transition-all border ${
              filterType === tab.id
                ? "bg-[#c05c31] text-white border-[#c05c31]"
                : "border-border text-muted-foreground hover:bg-muted"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {filteredCategories.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed rounded-3xl border-border bg-white dark:bg-gray-800">
          <Tags className="mx-auto h-12 w-12 text-muted-foreground opacity-60" />
          <h3 className="mt-4 text-sm font-semibold text-gray-900 dark:text-white">No categories found</h3>
          <p className="mt-1 text-sm text-muted-foreground">Add categories to organize recipes, venues, and gallery items.</p>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 border border-border rounded-3xl overflow-hidden shadow-md">
          <table className="w-full text-left border-collapse text-xs">
            <thead className="bg-muted">
              <tr>
                <th className="p-4">Name</th>
                <th className="p-4">Slug</th>
                <th className="p-4">Type</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredCategories.map((cat) => (
                <tr key={cat.id} className="hover:bg-muted/40 transition-colors">
                  <td className="p-4 font-bold text-foreground">{cat.name}</td>
                  <td className="p-4 text-mono text-muted-foreground">{cat.slug}</td>
                  <td className="p-4">{getTypeBadge(cat.type)}</td>
                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-1.5">
                      <Button size="icon" variant="ghost" className="h-8 w-8 text-[#c05c31] hover:bg-orange-50 dark:hover:bg-orange-950/20" onClick={() => handleOpenEdit(cat)}>
                        <Edit size={14} />
                      </Button>
                      <Button size="icon" variant="ghost" className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20" onClick={() => handleDelete(cat.id)}>
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

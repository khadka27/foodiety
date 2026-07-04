"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Trash2, Edit, Save, X, Store, AlertCircle, MapPin } from "lucide-react";
import { toast } from "sonner";
import apiClient from "@/lib/api-client";
import { ImageUpload } from "@/components/admin/ImageUpload";

export const dynamic = "force-dynamic";

export default function AdminRestaurantsManager() {
  const [restaurants, setRestaurants] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  // Form states
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formName, setFormName] = useState("");
  const [formImage, setFormImage] = useState("");
  const [formCategory, setFormCategory] = useState("ITALIAN");
  const [formCuisine, setFormCuisine] = useState("");
  const [formPriceRange, setFormPriceRange] = useState("$$");
  const [formAddress, setFormAddress] = useState("");
  const [formCity, setFormCity] = useState("San Francisco");
  const [formCountry, setFormCountry] = useState("USA");
  const [formFeatures, setFormFeatures] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [dbRestaurantCategories, setDbRestaurantCategories] = useState<any[]>([]);

  useEffect(() => {
    setIsMounted(true);
    fetchRestaurants();
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/categories?type=RESTAURANT");
      const json = await res.json();
      if (json.success && json.data) {
        setDbRestaurantCategories(json.data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const fetchRestaurants = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/restaurants");
      const json = await res.json();
      if (json.success && json.data) {
        setRestaurants(json.data);
      }
    } catch (e) {
      console.error(e);
      toast.error("Failed to load restaurants");
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setShowForm(false);
    setFormName("");
    setFormImage("");
    setFormCategory(dbRestaurantCategories[0]?.slug || "ITALIAN");
    setFormCuisine("");
    setFormPriceRange("$$");
    setFormAddress("");
    setFormCity("San Francisco");
    setFormCountry("USA");
    setFormFeatures("");
    setFormDescription("");
  };

  const handleOpenEdit = (est: any) => {
    setEditingId(est.id);
    setFormName(est.name || "");
    setFormImage(est.image || "");
    setFormCategory(est.category || dbRestaurantCategories[0]?.slug || "ITALIAN");
    setFormCuisine((est.cuisine || []).join(", "));
    setFormPriceRange(est.priceRange || "$$");
    setFormAddress(est.address || "");
    setFormCity(est.city || "San Francisco");
    setFormCountry(est.country || "USA");
    setFormFeatures((est.features || []).join(", "));
    setFormDescription(est.description || "");
    setShowForm(true);
  };

  const handleAddOrUpdate = async () => {
    if (!formName.trim() || !formAddress.trim() || !formDescription.trim()) {
      toast.error("Name, address, and description are required.");
      return;
    }

    const restaurantData = {
      name: formName.trim(),
      description: formDescription.trim(),
      address: formAddress.trim(),
      city: formCity.trim(),
      country: formCountry.trim(),
      category: formCategory,
      cuisine: formCuisine.split(",").map(c => c.trim()).filter(Boolean),
      priceRange: formPriceRange,
      features: formFeatures.split(",").map(f => f.trim()).filter(Boolean),
      image: formImage.trim() || "https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg?auto=compress&cs=tinysrgb&w=800",
      hours: {
        monday: "9:00 AM - 10:00 PM",
        tuesday: "9:00 AM - 10:00 PM",
        wednesday: "9:00 AM - 10:00 PM",
        thursday: "9:00 AM - 10:00 PM",
        friday: "9:00 AM - 11:00 PM",
        saturday: "9:00 AM - 11:00 PM",
        sunday: "9:00 AM - 10:00 PM"
      }
    };

    try {
      let res;
      if (editingId) {
        res = await apiClient.put(`/restaurants/${editingId}`, restaurantData);
        if (res.data.success) {
          toast.success("Establishment updated successfully in database!");
        }
      } else {
        res = await apiClient.post("/restaurants", restaurantData);
        if (res.data.success) {
          toast.success("Establishment created successfully in database!");
        }
      }
      fetchRestaurants();
      resetForm();
    } catch (err: any) {
      console.error(err);
      toast.error("Failed to save establishment: " + err.message);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this establishment from the database?")) {
      try {
        const res = await apiClient.delete(`/restaurants/${id}`);
        if (res.data.success) {
          toast.success("Establishment deleted successfully!");
          fetchRestaurants();
        }
      } catch (err: any) {
        console.error(err);
        toast.error("Failed to delete establishment: " + err.message);
      }
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
          <h2 className="text-3xl font-bold tracking-tight font-outfit text-gray-800 dark:text-white">Restaurants Manager</h2>
          <p className="text-muted-foreground text-sm">Manage restaurant listings, cafes, and hotel dining hubs in the Postgres database.</p>
        </div>
        {!showForm && (
          <Button onClick={() => setShowForm(true)} className="bg-[#c05c31] hover:bg-[#a64b25] text-white flex items-center gap-2 rounded-xl">
            <Plus size={16} /> Add Venue
          </Button>
        )}
      </div>

      {showForm && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="p-6 border border-[#c05c31]/20 bg-white dark:bg-gray-800 rounded-3xl shadow-xl space-y-4">
          <div className="flex justify-between items-center border-b pb-2">
            <h3 className="font-bold text-lg text-[#c05c31] dark:text-[#ebc63c]">{editingId ? "Edit Venue Record" : "New Venue Record"}</h3>
            <Button size="icon" variant="ghost" onClick={resetForm}><X size={16} /></Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2 flex flex-col justify-between">
              <div className="space-y-2">
                <label className="text-xs font-bold text-muted-foreground uppercase">Venue Name</label>
                <Input placeholder="e.g. Bistro Central" value={formName} onChange={e => setFormName(e.target.value)} className="rounded-lg text-xs" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-muted-foreground uppercase">Cuisine/Styles (comma separated)</label>
                <Input placeholder="Italian, Cafe, Fine Dining" value={formCuisine} onChange={e => setFormCuisine(e.target.value)} className="rounded-lg text-xs" />
              </div>
            </div>
            <div className="space-y-2 md:col-span-2">
              <ImageUpload
                directory="restaurants"
                value={formImage}
                onUpload={(src, meta) => {
                  setFormImage(src as string);
                  if (!formName && meta?.title) {
                    setFormName(meta.title);
                  }
                }}
                label="Venue Image"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-muted-foreground uppercase">Main Category</label>
              <Select value={formCategory} onValueChange={setFormCategory}>
                <SelectTrigger className="rounded-lg text-xs bg-background">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  {dbRestaurantCategories.map(c => (
                    <SelectItem key={c.id} value={c.slug} className="cursor-pointer">{c.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-muted-foreground uppercase">Price Range</label>
              <Select value={formPriceRange} onValueChange={setFormPriceRange}>
                <SelectTrigger className="rounded-lg text-xs bg-background">
                  <SelectValue placeholder="Select Price" />
                </SelectTrigger>
                <SelectContent>
                  {["$", "$$", "$$$", "$$$$"].map(p => (
                    <SelectItem key={p} value={p} className="cursor-pointer">{p}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-muted-foreground uppercase">City</label>
              <Input value={formCity} onChange={e => setFormCity(e.target.value)} className="rounded-lg text-xs" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-muted-foreground uppercase">Country</label>
              <Input value={formCountry} onChange={e => setFormCountry(e.target.value)} className="rounded-lg text-xs" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-muted-foreground uppercase">Address</label>
            <Input placeholder="e.g. 123 Valencia Street" value={formAddress} onChange={e => setFormAddress(e.target.value)} className="rounded-lg text-xs" />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-muted-foreground uppercase">Description</label>
            <Textarea placeholder="Short dining venue description..." value={formDescription} onChange={e => setFormDescription(e.target.value)} className="rounded-lg text-xs min-h-[60px]" />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-muted-foreground uppercase">Specialties & Features (comma separated)</label>
            <Input placeholder="Outdoor Seating, Dine-in, Takeout, Sake Selection" value={formFeatures} onChange={e => setFormFeatures(e.target.value)} className="rounded-lg text-xs" />
          </div>

          <div className="flex space-x-2 pt-2 justify-end">
            <Button variant="ghost" className="border" onClick={resetForm}>Cancel</Button>
            <Button onClick={handleAddOrUpdate} className="bg-[#c05c31] hover:bg-[#a64b25] text-white flex items-center gap-1.5">
              <Save size={14} /> {editingId ? "Update Venue" : "Save Venue"}
            </Button>
          </div>
        </motion.div>
      )}

      <div className="bg-white dark:bg-gray-800 border border-border rounded-3xl overflow-hidden shadow-md">
        <table className="w-full text-left border-collapse text-xs">
          <thead className="bg-muted">
            <tr>
              <th className="p-4">Thumbnail</th>
              <th className="p-4">Name</th>
              <th className="p-4">Category</th>
              <th className="p-4">Address</th>
              <th className="p-4">Price</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {restaurants.map((est: any) => (
              <tr key={est.id} className="hover:bg-muted/40 transition-colors">
                <td className="p-4">
                  <div className="h-10 w-16 rounded overflow-hidden border">
                    <img src={est.image} className="w-full h-full object-cover" alt="thumb" />
                  </div>
                </td>
                <td className="p-4 font-bold text-foreground">{est.name}</td>
                <td className="p-4">
                  <Badge variant="outline">{est.category}</Badge>
                </td>
                <td className="p-4 text-muted-foreground flex items-center gap-1">
                  <MapPin size={11} className="text-[#c05c31]" />
                  {est.address}, {est.city}
                </td>
                <td className="p-4 font-bold text-[#ebc63c]">{est.priceRange}</td>
                <td className="p-4 text-right">
                  <div className="flex justify-end gap-1.5">
                    <Button size="icon" variant="ghost" className="h-8 w-8 text-[#c05c31] hover:bg-orange-50 dark:hover:bg-orange-950/20" onClick={() => handleOpenEdit(est)}>
                      <Edit size={14} />
                    </Button>
                    <Button size="icon" variant="ghost" className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20" onClick={() => handleDelete(est.id)}>
                      <Trash2 size={14} />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

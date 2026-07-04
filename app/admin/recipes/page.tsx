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
import { Plus, Trash2, Edit, Save, X, Coffee, AlertCircle, FileText } from "lucide-react";
import { toast } from "sonner";
import apiClient from "@/lib/api-client";
import { ImageUpload } from "@/components/admin/ImageUpload";

export const dynamic = "force-dynamic";

export default function AdminRecipesManager() {
  const [recipes, setRecipes] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  // Form states
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formTitle, setFormTitle] = useState("");
  const [formImage, setFormImage] = useState("");
  const [formCuisine, setFormCuisine] = useState("Italian");
  const [formDifficulty, setFormDifficulty] = useState("Beginner");
  const [formCookTime, setFormCookTime] = useState("30");
  const [formPrepTime, setFormPrepTime] = useState("15");
  const [formServings, setFormServings] = useState("4");
  const [formCalories, setFormCalories] = useState("350");
  const [formDescription, setFormDescription] = useState("");
  const [formTags, setFormTags] = useState("");
  const [formIngredients, setFormIngredients] = useState("");
  const [formInstructions, setFormInstructions] = useState("");
  const [formCategory, setFormCategory] = useState("MAIN_COURSE");
  const [recipeCategories, setRecipeCategories] = useState<any[]>([]);

  useEffect(() => {
    setIsMounted(true);
    fetchRecipes();
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/categories?type=RECIPE");
      const json = await res.json();
      if (json.success && json.data) {
        setRecipeCategories(json.data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const fetchRecipes = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/recipes");
      const json = await res.json();
      if (json.success && json.data) {
        setRecipes(json.data);
      }
    } catch (e) {
      console.error(e);
      toast.error("Failed to load recipes");
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setShowForm(false);
    setFormTitle("");
    setFormImage("");
    setFormCuisine("Italian");
    setFormDifficulty("Beginner");
    setFormCookTime("30");
    setFormPrepTime("15");
    setFormServings("4");
    setFormCalories("350");
    setFormDescription("");
    setFormTags("");
    setFormIngredients("");
    setFormInstructions("");
    setFormCategory(recipeCategories[0]?.slug || "MAIN_COURSE");
  };

  const handleOpenEdit = (recipe: any) => {
    setEditingId(recipe.id);
    setFormTitle(recipe.title || "");
    setFormImage(recipe.image || "");
    setFormCuisine(recipe.cuisine || "Italian");
    setFormDifficulty(recipe.difficulty || "Beginner");
    setFormCookTime(recipe.cookTime ? recipe.cookTime.toString() : "30");
    setFormPrepTime(recipe.prepTime ? recipe.prepTime.toString() : "15");
    setFormServings(recipe.servings ? recipe.servings.toString() : "4");
    setFormDescription(recipe.description || "");
    setFormTags((recipe.tags || []).join(", "));
    setFormCategory(recipe.category || recipeCategories[0]?.slug || "MAIN_COURSE");
    
    // Parse calories from nutritionInfo
    const cal = recipe.nutritionInfo?.calories || "350";
    setFormCalories(cal.toString());

    // Map ingredients array back to text
    const ingrText = (recipe.ingredients || [])
      .map((i: any) => `${i.amount || ""} ${i.unit || ""} ${i.name || ""}`.trim())
      .join("\n");
    setFormIngredients(ingrText);

    // Map instructions steps array back to text
    const instText = (recipe.instructions || []).join("\n");
    setFormInstructions(instText);

    setShowForm(true);
  };

  const handleAddOrUpdate = async () => {
    if (!formTitle.trim() || !formDescription.trim()) {
      toast.error("Title and description are required.");
      return;
    }

    // Process ingredients line by line
    const ingredientsArray = formIngredients
      .split("\n")
      .map(line => line.trim())
      .filter(Boolean)
      .map(line => {
        // Basic parser for amount + unit + name
        const match = line.match(/^([\d\/\.\s\-]+)\s*([a-zA-Z]+)?\s+(.+)$/);
        if (match) {
          return { amount: match[1].trim(), unit: match[2]?.trim() || "", name: match[3].trim() };
        }
        return { amount: "1", unit: "piece", name: line };
      });

    // Process instructions line by line
    const instructionsArray = formInstructions
      .split("\n")
      .map(line => line.trim())
      .filter(Boolean);

    const recipeData = {
      title: formTitle.trim(),
      description: formDescription.trim(),
      image: formImage.trim() || "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800",
      cuisine: formCuisine.trim(),
      difficulty: formDifficulty,
      prepTime: Number(formPrepTime) || 15,
      cookTime: Number(formCookTime) || 15,
      servings: Number(formServings) || 4,
      calories: Number(formCalories) || 300,
      tags: formTags.split(",").map(t => t.trim()).filter(Boolean),
      ingredients: ingredientsArray,
      instructions: instructionsArray,
      category: formCategory || recipeCategories[0]?.slug || "MAIN_COURSE"
    };

    try {
      let res;
      if (editingId) {
        res = await apiClient.put(`/recipes/${editingId}`, recipeData);
        if (res.data.success) {
          toast.success("Recipe updated successfully in database!");
        }
      } else {
        res = await apiClient.post("/recipes", recipeData);
        if (res.data.success) {
          toast.success("Recipe created successfully in database!");
        }
      }
      fetchRecipes();
      resetForm();
    } catch (err: any) {
      console.error(err);
      toast.error("Failed to save recipe: " + err.message);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this recipe from the database?")) {
      try {
        const res = await apiClient.delete(`/recipes/${id}`);
        if (res.data.success) {
          toast.success("Recipe deleted successfully!");
          fetchRecipes();
        }
      } catch (err: any) {
        console.error(err);
        toast.error("Failed to delete recipe: " + err.message);
      }
    }
  };

  const getDifficultyBadge = (d: string) => {
    switch (d) {
      case "Beginner":
        return <Badge className="bg-green-500/10 text-green-600 border border-green-500/20">{d}</Badge>;
      case "Intermediate":
        return <Badge className="bg-yellow-500/10 text-yellow-600 border border-yellow-500/20">{d}</Badge>;
      case "Advanced":
        return <Badge className="bg-red-500/10 text-red-600 border border-red-500/20">{d}</Badge>;
      default:
        return <Badge variant="outline">{d}</Badge>;
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
          <h2 className="text-3xl font-bold tracking-tight font-outfit text-gray-800 dark:text-white">Recipes Database</h2>
          <p className="text-muted-foreground text-sm">Manage dynamic kitchen recipes stored in the PostgreSQL database.</p>
        </div>
        {!showForm && (
          <Button onClick={() => setShowForm(true)} className="bg-[#c05c31] hover:bg-[#a64b25] text-white flex items-center gap-2 rounded-xl">
            <Plus size={16} /> Create Recipe
          </Button>
        )}
      </div>

      {showForm && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="p-6 border border-[#c05c31]/20 bg-white dark:bg-gray-800 rounded-3xl shadow-xl space-y-4">
          <div className="flex justify-between items-center border-b pb-2">
            <h3 className="font-bold text-lg text-[#c05c31] dark:text-[#ebc63c]">{editingId ? "Edit Recipe Record" : "New Recipe Record"}</h3>
            <Button size="icon" variant="ghost" onClick={resetForm}><X size={16} /></Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2 flex flex-col justify-between">
              <div className="space-y-2">
                <label className="text-xs font-bold text-muted-foreground uppercase">Recipe Title</label>
                <Input placeholder="e.g. Pasta Primavera" value={formTitle} onChange={e => setFormTitle(e.target.value)} className="rounded-lg text-xs" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-muted-foreground uppercase">Cuisine Type</label>
                <Input placeholder="e.g. Italian, Thai" value={formCuisine} onChange={e => setFormCuisine(e.target.value)} className="rounded-lg text-xs" />
              </div>
            </div>
            <div className="space-y-2 md:col-span-2">
              <ImageUpload
                directory="recipes"
                value={formImage}
                onUpload={(src, meta) => {
                  setFormImage(src as string);
                  if (!formTitle && meta?.title) {
                    setFormTitle(meta.title);
                  }
                }}
                label="Recipe Image"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-8 gap-4">
            <div className="space-y-2 col-span-2">
              <label className="text-xs font-bold text-muted-foreground uppercase">Category</label>
              <Select value={formCategory} onValueChange={setFormCategory}>
                <SelectTrigger className="rounded-lg text-xs bg-background">
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  {recipeCategories.map(c => (
                    <SelectItem key={c.id} value={c.slug} className="cursor-pointer">{c.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2 col-span-2">
              <label className="text-xs font-bold text-muted-foreground uppercase">Difficulty</label>
              <Select value={formDifficulty} onValueChange={setFormDifficulty}>
                <SelectTrigger className="rounded-lg text-xs bg-background">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  {["Beginner", "Intermediate", "Advanced"].map(d => (
                    <SelectItem key={d} value={d} className="cursor-pointer">{d}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-muted-foreground uppercase">Prep Time (min)</label>
              <Input type="number" value={formPrepTime} onChange={e => setFormPrepTime(e.target.value)} className="rounded-lg text-xs" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-muted-foreground uppercase">Cook Time (min)</label>
              <Input type="number" value={formCookTime} onChange={e => setFormCookTime(e.target.value)} className="rounded-lg text-xs" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-muted-foreground uppercase">Servings</label>
              <Input type="number" value={formServings} onChange={e => setFormServings(e.target.value)} className="rounded-lg text-xs" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-muted-foreground uppercase">Calories</label>
              <Input type="number" value={formCalories} onChange={e => setFormCalories(e.target.value)} className="rounded-lg text-xs" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-muted-foreground uppercase">Description</label>
            <Textarea placeholder="Short recipe description..." value={formDescription} onChange={e => setFormDescription(e.target.value)} className="rounded-lg text-xs min-h-[50px]" />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-muted-foreground uppercase">Tags (comma separated)</label>
            <Input placeholder="Spicy, Vegetarian, Gluten-Free" value={formTags} onChange={e => setFormTags(e.target.value)} className="rounded-lg text-xs" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-muted-foreground uppercase">Ingredients (one per line)</label>
                <span className="text-[10px] text-muted-foreground">Format: amount unit name (e.g. 2 tbsp Olive Oil)</span>
              </div>
              <Textarea placeholder="2 tbsp Olive Oil&#10;1 lb Fresh Pasta" value={formIngredients} onChange={e => setFormIngredients(e.target.value)} className="rounded-lg text-xs min-h-[120px] font-mono" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-muted-foreground uppercase">Instructions Step-by-Step (one per line)</label>
              <Textarea placeholder="Preheat oven to 375F&#10;Boil water and cook pasta" value={formInstructions} onChange={e => setFormInstructions(e.target.value)} className="rounded-lg text-xs min-h-[120px] font-mono" />
            </div>
          </div>

          <div className="flex space-x-2 pt-2 justify-end">
            <Button variant="ghost" className="border" onClick={resetForm}>Cancel</Button>
            <Button onClick={handleAddOrUpdate} className="bg-[#c05c31] hover:bg-[#a64b25] text-white flex items-center gap-1.5">
              <Save size={14} /> {editingId ? "Update Recipe" : "Save Recipe"}
            </Button>
          </div>
        </motion.div>
      )}

      <div className="bg-white dark:bg-gray-800 border border-border rounded-3xl overflow-hidden shadow-md">
        <table className="w-full text-left border-collapse text-xs">
          <thead className="bg-muted">
            <tr>
              <th className="p-4">Thumbnail</th>
              <th className="p-4">Title</th>
              <th className="p-4">Cuisine</th>
              <th className="p-4">Difficulty</th>
              <th className="p-4">Cook Time</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {recipes.map((r: any) => (
              <tr key={r.id} className="hover:bg-muted/40 transition-colors">
                <td className="p-4">
                  <div className="h-10 w-16 rounded overflow-hidden border">
                    <img src={r.image} className="w-full h-full object-cover" alt="thumb" />
                  </div>
                </td>
                <td className="p-4 font-bold text-foreground">{r.title}</td>
                <td className="p-4 text-muted-foreground">{r.cuisine || "Global"}</td>
                <td className="p-4">{getDifficultyBadge(r.difficulty)}</td>
                <td className="p-4 text-muted-foreground">{r.cookTime} mins</td>
                <td className="p-4 text-right">
                  <div className="flex justify-end gap-1.5">
                    <Button size="icon" variant="ghost" className="h-8 w-8 text-[#c05c31] hover:bg-orange-50 dark:hover:bg-orange-950/20" onClick={() => handleOpenEdit(r)}>
                      <Edit size={14} />
                    </Button>
                    <Button size="icon" variant="ghost" className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20" onClick={() => handleDelete(r.id)}>
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

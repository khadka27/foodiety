"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
import {
 Plus,
 Search,
 PenTool,
 Trash2,
 Calendar,
 Eye,
 ArrowLeft,
 Bold,
 Italic,
 Underline,
 Heading2,
 Heading3,
 Quote,
 Table as TableIcon,
 Image as ImageIcon,
 Check,
 Sparkles,
 Link as LinkIcon,
 List,
 ListOrdered,
} from "lucide-react";
import { toast } from "sonner";

import nextDynamic from "next/dynamic";

// Force dynamic rendering to avoid SSR issues
export const dynamic = "force-dynamic";

interface BlogPost {
 id: number;
 slug: string;
 title: string;
 excerpt: string;
 content: string;
 image: string;
 date: string;
 views: number;
 category: string;
 readTime: string;
 featured: boolean;
 author: {
 name: string;
 image: string;
 bio: string;
 };
 tags: string[];
}

const defaultBlogPosts: BlogPost[] = [
 {
 id: 1,
 slug: "the-art-of-perfect-pasta-secrets-",
 title: "The Art of Perfect Pasta: Secrets from Italian Grandmothers",
 excerpt: "Discover the time-honored techniques that make Italian pasta truly exceptional, passed down through generations of skilled home cooks.",
 content: `
 <p>There's something magical about watching an Italian grandmother make pasta from scratch. The way her weathered hands work the dough, the intuitive understanding of texture and timing, the stories shared while rolling each strand – it's a masterclass in both cooking and cultural preservation.</p>
 <h2>The Foundation: Choosing Your Flour</h2>
 <p>Every great pasta begins with the right flour. Italian grandmothers swear by "00" flour (doppio zero), which is milled to an incredibly fine consistency. This creates the perfect texture – smooth yet with enough grip to hold sauce beautifully.</p>
 <blockquote class="border-l-4 border-orange-500 pl-4 italic my-6 text-muted-foreground">"La pasta è come la vita – serve pazienza e amore." (Pasta is like life – it requires patience and love.) - Nonna Maria, age 84</blockquote>
 <h2>The Kneading Ritual</h2>
 <p>Kneading isn't just about developing gluten – it's a meditative process. Italian nonnas knead for exactly 10 minutes, no more, no less. They listen to the dough, feeling when it transforms from rough and shaggy to smooth and elastic.</p>
 `,
 image: "https://images.pexels.com/photos/4518843/pexels-photo-4518843.jpeg?auto=compress&cs=tinysrgb&w=800",
 date: "2026-06-15",
 views: 2847,
 category: "Cooking Tips",
 readTime: "8 min read",
 featured: true,
 author: {
 name: "Isabella Romano",
 image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Isabella",
 bio: "Food writer and Italian specialist",
 },
 tags: ["Italian", "Pasta", "Traditional"],
 },
 {
 id: 2,
 slug: "global-street-food-a-journey-through-authentic-flavors",
 title: "Global Street Food: A Journey Through Authentic Flavors",
 excerpt: "From Bangkok's bustling markets to Mexico City's vibrant streets, explore the world through its most beloved street foods.",
 content: `
 <p>Street food is the raw, unfiltered culinary soul of a culture. It is prepared in the open, enjoyed on busy curbs, and offers a glimpse into the spices and histories that define communities.</p>
 <h2>1. Bangkok: The Sweet, Spicy, & Sour Balance</h2>
 <p>Walking through Yaowarat Road in Bangkok, the aroma of sizzling Pad Thai and coconut pancakes is intoxicating. The key to Thai street food is the delicate balance of five flavors: sweet, salty, spicy, sour, and bitter.</p>
 <h2>2. Mexico City: The Tacos Al Pastor Legacy</h2>
 <p>Pork marinated in dried chilies, spices, and pineapple, slowly cooked on a trompo vertical spit. Shaved directly onto warm corn tortillas with double-quick speed – it is culinary poetry.</p>
 `,
 image: "https://images.pexels.com/photos/4958792/pexels-photo-4958792.jpeg?auto=compress&cs=tinysrgb&w=800",
 date: "2026-06-12",
 views: 1923,
 category: "Travel",
 readTime: "12 min read",
 featured: false,
 author: {
 name: "Marco Rodriguez",
 image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marco",
 bio: "Traveler and food journalist",
 },
 tags: ["Street Food", "Travel", "Tacos"],
 },
 {
 id: 3,
 slug: "seasonal-cooking-winter-comfort-foods-that-warm-the-soul",
 title: "Seasonal Cooking: Winter Comfort Foods That Warm the Soul",
 excerpt: "Embrace the season with hearty stews, roasted vegetables, and warming spices that bring comfort to cold days.",
 content: `
 <p>When the temperature drops, our kitchens become warm sanctuaries. Seasonal winter cooking focuses on slow-braised meats, rich root vegetable bakes, and robust broths packed with immunity-boosting herbs.</p>
 <h2>Root Vegetables: Nature's Winter Sweetness</h2>
 <p>Parsnips, carrots, and sweet potatoes develop deeper, sweeter flavors when subjected to winter frost. Roasting them at high heat caramelizes their natural sugars, making them a perfect pairing for hearty roasts.</p>
 `,
 image: "https://images.pexels.com/photos/2890387/pexels-photo-2890387.jpeg?auto=compress&cs=tinysrgb&w=800",
 date: "2026-06-10",
 views: 3156,
 category: "Seasonal",
 readTime: "6 min read",
 featured: true,
 author: {
 name: "Sarah Chen",
 image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
 bio: "Head Chef & Blogger",
 },
 tags: ["Winter", "Comfort", "Stew"],
 }
];

const categories = ["Cooking Tips", "Travel", "Seasonal", "Nutrition", "Trends"];

const presetImages = [
 "https://images.pexels.com/photos/4518843/pexels-photo-4518843.jpeg?auto=compress&cs=tinysrgb&w=800",
 "https://images.pexels.com/photos/4958792/pexels-photo-4958792.jpeg?auto=compress&cs=tinysrgb&w=800",
 "https://images.pexels.com/photos/2890387/pexels-photo-2890387.jpeg?auto=compress&cs=tinysrgb&w=800",
 "https://images.pexels.com/photos/1640770/pexels-photo-1640770.jpeg?auto=compress&cs=tinysrgb&w=800",
 "https://images.pexels.com/photos/3184460/pexels-photo-3184460.jpeg?auto=compress&cs=tinysrgb&w=800",
 "https://images.pexels.com/photos/2762942/pexels-photo-2762942.jpeg?auto=compress&cs=tinysrgb&w=800"
];

function BlogCMSPageComponent() {
 const [posts, setPosts] = useState<BlogPost[]>([]);
 const [searchTerm, setSearchTerm] = useState("");
 const [isEditing, setIsEditing] = useState(false);
 const [currentPostId, setCurrentPostId] = useState<number | null>(null);

 // Form states
 const [title, setTitle] = useState("");
 const [excerpt, setExcerpt] = useState("");
 const [category, setCategory] = useState("Cooking Tips");
 const [readTime, setReadTime] = useState("5 min read");
 const [image, setImage] = useState("");
 const [authorName, setAuthorName] = useState("");
 const [authorBio, setAuthorBio] = useState("");
 const [tags, setTags] = useState("");
 const [featured, setFeatured] = useState(false);

 const editorRef = useRef<HTMLDivElement>(null);
 const [isMounted, setIsMounted] = useState(false);

 useEffect(() => {
 setIsMounted(true);
 // Load blogs from localStorage or seed defaults
 const saved = localStorage.getItem("foodiety_blogs");
 if (saved) {
 try {
 setPosts(JSON.parse(saved));
 } catch (e) {
 setPosts(defaultBlogPosts);
 }
 } else {
 setPosts(defaultBlogPosts);
 localStorage.setItem("foodiety_blogs", JSON.stringify(defaultBlogPosts));
 }
 }, []);

 const savePostsToLocalStorage = (updatedPosts: BlogPost[]) => {
 setPosts(updatedPosts);
 localStorage.setItem("foodiety_blogs", JSON.stringify(updatedPosts));
 };

 const handleOpenCreate = () => {
 setCurrentPostId(null);
 setTitle("");
 setExcerpt("");
 setCategory("Cooking Tips");
 setReadTime("6 min read");
 setImage(presetImages[0]);
 setAuthorName("Admin Team");
 setAuthorBio("Resident culinary reviewer & guide creator.");
 setTags("Food, Cooking");
 setFeatured(false);
 setIsEditing(true);

 // Defer resetting editor content HTML
 setTimeout(() => {
 if (editorRef.current) editorRef.current.innerHTML = "<p>Start writing your food story here...</p>";
 }, 50);
 };

 const handleOpenEdit = (post: BlogPost) => {
 setCurrentPostId(post.id);
 setTitle(post.title);
 setExcerpt(post.excerpt);
 setCategory(post.category);
 setReadTime(post.readTime);
 setImage(post.image);
 setAuthorName(post.author.name);
 setAuthorBio(post.author.bio);
 setTags(post.tags.join(", "));
 setFeatured(post.featured);
 setIsEditing(true);

 setTimeout(() => {
 if (editorRef.current) {
 editorRef.current.innerHTML = post.content;
 }
 }, 50);
 };

 const handleDelete = (id: number, e: React.MouseEvent) => {
 e.stopPropagation();
 if (confirm("Are you sure you want to delete this blog post?")) {
 const updated = posts.filter((p) => p.id !== id);
 savePostsToLocalStorage(updated);
 toast.success("Blog post deleted successfully.");
 }
 };

 // Intercept paste event inside contentEditable area
 const handleEditorPaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
 const items = e.clipboardData?.items;
 if (!items) return;

 for (let i = 0; i < items.length; i++) {
 if (items[i].type.indexOf("image") !== -1) {
 const file = items[i].getAsFile();
 if (file) {
 e.preventDefault(); // Stop default text paste
 const reader = new FileReader();
 reader.onload = (event) => {
 const base64 = event.target?.result as string;
 // Inject embedded image into editor at selection point
 document.execCommand(
 "insertHTML",
 false,
 `<img src="${base64}" class="my-6 rounded-2xl max-w-full h-auto shadow-md border border-orange-500/10" alt="Uploaded Content" />`
 );
 toast.success("Image pasted and embedded successfully!");
 };
 reader.readAsDataURL(file);
 }
 }
 }
 };

 // Editor styling controls helper
 const execEditorCommand = (command: string, value: string = "") => {
 if (document) {
 document.execCommand(command, false, value);
 }
 };

 // Helper to inject styled tables
 const handleInsertTable = () => {
 const tableTemplate = `
 <table class="w-full my-6 border-collapse border border-orange-200 text-sm">
 <thead>
 <tr class="bg-orange-500/5 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400">
 <th class="border border-orange-200 dark:border-orange-900/40 p-3 text-left font-bold font-outfit">Ingredient / Topic</th>
 <th class="border border-orange-200 dark:border-orange-900/40 p-3 text-left font-bold font-outfit">Quantity / Note</th>
 </tr>
 </thead>
 <tbody>
 <tr>
 <td class="border border-orange-200 dark:border-orange-900/40 p-3 text-muted-foreground">Example A</td>
 <td class="border border-orange-200 dark:border-orange-900/40 p-3 text-muted-foreground">100g</td>
 </tr>
 <tr>
 <td class="border border-orange-200 dark:border-orange-900/40 p-3 text-muted-foreground">Example B</td>
 <td class="border border-orange-200 dark:border-orange-900/40 p-3 text-muted-foreground">2 tablespoons</td>
 </tr>
 </tbody>
 </table>
 `;
 document.execCommand("insertHTML", false, tableTemplate);
 toast.success("Ingredient table template inserted!");
 };

 // Helper to inject styled blockquotes
 const handleInsertBlockquote = () => {
 const quoteTemplate = `
 <blockquote class="border-l-4 border-orange-500 pl-4 italic my-6 text-muted-foreground bg-orange-500/5 py-2 pr-2 rounded-r-lg">
 "Paste or type your quote here..."
 </blockquote>
 `;
 document.execCommand("insertHTML", false, quoteTemplate);
 };

 const handleInsertImageLink = () => {
 const url = prompt("Enter the absolute Image URL to insert:");
 if (url) {
 document.execCommand(
 "insertHTML",
 false,
 `<img src="${url}" class="my-6 rounded-2xl max-w-full h-auto shadow-md border border-orange-500/10" alt="Reference Image" />`
 );
 toast.success("Image reference linked successfully!");
 }
 };

 const handleSavePost = (e: React.FormEvent) => {
 e.preventDefault();

 if (!title.trim() || !excerpt.trim()) {
 toast.error("Please fill in the title and summary fields.");
 return;
 }

 const editorContent = editorRef.current?.innerHTML || "<p></p>";

 const splitTags = tags
 .split(",")
 .map((t) => t.trim())
 .filter((t) => t.length > 0);

 const generatedSlug = title
 .toLowerCase()
 .trim()
 .replace(/[^a-z0-9]+/g, "-")
 .replace(/(^-|-$)/g, "");

 let updatedPosts: BlogPost[];

 if (currentPostId !== null) {
 // Edit mode
 updatedPosts = posts.map((p) => {
 if (p.id !== currentPostId) return p;
 return {
 ...p,
 title,
 slug: generatedSlug,
 excerpt,
 content: editorContent,
 image,
 category,
 readTime,
 featured,
 tags: splitTags,
 author: {
 name: authorName,
 image: p.author.image,
 bio: authorBio,
 },
 };
 });
 toast.success("Blog post updated successfully!");
 } else {
 // Create mode
 const newPost: BlogPost = {
 id: Date.now(),
 slug: generatedSlug,
 title,
 excerpt,
 content: editorContent,
 image: image || presetImages[0],
 date: new Date().toISOString().split("T")[0],
 views: 0,
 category,
 readTime,
 featured,
 tags: splitTags,
 author: {
 name: authorName || "Admin Team",
 image: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(authorName)}`,
 bio: authorBio || "Resident reviewer",
 },
 };
 updatedPosts = [newPost, ...posts];
 toast.success("New blog post published successfully!");
 }

 savePostsToLocalStorage(updatedPosts);
 setIsEditing(false);
 setCurrentPostId(null);
 };

 const filteredPosts = posts.filter(
 (p) =>
 p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
 p.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
 p.author.name.toLowerCase().includes(searchTerm.toLowerCase())
 );

 if (!isMounted) {
 return (
 <div className="flex items-center justify-center h-64">
 <div className="w-8 h-8 rounded-full border-2 border-orange-500/20 border-t-orange-500 animate-spin" />
 </div>
 );
 }

 return (
 <div className="space-y-6 text-foreground min-h-screen">
 
 {/* Title Header */}
 <div className="flex items-center justify-between">
 <div>
 <h2 className="text-3xl font-bold tracking-tight font-outfit">Blog CMS Dashboard</h2>
 <p className="text-muted-foreground text-sm">
 Configure blog metadata, edit articles, and embed responsive media direct-pasted or linked.
 </p>
 </div>
 
 {!isEditing && (
 <Button
 onClick={handleOpenCreate}
 className=" hover: hover: text-white rounded-xl shadow-md font-semibold"
 >
 <Plus className="mr-2 h-4 w-4" /> Add New Post
 </Button>
 )}
 </div>

 <AnimatePresence mode="wait">
 {isEditing ? (
 
 /* Creating/Editing WYSIWYG Form view */
 <motion.div
 key="edit-form"
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 exit={{ opacity: 0, y: -20 }}
 transition={{ duration: 0.4 }}
 className="bg-white dark:bg-gray-800 rounded-3xl border border-border p-6 md:p-8 shadow-xl space-y-8"
 >
 {/* Header */}
 <div className="flex items-center justify-between border-b pb-4 border-border/60">
 <div className="flex items-center space-x-3">
 <Button
 variant="ghost"
 onClick={() => setIsEditing(false)}
 className="rounded-xl border hover:bg-orange-500/5 text-muted-foreground hover:text-foreground"
 >
 <ArrowLeft className="h-4 w-4 mr-2" /> Back
 </Button>
 <h3 className="text-xl font-bold font-outfit">
 {currentPostId ? `Edit Article: ${title.slice(0, 30)}...` : "Publish New Food Story"}
 </h3>
 </div>
 <div className="text-xs text-muted-foreground">WYSIWYG Mode Active</div>
 </div>

 <form onSubmit={handleSavePost} className="space-y-6">
 
 {/* Core Metadata Fields */}
 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
 
 <div className="space-y-1">
 <label className="text-xs font-bold text-muted-foreground uppercase">Article Title *</label>
 <Input
 required
 placeholder="Enter catchy title..."
 value={title}
 onChange={(e) => setTitle(e.target.value)}
 className="rounded-xl bg-background/50 text-sm"
 />
 </div>

 <div className="space-y-1">
 <label className="text-xs font-bold text-muted-foreground uppercase">Category</label>
 <Select value={category} onValueChange={setCategory}>
 <SelectTrigger className="rounded-xl bg-background/50 text-sm">
 <SelectValue placeholder="Select Category" />
 </SelectTrigger>
 <SelectContent>
 {categories.map((c) => (
 <SelectItem key={c} value={c} className="cursor-pointer">
 {c}
 </SelectItem>
 ))}
 </SelectContent>
 </Select>
 </div>

 <div className="space-y-1">
 <label className="text-xs font-bold text-muted-foreground uppercase">Read Time (e.g. '8 min read')</label>
 <Input
 placeholder="6 min read"
 value={readTime}
 onChange={(e) => setReadTime(e.target.value)}
 className="rounded-xl bg-background/50 text-sm"
 />
 </div>

 <div className="space-y-1">
 <label className="text-xs font-bold text-muted-foreground uppercase">Tags (Comma Separated)</label>
 <Input
 placeholder="Pasta, Italian, Travel"
 value={tags}
 onChange={(e) => setTags(e.target.value)}
 className="rounded-xl bg-background/50 text-sm"
 />
 </div>

 </div>

 {/* Author Section */}
 <div className="p-5 rounded-2xl border border-orange-500/10 bg-orange-500/5 grid grid-cols-1 md:grid-cols-2 gap-6">
 
 <div className="space-y-1">
 <label className="text-xs font-bold text-muted-foreground uppercase">Author Name</label>
 <Input
 placeholder="Nonna Maria / Admin Team"
 value={authorName}
 onChange={(e) => setAuthorName(e.target.value)}
 className="rounded-xl bg-background/80 text-sm"
 />
 </div>

 <div className="space-y-1">
 <label className="text-xs font-bold text-muted-foreground uppercase">Author Bio (Short)</label>
 <Input
 placeholder="Specialist in Tuscan local cooking..."
 value={authorBio}
 onChange={(e) => setAuthorBio(e.target.value)}
 className="rounded-xl bg-background/80 text-sm"
 />
 </div>

 </div>

 {/* Featured Image Picker */}
 <div className="space-y-3">
 <div className="flex items-center justify-between">
 <label className="text-xs font-bold text-muted-foreground uppercase">Featured Cover Image</label>
 <span className="text-[10px] text-muted-foreground font-medium">Select a preset below or enter a URL</span>
 </div>
 
 {/* Presets Grid */}
 <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
 {presetImages.map((p, idx) => {
 const isSelected = image === p;
 return (
 <div
 key={idx}
 onClick={() => setImage(p)}
 className={`cursor-pointer relative h-16 rounded-xl overflow-hidden border-2 transition-all ${
 isSelected ? "border-orange-500 scale-95 shadow-md shadow-orange-500/20" : "border-transparent opacity-75 hover:opacity-100"
 }`}
 >
 <img src={p} className="w-full h-full object-cover" alt="preset" />
 {isSelected && (
 <div className="absolute inset-0 bg-orange-500/25 flex items-center justify-center text-white">
 <Check className="h-5 w-5 stroke-[3]" />
 </div>
 )}
 </div>
 );
 })}
 </div>

 <Input
 placeholder="Or enter custom image URL..."
 value={image}
 onChange={(e) => setImage(e.target.value)}
 className="rounded-xl bg-background/50 text-sm"
 />
 </div>

 {/* Toggle featured option */}
 <div className="flex items-center space-x-3">
 <input
 type="checkbox"
 id="featured-toggle"
 checked={featured}
 onChange={(e) => setFeatured(e.target.checked)}
 className="w-4 h-4 rounded text-orange-500 focus:ring-orange-500 border-border"
 />
 <label htmlFor="featured-toggle" className="text-sm font-semibold select-none cursor-pointer">
 Feature this article prominently on homepage/hero grids
 </label>
 </div>

 {/* Excerpt Summary */}
 <div className="space-y-1">
 <label className="text-xs font-bold text-muted-foreground uppercase">Article Brief Summary / Excerpt *</label>
 <Textarea
 required
 placeholder="Provide a short description of the post to show in search card summaries..."
 value={excerpt}
 onChange={(e) => setExcerpt(e.target.value)}
 className="rounded-xl bg-background/50 text-sm min-h-[70px]"
 />
 </div>

 {/* Rich Text Editor CMS */}
 <div className="space-y-2">
 <label className="text-xs font-bold text-muted-foreground uppercase flex items-center">
 <Sparkles className="h-3.5 w-3.5 mr-1 text-orange-500" /> Rich Article Content *
 </label>
 
 {/* Editor Toolbox */}
 <div className="flex flex-wrap items-center gap-1.5 p-2 bg-muted/60 dark:bg-gray-700/50 rounded-t-2xl border-t border-x border-border">
 
 {/* Style buttons */}
 <Button type="button" variant="ghost" size="icon" className="h-9 w-9 hover:bg-orange-500/10 rounded-lg" onClick={() => execEditorCommand("bold")} title="Bold">
 <Bold className="h-4 w-4" />
 </Button>
 <Button type="button" variant="ghost" size="icon" className="h-9 w-9 hover:bg-orange-500/10 rounded-lg" onClick={() => execEditorCommand("italic")} title="Italic">
 <Italic className="h-4 w-4" />
 </Button>
 <Button type="button" variant="ghost" size="icon" className="h-9 w-9 hover:bg-orange-500/10 rounded-lg" onClick={() => execEditorCommand("underline")} title="Underline">
 <Underline className="h-4 w-4" />
 </Button>

 <div className="w-[1px] h-6 bg-border mx-1" />

 {/* Headings */}
 <Button type="button" variant="ghost" size="icon" className="h-9 w-9 hover:bg-orange-500/10 rounded-lg" onClick={() => execEditorCommand("formatBlock", "h2")} title="H2 Heading">
 <Heading2 className="h-4 w-4" />
 </Button>
 <Button type="button" variant="ghost" size="icon" className="h-9 w-9 hover:bg-orange-500/10 rounded-lg" onClick={() => execEditorCommand("formatBlock", "h3")} title="H3 Heading">
 <Heading3 className="h-4 w-4" />
 </Button>

 <div className="w-[1px] h-6 bg-border mx-1" />

 {/* Lists */}
 <Button type="button" variant="ghost" size="icon" className="h-9 w-9 hover:bg-orange-500/10 rounded-lg" onClick={() => execEditorCommand("insertUnorderedList")} title="Bullet List">
 <List className="h-4 w-4" />
 </Button>
 <Button type="button" variant="ghost" size="icon" className="h-9 w-9 hover:bg-orange-500/10 rounded-lg" onClick={() => execEditorCommand("insertOrderedList")} title="Numbered List">
 <ListOrdered className="h-4 w-4" />
 </Button>

 <div className="w-[1px] h-6 bg-border mx-1" />

 {/* Special elements */}
 <Button type="button" variant="ghost" className="h-9 hover:bg-orange-500/10 text-xs font-semibold rounded-lg px-2" onClick={handleInsertBlockquote} title="Insert Blockquote">
 <Quote className="h-3.5 w-3.5 mr-1" /> Quote
 </Button>
 <Button type="button" variant="ghost" className="h-9 hover:bg-orange-500/10 text-xs font-semibold rounded-lg px-2" onClick={handleInsertTable} title="Insert Table template">
 <TableIcon className="h-3.5 w-3.5 mr-1" /> Add Table
 </Button>
 <Button type="button" variant="ghost" className="h-9 hover:bg-orange-500/10 text-xs font-semibold rounded-lg px-2" onClick={handleInsertImageLink} title="Embed image URL">
 <LinkIcon className="h-3.5 w-3.5 mr-1" /> Image Link
 </Button>

 </div>

 {/* Editor Content Area */}
 <div className="relative">
 
 {/* contentEditable WYSIWYG element */}
 <div
 ref={editorRef}
 contentEditable
 onPaste={handleEditorPaste}
 className="min-h-[280px] max-h-[500px] overflow-y-auto p-5 bg-background border border-border rounded-b-2xl focus:outline-none focus:ring-1 focus:ring-orange-500/30 prose prose-orange dark:prose-invert max-w-none text-sm leading-relaxed"
 />

 {/* Direct Paste Help Banner overlay */}
 <div className="absolute right-4 bottom-4 glass px-3 py-1 rounded-full border border-orange-500/20 text-[10px] text-orange-600 dark:text-orange-400 font-semibold pointer-events-none flex items-center space-x-1 shadow-md">
 <ImageIcon className="h-3 w-3" />
 <span>Direct-Paste Clipboard Images Supported (Ctrl+V)</span>
 </div>

 </div>

 </div>

 {/* Submit Buttons */}
 <div className="flex space-x-3 pt-6 border-t border-border/50">
 <Button
 type="button"
 variant="outline"
 onClick={() => setIsEditing(false)}
 className="flex-1 rounded-xl py-6 border-border text-foreground hover:bg-orange-500/5 text-xs font-bold"
 >
 Cancel
 </Button>
 <Button
 type="submit"
 className="flex-1 rounded-xl py-6 hover: hover: text-white text-xs font-bold shadow-lg shadow-orange-500/10"
 >
 {currentPostId ? "Update Article" : "Publish Article to Feed"}
 </Button>
 </div>

 </form>
 </motion.div>
 ) : (
 
 /* Blog Posts Table view */
 <motion.div
 key="list-table"
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 exit={{ opacity: 0, y: -20 }}
 className="space-y-4"
 >
 {/* Filter controls */}
 <div className="relative max-w-md">
 <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
 <Input
 type="text"
 placeholder="Search articles by title, author, category..."
 value={searchTerm}
 onChange={(e) => setSearchTerm(e.target.value)}
 className="pl-10 pr-4 py-5 bg-white dark:bg-gray-800 rounded-xl border border-border text-sm"
 />
 </div>

 {/* List Board */}
 <div className="bg-white dark:bg-gray-800 rounded-3xl border border-border shadow-xl overflow-hidden">
 {filteredPosts.length === 0 ? (
 <div className="p-16 text-center text-muted-foreground text-sm">
 <PenTool className="h-10 w-10 text-muted-foreground/35 mx-auto mb-2" />
 No articles found. Click "Add New Post" to publish your first story.
 </div>
 ) : (
 <div className="overflow-x-auto">
 <table className="w-full text-left text-sm border-collapse">
 <thead>
 <tr className="bg-gray-50 dark:bg-gray-900 border-b border-border text-muted-foreground text-xs font-bold uppercase tracking-wider">
 <th className="p-4 pl-6">Cover Image</th>
 <th className="p-4">Title & Excerpt</th>
 <th className="p-4">Category</th>
 <th className="p-4">Author</th>
 <th className="p-4">Publish Date</th>
 <th className="p-4">Stats</th>
 <th className="p-4 pr-6 text-right">Actions</th>
 </tr>
 </thead>
 <tbody className="divide-y divide-border/60">
 {filteredPosts.map((post) => (
 <tr
 key={post.id}
 className="hover:bg-gray-50/50 dark:hover:bg-gray-900/20 transition-all cursor-pointer"
 onClick={() => handleOpenEdit(post)}
 >
 {/* Image */}
 <td className="p-4 pl-6">
 <div className="h-14 w-20 rounded-lg overflow-hidden border border-border shadow-sm">
 <img src={post.image} className="w-full h-full object-cover" alt="blog cover" />
 </div>
 </td>

 {/* Title Excerpt */}
 <td className="p-4 max-w-sm">
 <div className="flex items-center space-x-2">
 <span className="font-bold text-foreground line-clamp-1">{post.title}</span>
 {post.featured && (
 <Badge className="bg-orange-500 text-white border-none text-[9px] px-1.5 py-0.5">
 Featured
 </Badge>
 )}
 </div>
 <span className="text-xs text-muted-foreground line-clamp-2 mt-1 leading-relaxed">
 {post.excerpt}
 </span>
 </td>

 {/* Category */}
 <td className="p-4">
 <Badge variant="outline" className="border-orange-500/25 bg-orange-500/5 text-orange-600 dark:text-orange-400">
 {post.category}
 </Badge>
 </td>

 {/* Author */}
 <td className="p-4">
 <div className="flex items-center space-x-2">
 <img src={post.author.image} className="w-6 h-6 rounded-full" alt="author" />
 <span className="text-xs font-semibold text-muted-foreground">{post.author.name}</span>
 </div>
 </td>

 {/* Date */}
 <td className="p-4 text-xs font-medium text-muted-foreground">
 <div className="flex items-center space-x-1">
 <Calendar className="h-3.5 w-3.5 text-muted-foreground/60" />
 <span>{post.date}</span>
 </div>
 </td>

 {/* Stats */}
 <td className="p-4 text-xs font-medium text-muted-foreground">
 <div className="flex items-center space-x-1.5">
 <Eye className="h-3.5 w-3.5 text-muted-foreground/60" />
 <span>{post.views.toLocaleString()}</span>
 </div>
 </td>

 {/* Actions */}
 <td className="p-4 pr-6 text-right">
 <div className="flex justify-end space-x-2">
 <Button
 size="icon"
 variant="ghost"
 className="h-8 w-8 hover:bg-orange-500/10 text-orange-500 rounded-lg"
 onClick={(e) => {
 e.stopPropagation();
 handleOpenEdit(post);
 }}
 >
 <PenTool className="h-3.5 w-3.5" />
 </Button>
 <Button
 size="icon"
 variant="ghost"
 className="h-8 w-8 hover:bg-red-500/10 text-red-500 rounded-lg"
 onClick={(e) => handleDelete(post.id, e)}
 >
 <Trash2 className="h-3.5 w-3.5" />
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
 </motion.div>
 )}
 </AnimatePresence>

 </div>
 );
}

const BlogCMSPage = nextDynamic(
 () => Promise.resolve(BlogCMSPageComponent),
 { ssr: false }
);

export default BlogCMSPage;

"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Send, Bot, User, Sparkles, ChefHat, Clock, Star } from "lucide-react";

interface Message {
 id: string;
 content: string;
 sender: "user" | "ai";
 timestamp: Date;
 suggestions?: string[];
}

const aiSuggestions = [
 "What's a quick dinner recipe for tonight?",
 "Suggest restaurants near me for Italian food",
 "I have chicken and vegetables, what can I make?",
 "What's trending in food right now?",
];

// Force dynamic rendering to avoid SSR issues
export const dynamic = "force-dynamic";

export default function AIPage() {
 const [messages, setMessages] = useState<Message[]>([
 {
 id: "1",
 content:
 "Hello! I'm Foodiety AI, your personal culinary assistant. I can help you discover recipes, recommend restaurants, suggest meal plans, and answer any food-related questions. What would you like to explore today?",
 sender: "ai",
 timestamp: new Date(),
 suggestions: aiSuggestions,
 },
 ]);
 const [inputValue, setInputValue] = useState("");
 const [isTyping, setIsTyping] = useState(false);
 const [isMounted, setIsMounted] = useState(false);

 useEffect(() => {
 setIsMounted(true);
 }, []);

 const handleSendMessage = async (message: string) => {
 if (!message.trim()) return;

 const userMessage: Message = {
 id: Date.now().toString(),
 content: message,
 sender: "user",
 timestamp: new Date(),
 };

 setMessages((prev) => [...prev, userMessage]);
 setInputValue("");
 setIsTyping(true);

 // Simulate AI response
 setTimeout(() => {
 const aiResponse = generateAIResponse(message);
 const aiMessage: Message = {
 id: (Date.now() + 1).toString(),
 content: aiResponse.content,
 sender: "ai",
 timestamp: new Date(),
 suggestions: aiResponse.suggestions,
 };

 setMessages((prev) => [...prev, aiMessage]);
 setIsTyping(false);
 }, 1500);
 };

 const generateAIResponse = (
 userMessage: string
 ): { content: string; suggestions?: string[] } => {
 const lowerMessage = userMessage.toLowerCase();

 if (lowerMessage.includes("recipe") || lowerMessage.includes("cook")) {
 return {
 content:
 "I'd love to help you with recipes! Based on your interest, here are some popular options: Mediterranean Grilled Salmon (25 min, healthy), Authentic Italian Carbonara (20 min, comfort food), or Thai Green Curry (45 min, flavorful). Would you like detailed instructions for any of these, or do you have specific ingredients you'd like to use?",
 suggestions: [
 "Show me the salmon recipe",
 "I want something vegetarian",
 "Quick recipes under 20 minutes",
 "What can I make with chicken?",
 ],
 };
 }

 if (lowerMessage.includes("restaurant")) {
 return {
 content:
 "I can help you find great restaurants! For the best recommendations, I'd need to know your location and cuisine preferences. In general, I recommend checking our restaurant directory which features carefully curated partners known for quality and authenticity. What type of cuisine are you in the mood for?",
 suggestions: [
 "Italian restaurants",
 "Best sushi places",
 "Family-friendly dining",
 "Fine dining options",
 ],
 };
 }

 if (lowerMessage.includes("ingredient") || lowerMessage.includes("have")) {
 return {
 content:
 "Great! I love helping with ingredient-based cooking. Common ingredients like chicken, vegetables, pasta, or rice can be transformed into countless delicious meals. Could you tell me specifically what ingredients you have? I'll suggest some fantastic recipes that make the most of what's in your kitchen.",
 suggestions: [
 "I have chicken and broccoli",
 "Pasta and tomatoes",
 "Ground beef and onions",
 "Rice and vegetables",
 ],
 };
 }

 // Default response
 return {
 content:
 "That's an interesting question! I'm here to help with all things food-related. Whether you need recipe suggestions, restaurant recommendations, cooking tips, or meal planning advice, I'm ready to assist. What specific aspect of food and cooking would you like to explore?",
 suggestions: [
 "Suggest a recipe for dinner",
 "Find restaurants near me",
 "Help me meal plan",
 "What's trending in food?",
 ],
 };
 };

 return (
 <div className="pt-16">
 {!isMounted ? (
 <div className="min-h-screen flex items-center justify-center">
 <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-600"></div>
 </div>
 ) : (
 <>
 {/* Hero Section */}
 <section className="py-20 text-white">
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
 <motion.div
 initial={{ opacity: 0, y: 30 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.8 }}
 >
 <div className="flex items-center justify-center space-x-3 mb-6">
 <Sparkles className="h-8 w-8 text-yellow-300" />
 <h1 className="text-4xl md:text-5xl font-bold">
 Foodiety AI
 </h1>
 <Sparkles className="h-8 w-8 text-yellow-300" />
 </div>
 <p className="text-xl text-red-100 max-w-2xl mx-auto">
 Your personal culinary assistant powered by AI. Get instant
 recipe suggestions, restaurant recommendations, and cooking
 advice tailored just for you.
 </p>
 </motion.div>
 </div>
 </section>

 <section className="py-20 bg-gray-50 min-h-screen">
 <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
 <Card className="border-0 shadow-xl h-[600px] flex flex-col">
 <CardHeader className="border-b border-gray-100 bg-white">
 <CardTitle className="flex items-center space-x-2">
 <Bot className="h-6 w-6 text-red-600" />
 <span>Foodiety AI Assistant</span>
 <Badge className="bg-green-100 text-green-800">
 Online
 </Badge>
 </CardTitle>
 </CardHeader>

 {/* Chat Messages */}
 <CardContent className="flex-1 overflow-y-auto p-6 space-y-4">
 {messages.map((message) => (
 <motion.div
 key={message.id}
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.3 }}
 className={`flex ${
 message.sender === "user"
 ? "justify-end"
 : "justify-start"
 }`}
 >
 <div
 className={`flex items-start space-x-3 max-w-[80%] ${
 message.sender === "user"
 ? "flex-row-reverse space-x-reverse"
 : ""
 }`}
 >
 {/* Avatar */}
 <div
 className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
 message.sender === "user"
 ? "bg-blue-100 text-blue-600"
 : "bg-red-100 text-red-600"
 }`}
 >
 {message.sender === "user" ? (
 <User className="h-5 w-5" />
 ) : (
 <ChefHat className="h-5 w-5" />
 )}
 </div>

 {/* Message Content */}
 <div
 className={`rounded-2xl px-4 py-3 ${
 message.sender === "user"
 ? "bg-red-600 text-white"
 : "bg-gray-100 text-gray-900"
 }`}
 >
 <p className="text-sm leading-relaxed">
 {message.content}
 </p>

 {/* AI Suggestions */}
 {message.sender === "ai" && message.suggestions && (
 <div className="mt-4 space-y-2">
 <p className="text-xs text-gray-500 font-medium">
 Suggested questions:
 </p>
 <div className="grid grid-cols-1 gap-2">
 {message.suggestions.map(
 (suggestion, index) => (
 <Button
 key={index}
 variant="outline"
 size="sm"
 onClick={() =>
 handleSendMessage(suggestion)
 }
 className="text-left text-xs h-auto py-2 px-3 bg-white hover:bg-gray-50 text-gray-700 border-gray-200 rounded-lg"
 >
 {suggestion}
 </Button>
 )
 )}
 </div>
 </div>
 )}
 </div>
 </div>
 </motion.div>
 ))}

 {/* Typing Indicator */}
 {isTyping && (
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 className="flex justify-start"
 >
 <div className="flex items-start space-x-3">
 <div className="w-8 h-8 bg-red-100 text-red-600 rounded-full flex items-center justify-center">
 <ChefHat className="h-5 w-5" />
 </div>
 <div className="bg-gray-100 rounded-2xl px-4 py-3">
 <div className="flex space-x-1">
 <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
 <div
 className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
 style={{ animationDelay: "0.1s" }}
 />
 <div
 className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
 style={{ animationDelay: "0.2s" }}
 />
 </div>
 </div>
 </div>
 </motion.div>
 )}
 </CardContent>

 {/* Input Area */}
 <div className="border-t border-gray-100 p-4 bg-white">
 <form
 onSubmit={(e) => {
 e.preventDefault();
 handleSendMessage(inputValue);
 }}
 className="flex space-x-4"
 >
 <Input
 value={inputValue}
 onChange={(e) => setInputValue(e.target.value)}
 placeholder="Ask me about recipes, restaurants, or cooking tips..."
 className="flex-1 rounded-full border-gray-200 focus:border-red-500 focus:ring-red-500"
 disabled={isTyping}
 />
 <Button
 type="submit"
 size="icon"
 disabled={!inputValue.trim() || isTyping}
 className="bg-red-600 hover:bg-red-700 rounded-full"
 >
 <Send className="h-4 w-4" />
 </Button>
 </form>
 </div>
 </Card>
 </div>
 </section>

 {/* AI Features */}
 <section className="py-20 bg-white">
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
 <div className="text-center mb-16">
 <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
 What I Can Help You With
 </h2>
 <p className="text-lg text-gray-600 max-w-2xl mx-auto">
 Powered by advanced AI, I'm here to make your culinary journey
 easier and more enjoyable.
 </p>
 </div>

 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
 {[
 {
 icon: ChefHat,
 title: "Recipe Suggestions",
 description:
 "Get personalized recipe recommendations based on your preferences and available ingredients.",
 },
 {
 icon: Star,
 title: "Restaurant Finder",
 description:
 "Discover amazing restaurants and dining experiences tailored to your taste and location.",
 },
 {
 icon: Clock,
 title: "Meal Planning",
 description:
 "Plan your weekly meals with balanced nutrition and time-efficient cooking schedules.",
 },
 {
 icon: Sparkles,
 title: "Cooking Tips",
 description:
 "Learn professional techniques, ingredient substitutions, and cooking shortcuts.",
 },
 ].map((feature, index) => (
 <motion.div
 key={feature.title}
 initial={{ opacity: 0, y: 30 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.6, delay: index * 0.1 }}
 >
 <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
 <CardContent className="p-6 text-center">
 <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
 <feature.icon className="h-6 w-6 text-red-600" />
 </div>
 <h3 className="font-bold text-lg text-gray-900 mb-3 group-hover:text-red-600 transition-colors">
 {feature.title}
 </h3>
 <p className="text-gray-600 text-sm leading-relaxed">
 {feature.description}
 </p>
 </CardContent>
 </Card>
 </motion.div>
 ))}
 </div>
 </div>
 </section>
 </>
 )}
 </div>
 );
}

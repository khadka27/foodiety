"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Utensils,
  Star,
  Phone,
  Mail,
  Clock,
  ChefHat,
  Camera,
  Users,
  Lightbulb,
  Check,
  ArrowRight,
  Sparkles,
  Award,
} from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

const iconMap = [Utensils, ChefHat, Camera, Lightbulb, Users];
const fallbackGradients = [
  { gradient: "from-orange-500 to-red-500", glow: "shadow-orange-500/20" },
  { gradient: "from-amber-500 to-orange-500", glow: "shadow-amber-500/20" },
  { gradient: "from-blue-500 to-purple-500", glow: "shadow-blue-500/20" },
  { gradient: "from-green-500 to-teal-500", glow: "shadow-green-500/20" },
];

const defaultServices = [
  {
    title: "Event Catering",
    description:
      "Professional catering services for all your special occasions — from intimate gatherings to grand celebrations, we deliver culinary excellence every time.",
    features: [
      "Custom menu planning tailored to you",
      "Professional culinary staff",
      "Full event setup & breakdown",
      "Dietary & allergy accommodations",
    ],
    image: "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80",
    gradient: "from-orange-500 to-red-500",
    glow: 'shadow-orange-500/20',
    badge: "Most Popular",
  },
  {
    title: "Personal Chef Service",
    description:
      "Enjoy restaurant-quality meals in the comfort of your own home. Our personal chefs bring the finest dining experience directly to your table.",
    features: [
      "Fully customized meal planning",
      "Fresh, locally sourced ingredients",
      "In-home preparation & service",
      "Complete kitchen cleanup included",
    ],
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=800&q=80",
    gradient: "from-amber-500 to-orange-500",
    glow: 'shadow-amber-500/20',
  },
  {
    title: "Food Photography",
    description:
      "Professional food photography that makes your dishes irresistible. From menu shoots to social media content, we showcase your food at its finest.",
    features: [
      "Expert food styling & lighting",
      "High-resolution images delivered fast",
      "Multiple angles & compositions",
      "Social media ready formats",
    ],
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?auto=format&fit=crop&w=800&q=80",
    gradient: "from-blue-500 to-purple-500",
    glow: 'shadow-blue-500/20',
  },
  {
    title: "Culinary Consulting",
    description:
      "Expert guidance for restaurants, cafés, and food brands looking to elevate their offerings and streamline operations for maximum success.",
    features: [
      "Menu development & optimization",
      "Brand identity & strategy",
      "Staff training programs",
      "Operational efficiency review",
    ],
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=800&q=80",
    gradient: "from-green-500 to-teal-500",
    glow: 'shadow-green-500/20',
  },
];

const defaultStats = [
  { value: "500+", label: "Events Catered", icon: "🍽️" },
  { value: "98%", label: "Client Satisfaction", icon: "⭐" },
  { value: "50+", label: "Professional Chefs", icon: "👨‍🍳" },
  { value: "10+", label: "Years Experience", icon: "🏆" },
];

export default function ServicesPage() {
  const [services, setServices] = useState<any[]>(defaultServices);
  const [stats, setStats] = useState<any[]>(defaultStats);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const savedConfig = localStorage.getItem("foodiety_site_config");
    if (savedConfig) {
      try {
        const parsed = JSON.parse(savedConfig);
        if (parsed.services && parsed.services.length > 0) {
          setServices(parsed.services);
        }
        if (parsed.about) {
          const loadedStats = [
            { value: parsed.about.membersCount || "50K+", label: "Community Members", icon: "❤️" },
            { value: parsed.about.recipesCount || "10K+", label: "Recipes Shared", icon: "📖" },
            { value: parsed.about.restaurantsCount || "500+", label: "Partner Restaurants", icon: "🍽️" },
            { value: parsed.about.countriesCount || "25+", label: "Countries Reached", icon: "🌐" },
          ];
          setStats(loadedStats);
        }
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  if (!isMounted) {
    return (
      <div className="pt-16 min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 animate-pulse" />
          <p className="text-muted-foreground text-sm">Loading services...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16 overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative py-28 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-600 via-red-600 to-rose-700" />
        <div className="absolute inset-0 opacity-15" style={{
          backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)`,
          backgroundSize: '32px 32px',
        }} />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-amber-400/20 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/4" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center justify-center gap-3 mb-5">
              <div className="h-px w-12 bg-white/40" />
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-orange-200">What We Offer</span>
              <div className="h-px w-12 bg-white/40" />
            </div>
            <h1 className="heading-hero text-5xl sm:text-6xl md:text-7xl text-white mb-6">
              Our Services
            </h1>
            <p className="text-lg text-red-100 max-w-2xl mx-auto leading-relaxed mb-8">
              From intimate dinner parties to grand celebrations, we bring culinary excellence 
              and professional service to every occasion. Let us create unforgettable experiences.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/contact"
                className="btn-premium flex items-center justify-center gap-2 bg-white text-orange-600 hover:bg-orange-50 border-0 px-7 py-3 font-bold text-sm rounded-full shadow-2xl shadow-black/20">
                <Mail className="h-4 w-4" />
                Get a Quote
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="#services"
                className="btn-glass flex items-center justify-center gap-2 px-7 py-3 font-semibold text-sm rounded-full">
                Explore Services
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Strip */}
      <section className="py-10 bg-background border-b border-border/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat: any, i: number) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="text-center p-4 glass-card rounded-2xl border border-orange-100/30 dark:border-orange-900/20 hover:-translate-y-1 transition-transform duration-300"
              >
                <div className="text-3xl mb-1">{stat.icon}</div>
                <div className="text-2xl font-black text-gradient">{stat.value}</div>
                <div className="text-xs text-muted-foreground font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services List */}
      <section id="services" className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-20">
            {services.map((service: any, index: number) => {
              const defaultStyle = fallbackGradients[index % fallbackGradients.length];
              const gradient = service.gradient || defaultStyle.gradient;
              const glow = service.glow || defaultStyle.glow;
              const Icon = iconMap[index % iconMap.length];

              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.7 }}
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                    index % 2 === 1 ? "lg:flex-row-reverse" : ""
                  }`}
                >
                  {/* Content */}
                  <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                    <div className="flex items-center gap-3 mb-5">
                      <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg`}>
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      {service.badge && (
                        <span className={`px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r ${gradient} text-white flex items-center gap-1.5`}>
                          <Sparkles className="h-3 w-3" /> {service.badge}
                        </span>
                      )}
                    </div>

                    <h2 className="heading-section text-3xl md:text-4xl text-foreground mb-4">
                      {service.title}
                    </h2>
                    <p className="text-base text-muted-foreground mb-7 leading-relaxed">
                      {service.description}
                    </p>

                    {/* Features */}
                    {service.features && service.features.length > 0 && (
                      <ul className="space-y-3 mb-8">
                        {service.features.map((feature: string) => (
                          <li key={feature} className="flex items-center gap-3 text-sm text-muted-foreground">
                            <div className={`w-5 h-5 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center flex-shrink-0 shadow-sm`}>
                              <Check className="h-3 w-3 text-white" />
                            </div>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    )}

                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button className={`btn-premium px-7 py-3 text-sm shadow-xl ${glow}`} asChild>
                        <Link href="/contact" className="flex items-center gap-2">
                          Get Started
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button variant="outline" className="rounded-full px-7 border-border hover:border-orange-400 hover:text-orange-500 transition-all" asChild>
                        <Link href="/contact">Learn More</Link>
                      </Button>
                    </div>
                  </div>

                  {/* Image */}
                  <div className={`relative ${index % 2 === 1 ? "lg:order-1" : ""}`}>
                    <div className="relative rounded-3xl overflow-hidden shadow-2xl group">
                      <img
                        src={service.image || "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80"}
                        alt={service.title}
                        className="w-full h-[380px] sm:h-[420px] object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                      {/* Floating badge */}
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${gradient} text-white text-sm font-bold shadow-lg`}>
                          <Icon className="h-4 w-4" />
                          {service.title}
                        </div>
                      </div>
                    </div>
                    {/* Decorative blob */}
                    <div className={`absolute -z-10 -bottom-6 ${index % 2 === 0 ? '-right-6' : '-left-6'} w-40 h-40 bg-gradient-to-br ${gradient} opacity-15 rounded-full blur-2xl`} />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-600 via-red-600 to-rose-700" />
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.2) 1px, transparent 1px)`,
          backgroundSize: '28px 28px',
        }} />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-white/10 rounded-full blur-[100px]" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center justify-center gap-3 mb-5">
              <div className="h-px w-12 bg-white/40" />
              <Award className="h-4 w-4 text-amber-300" />
              <div className="h-px w-12 bg-white/40" />
            </div>
            <h2 className="heading-section text-4xl md:text-5xl text-white mb-5">
              Ready to Create Something Amazing?
            </h2>
            <p className="text-lg text-red-100 mb-8 max-w-xl mx-auto leading-relaxed">
              Let's discuss your next event and craft an unforgettable culinary experience together.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/contact"
                className="flex items-center justify-center gap-2 px-8 py-3.5 rounded-full font-bold text-base bg-white text-orange-600 hover:bg-orange-50 transition-all duration-200 shadow-2xl shadow-black/20 hover:-translate-y-0.5">
                <Mail className="h-4.5 w-4.5" style={{ width: '18px', height: '18px' }} />
                Get a Free Quote
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a href="tel:+15551234567"
                className="flex items-center justify-center gap-2 px-8 py-3.5 rounded-full font-semibold text-base border border-white/30 text-white hover:bg-white/10 transition-all duration-200 backdrop-blur-sm">
                <Phone className="h-4 w-4" />
                Call Us Now
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

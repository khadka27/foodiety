'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Button } from '@/components/ui/button';
import { Utensils, Camera, Users, Lightbulb, ChefHat, ArrowRight, Check, Sparkles } from 'lucide-react';
import Link from 'next/link';

const iconMap = [Utensils, Camera, Users, Lightbulb, ChefHat];
const fallbackDesigns = [
  { color: 'from-[#c05c31] to-[#e87a43]', iconBg: 'from-[#c05c31]/10 to-[#e87a43]/10 dark:from-[#c05c31]/20 dark:to-[#e87a43]/20', glow: 'shadow-[#c05c31]/10' },
  { color: 'from-[#e87a43] to-[#ebc63c]', iconBg: 'from-[#e87a43]/10 to-[#ebc63c]/10 dark:from-[#e87a43]/20 dark:to-[#ebc63c]/20', glow: 'shadow-[#e87a43]/10' },
  { color: 'from-[#ebc63c] to-[#d97742]', iconBg: 'from-[#ebc63c]/10 to-[#d97742]/10 dark:from-[#ebc63c]/20 dark:to-[#d97742]/20', glow: 'shadow-[#ebc63c]/10' },
  { color: 'from-[#d97742] to-[#c05c31]', iconBg: 'from-[#d97742]/10 to-[#c05c31]/10 dark:from-[#d97742]/20 dark:to-[#c05c31]/20', glow: 'shadow-[#d97742]/10' },
];

const defaultServices = [
  {
    title: 'Premium Catering',
    description: 'Exquisite culinary experiences for your special events, from intimate gatherings to grand celebrations.',
    features: ['Custom menus crafted to your taste', 'Professional culinary staff', 'Full-service event setup'],
    gradient: 'from-[#c05c31] to-[#e87a43]',
    glow: 'shadow-[#c05c31]/10',
    badge: 'Most Popular',
  },
  {
    title: 'Food Photography',
    description: 'Stunning visual storytelling that makes your dishes irresistible and your brand unforgettable.',
    features: ['Professional styling & lighting', 'High-resolution gallery delivery', 'Social media optimized content'],
    gradient: 'from-[#e87a43] to-[#ebc63c]',
    glow: 'shadow-[#e87a43]/10',
  },
  {
    title: 'Event Promotion',
    description: 'Strategic marketing to ensure your culinary events reach the right audience at the right time.',
    features: ['Social media campaigns', 'Influencer partnerships', 'Community outreach programs'],
    gradient: 'from-[#ebc63c] to-[#d97742]',
    glow: 'shadow-[#ebc63c]/10',
  },
  {
    title: 'Culinary Consulting',
    description: 'Expert guidance for restaurants, food brands, and culinary entrepreneurs looking to excel.',
    features: ['Menu development & optimization', 'Brand strategy planning', 'Operational efficiency audit'],
    gradient: 'from-[#d97742] to-[#c05c31]',
    glow: 'shadow-[#d97742]/10',
  },
];

export function ServicesSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.08 });
  const [services, setServices] = useState(defaultServices);

  useEffect(() => {
    const savedConfig = localStorage.getItem("foodiety_site_config");
    if (savedConfig) {
      try {
        const parsed = JSON.parse(savedConfig);
        if (parsed.services && parsed.services.length > 0) {
          setServices(parsed.services);
        }
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  return (
    <section ref={ref} className="py-12 md:py-16 relative overflow-hidden bg-background">
      {/* Decorative elements */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-red-500/6 rounded-full blur-[100px] animate-blob pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-orange-500/6 rounded-full blur-[100px] animate-blob animation-delay-2000 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-orange-500" />
            <span className="text-label text-orange-500">What We Offer</span>
            <div className="h-px w-12 bg-gradient-to-r from-orange-500 to-transparent" />
          </div>
          <h2 className="font-playfair font-bold text-4xl md:text-5xl text-foreground mb-4 leading-tight">
            Our <span className="text-[#c05c31] dark:text-[#ebc63c]">Services</span>
          </h2>
          <p className="text-base text-muted-foreground max-w-xl mx-auto leading-relaxed">
            From intimate catering to large-scale events, we bring culinary excellence 
            and professional service to every occasion.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service: any, index: number) => {
            const design = fallbackDesigns[index % fallbackDesigns.length];
            const color = service.gradient || design.color;
            const glow = service.glow || design.glow;
            const iconBg = design.iconBg;
            const Icon = iconMap[index % iconMap.length];

            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.12 }}
                className="group"
              >
                <div className={`relative h-full glass-card rounded-3xl p-7 border border-white/20 dark:border-white/5 hover:shadow-2xl ${glow} hover:-translate-y-2 transition-all duration-400`}>
                  {/* Popular badge */}
                  {service.badge && (
                    <div className={`absolute top-5 right-5 bg-gradient-to-r ${color} text-white text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1`}>
                      <Sparkles className="h-2.5 w-2.5" />
                      {service.badge}
                    </div>
                  )}

                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${iconBg} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <div className={`w-8 h-8 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center`}>
                      <Icon className="h-4.5 w-4.5 text-white" style={{ width: '18px', height: '18px' }} />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className={`text-xl font-bold text-foreground mb-3 group-hover:text-gradient transition-all duration-300`}
                    style={{ transition: 'all 0.3s ease' }}>
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-muted-foreground text-sm leading-relaxed mb-5">
                    {service.description}
                  </p>

                  {/* Features */}
                  {service.features && service.features.length > 0 && (
                    <ul className="space-y-2.5 mb-6">
                      {service.features.map((feature: string) => (
                        <li key={feature} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                          <div className={`w-4.5 h-4.5 rounded-full bg-gradient-to-br ${color} flex items-center justify-center flex-shrink-0 mt-0.5`} style={{ width: '18px', height: '18px', minWidth: '18px' }}>
                            <Check className="text-white" style={{ width: '10px', height: '10px' }} />
                          </div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* CTA */}
                  <Link href="/services"
                    className={`inline-flex items-center gap-2 text-sm font-semibold bg-gradient-to-r ${color} bg-clip-text text-transparent group-hover:gap-3 transition-all duration-200`}
                  >
                    Learn More
                    <ArrowRight className={`h-4 w-4 bg-gradient-to-r ${color} [background-clip:text] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] group-hover:translate-x-1 transition-transform`} />
                  </Link>

                  {/* Hover gradient overlay */}
                  <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${color} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-400 pointer-events-none`} />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-12"
        >
          <Button asChild className="btn-premium px-8 py-3 shadow-xl shadow-orange-500/25 text-base">
            <Link href="/services" className="flex items-center gap-2">
              Explore All Services
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
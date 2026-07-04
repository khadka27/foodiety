'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Utensils, Camera, Users, Lightbulb, ChefHat, ArrowRight, Check, Sparkles } from 'lucide-react';
import Link from 'next/link';

const iconMap = [Utensils, Camera, Users, Lightbulb, ChefHat];

const accentColors = [
  { border: '#c05c31', icon: '#c05c31', text: '#c05c31' },
  { border: '#e07b39', icon: '#e07b39', text: '#e07b39' },
  { border: '#c9a227', icon: '#c9a227', text: '#c9a227' },
  { border: '#d97742', icon: '#d97742', text: '#d97742' },
];

const defaultServices = [
  {
    title: 'Premium Catering',
    description: 'Exquisite culinary experiences for your special events, from intimate gatherings to grand celebrations.',
    features: ['Custom menus crafted to your taste', 'Professional culinary staff', 'Full-service event setup'],
    badge: 'Most Popular',
  },
  {
    title: 'Food Photography',
    description: 'Stunning visual storytelling that makes your dishes irresistible and your brand unforgettable.',
    features: ['Professional styling & lighting', 'High-resolution gallery delivery', 'Social media optimized content'],
  },
  {
    title: 'Event Promotion',
    description: 'Strategic marketing to ensure your culinary events reach the right audience at the right time.',
    features: ['Social media campaigns', 'Influencer partnerships', 'Community outreach programs'],
  },
  {
    title: 'Culinary Consulting',
    description: 'Expert guidance for restaurants, food brands, and culinary entrepreneurs looking to excel.',
    features: ['Menu development & optimization', 'Brand strategy planning', 'Operational efficiency audit'],
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.1, ease: [0.4, 0, 0.2, 1] as const },
  }),
};

export function ServicesSection() {
  const [services, setServices] = useState(defaultServices);
  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;
    fetch('/api/config')
      .then((res) => res.json())
      .then((res) => {
        if (res.success && res.data?.services?.length > 0) {
          setServices(res.data.services);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section className="py-20 md:py-28 relative overflow-hidden bg-background">
      {/* Subtle background blobs — no animation to avoid flicker */}
      <div
        className="absolute top-0 right-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'rgba(192,92,49,0.05)', filter: 'blur(100px)' }}
      />
      <div
        className="absolute bottom-0 left-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'rgba(235,198,60,0.05)', filter: 'blur(100px)' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span
            className="inline-flex items-center gap-1.5 text-xs font-bold tracking-widest uppercase px-3 py-1.5 rounded-full mb-4"
            style={{
              color: '#e07b39',
              background: 'rgba(224,123,57,0.1)',
              border: '1px solid rgba(224,123,57,0.25)',
            }}
          >
            <Sparkles className="h-3.5 w-3.5" />
            What We Offer
          </span>
          <h2 className="font-playfair font-bold text-4xl md:text-5xl text-foreground mb-4 leading-tight">
            Our{' '}
            <span style={{ color: '#c05c31' }} className="dark:text-[#ebc63c]">
              Services
            </span>
          </h2>
          <p className="text-base text-muted-foreground max-w-xl mx-auto leading-relaxed">
            From intimate catering to large-scale events, we bring culinary excellence
            and professional service to every occasion.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service: any, index: number) => {
            const Icon = iconMap[index % iconMap.length];
            const accent = accentColors[index % accentColors.length];

            return (
              <motion.div
                key={service.title}
                custom={index}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                className="group transition-[box-shadow] duration-300 hover:shadow-2xl"
              >
                <div
                  className="relative h-full rounded-3xl p-7 border transition-[border-color,box-shadow] duration-300 group-hover:border-[var(--hover-border)] group-hover:shadow-[var(--hover-shadow)]"
                  style={{
                    background: 'hsl(var(--card))',
                    borderColor: `${accent.border}22`,
                    boxShadow: `0 4px 24px ${accent.border}0d`,
                    '--hover-border': `${accent.border}55`,
                    '--hover-shadow': `0 12px 40px ${accent.border}20`,
                  } as React.CSSProperties}
                >
                  {/* Popular badge */}
                  {service.badge && (
                    <div
                      className="absolute top-5 right-5 text-white text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1"
                      style={{ background: accent.icon }}
                    >
                      <Sparkles className="h-2.5 w-2.5" />
                      {service.badge}
                    </div>
                  )}

                  {/* Icon */}
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-colors duration-300"
                    style={{ background: `${accent.icon}15` }}
                  >
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center"
                      style={{ background: accent.icon }}
                    >
                      <Icon className="text-white" style={{ width: 18, height: 18 }} />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-foreground mb-3">{service.title}</h3>

                  {/* Description */}
                  <p className="text-muted-foreground text-sm leading-relaxed mb-5">
                    {service.description}
                  </p>

                  {/* Features */}
                  {service.features?.length > 0 && (
                    <ul className="space-y-2.5 mb-6">
                      {service.features.map((feature: string) => (
                        <li key={feature} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                          <div
                            className="flex-shrink-0 rounded-full flex items-center justify-center mt-0.5"
                            style={{
                              width: 18,
                              height: 18,
                              minWidth: 18,
                              background: accent.icon,
                            }}
                          >
                            <Check className="text-white" style={{ width: 10, height: 10 }} />
                          </div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* CTA */}
                  <Link
                    href="/services"
                    className="inline-flex items-center gap-2 text-sm font-semibold transition-colors duration-200"
                    style={{ color: accent.text }}
                  >
                    Learn More
                    <ArrowRight className="transition-colors duration-200" style={{ width: 16, height: 16 }} />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          className="text-center mt-12"
        >
          <Button asChild className="px-8 py-3 rounded-full bg-orange-500 text-white shadow-xl shadow-orange-500/25 text-base transition-[background-color,box-shadow,color] duration-200 hover:bg-orange-600 hover:shadow-orange-500/35">
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
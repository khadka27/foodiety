'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Button } from '@/components/ui/button';
import { Mail, Phone, MapPin, Clock, ArrowRight, Star, MessageSquare, Sparkles } from 'lucide-react';
import Link from 'next/link';

const iconMap = {
  email: Mail,
  phone: Phone,
  address: MapPin,
  hours: Clock,
};

const defaultTestimonials = [
  { name: 'Sarah M.', role: 'Food Blogger', avatar: 'S', rating: 5, text: 'Foodiety completely changed how I discover restaurants. The reviews are spot-on!' },
  { name: 'James K.', role: 'Home Chef', avatar: 'J', rating: 5, text: 'The recipe collection is incredible. I cook something new every week.' },
];

export function ContactCTASection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [contactCTA, setContactCTA] = useState({
    title: "Start Your Culinary Journey Today",
    subtitle: "Whether you're planning an event, need catering services, or want to connect with fellow food enthusiasts — we're here to make your food dreams come true.",
    btnText: "Get In Touch"
  });
  const [contactInfo, setContactInfo] = useState({
    email: "hello@foodiety.com",
    phone: "+1 (555) 123-4567",
    address: "San Francisco, CA",
    hours: "9 AM – 8 PM Daily",
  });
  const [testimonials, setTestimonials] = useState<any[]>(defaultTestimonials);

  useEffect(() => {
    const savedConfig = localStorage.getItem("foodiety_site_config");
    if (savedConfig) {
      try {
        const parsed = JSON.parse(savedConfig);
        if (parsed.home?.contactCTA) {
          setContactCTA(parsed.home.contactCTA);
        }
        if (parsed.contact) {
          setContactInfo({
            email: parsed.contact.email || "hello@foodiety.com",
            phone: parsed.contact.phone || "+1 (555) 123-4567",
            address: parsed.contact.address || "San Francisco, CA",
            hours: parsed.contact.hours || "9 AM – 8 PM Daily",
          });
        }
        if (parsed.home?.testimonials && parsed.home.testimonials.length > 0) {
          setTestimonials(parsed.home.testimonials);
        }
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const contactCards = [
    { icon: Mail, label: 'Email Us', value: contactInfo.email, color: 'from-orange-500 to-red-500' },
    { icon: Phone, label: 'Call Us', value: contactInfo.phone, color: 'from-blue-500 to-purple-500' },
    { icon: MapPin, label: 'Visit Us', value: contactInfo.address, color: 'from-green-500 to-teal-500' },
    { icon: Clock, label: 'Open Hours', value: contactInfo.hours, color: 'from-amber-500 to-orange-500' },
  ];

  const titleWords = contactCTA.title.split(' ');
  const midPoint = Math.ceil(titleWords.length / 2);
  const titleFirst = titleWords.slice(0, midPoint).join(' ');
  const titleSecond = titleWords.slice(midPoint).join(' ');

  return (
    <section ref={ref} className="py-24 md:py-32 relative overflow-hidden">
      {/* Dramatic Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-600 via-red-600 to-rose-700 dark:from-orange-950 dark:via-red-950 dark:to-rose-950" />
      <div className="absolute inset-0 bg-noise opacity-30" />

      {/* Animated orbs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 dark:bg-white/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4 animate-blob pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-amber-400/20 dark:bg-amber-800/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/4 animate-blob animation-delay-2000 pointer-events-none" />

      {/* Dot pattern overlay */}
      <div className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)`,
          backgroundSize: '32px 32px',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Left: Copy */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            {/* Label */}
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-10 bg-white/50" />
              <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-orange-200">Get In Touch</span>
            </div>

            <h2 className="heading-section text-4xl md:text-5xl lg:text-6xl text-white mb-5 leading-tight">
              {titleFirst}<br />
              <span className="text-amber-300">{titleSecond}</span>
            </h2>

            <p className="text-lg text-red-100 mb-8 leading-relaxed max-w-md">
              {contactCTA.subtitle}
            </p>

            {/* Contact Cards Grid */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              {contactCards.map((card, i) => (
                <motion.div
                  key={card.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.08 }}
                  className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/15 hover:border-white/25 transition-all duration-200 backdrop-blur-sm group cursor-pointer"
                >
                  <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center flex-shrink-0 shadow-lg`}>
                    <card.icon className="h-4 w-4 text-white" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-white/60 text-[10px] font-semibold uppercase tracking-wider">{card.label}</div>
                    <div className="text-white text-xs font-semibold truncate">{card.value}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/contact" className="btn-glass flex items-center justify-center gap-2 bg-white text-orange-600 hover:bg-orange-50 border-0 rounded-full px-7 py-3 font-bold text-sm shadow-2xl shadow-black/20 transition-all duration-200 hover:-translate-y-1">
                <MessageSquare className="h-4 w-4" />
                {contactCTA.btnText}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/services" className="btn-glass flex items-center justify-center gap-2 rounded-full px-7 py-3 font-semibold text-sm">
                <Sparkles className="h-4 w-4" />
                View Services
              </Link>
            </div>
          </motion.div>

          {/* Right: Testimonials + Image */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-5"
          >
            {/* Main Image */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-black/30 aspect-[4/3]">
              <img
                src="https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Our team at work"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

              {/* Floating review card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.8 }}
                className="absolute bottom-5 left-5 right-5"
              >
                <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-md rounded-2xl p-4 shadow-xl">
                  <div className="flex items-center gap-1 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 text-amber-400 fill-current" />
                    ))}
                    <span className="ml-1.5 text-xs font-bold text-foreground">4.9/5</span>
                  </div>
                  <p className="text-xs text-muted-foreground italic">"Best food discovery platform I've ever used!"</p>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center text-white text-[10px] font-bold">A</div>
                    <span className="text-xs font-semibold text-foreground">Alex T. · Verified User</span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Testimonial Cards */}
            <div className="grid grid-cols-1 gap-3">
              {testimonials.map((t: any, i: number) => (
                <motion.div
                  key={t.name}
                  initial={{ opacity: 0, y: 15 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.6 + i * 0.1 }}
                  className="flex items-start gap-3 p-4 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/15 backdrop-blur-sm transition-all duration-200"
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    {t.avatar}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-white text-sm font-semibold">{t.name}</span>
                      <span className="text-red-200 text-xs">{t.role}</span>
                      <div className="flex ml-auto">
                        {[...Array(t.rating)].map((_: any, j: number) => (
                          <Star key={j} className="h-3 w-3 text-amber-300 fill-current" />
                        ))}
                      </div>
                    </div>
                    <p className="text-red-100 text-xs leading-relaxed">{t.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
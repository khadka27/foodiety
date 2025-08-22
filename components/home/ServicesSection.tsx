'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Utensils, Camera, Users, Lightbulb, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const services = [
  {
    icon: Utensils,
    title: 'Premium Catering',
    description: 'Exquisite culinary experiences for your special events, from intimate gatherings to grand celebrations.',
    features: ['Custom menus', 'Professional staff', 'Full-service setup'],
    color: 'from-red-500 to-orange-500',
  },
  {
    icon: Camera,
    title: 'Food Photography',
    description: 'Stunning visual storytelling that makes your dishes irresistible and your brand unforgettable.',
    features: ['Professional shoots', 'Social media content', 'Menu photography'],
    color: 'from-orange-500 to-yellow-500',
  },
  {
    icon: Users,
    title: 'Event Promotion',
    description: 'Strategic marketing and promotion services to ensure your culinary events reach the right audience.',
    features: ['Social media campaigns', 'Influencer partnerships', 'Community outreach'],
    color: 'from-yellow-500 to-green-500',
  },
  {
    icon: Lightbulb,
    title: 'Culinary Consulting',
    description: 'Expert guidance for restaurants, food brands, and culinary entrepreneurs looking to excel.',
    features: ['Menu development', 'Brand strategy', 'Operational optimization'],
    color: 'from-green-500 to-blue-500',
  },
];

export function ServicesSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section ref={ref} className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Our Services
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From intimate catering to large-scale events, we bring culinary excellence 
            and professional service to every occasion.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-xl transition-all duration-300 group border border-border shadow-lg bg-card">
                <CardHeader className="pb-4">
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${service.color} p-4 mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <service.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold text-foreground group-hover:text-red-600 transition-colors">
                    {service.title}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground text-base leading-relaxed">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center text-sm text-muted-foreground">
                        <div className="w-2 h-2 bg-red-500 rounded-full mr-3" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button 
                    asChild 
                    className="w-full bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800 group-hover:scale-105 transition-all duration-200"
                  >
                    <Link href="/services" className="flex items-center justify-center space-x-2">
                      <span>Learn More</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Utensils, Camera, Users, Lightbulb, Check, ArrowRight } from 'lucide-react';

const services = [
  {
    icon: Utensils,
    title: 'Premium Catering',
    description: 'Exquisite culinary experiences tailored for your special events, from intimate gatherings to grand celebrations.',
    image: 'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=800',
    features: [
      'Custom menu design and planning',
      'Professional chef and service staff',
      'Full-service setup and cleanup',
      'Dietary restriction accommodations',
      'Event coordination and timing',
    ],
    pricing: 'Starting at $75 per person',
    popular: true,
  },
  {
    icon: Camera,
    title: 'Food Photography',
    description: 'Stunning visual storytelling that makes your dishes irresistible and your brand unforgettable.',
    image: 'https://images.pexels.com/photos/3184460/pexels-photo-3184460.jpeg?auto=compress&cs=tinysrgb&w=800',
    features: [
      'Professional food styling',
      'High-resolution digital images',
      'Social media optimized content',
      'Menu and marketing photography',
      'Brand consistency guidelines',
    ],
    pricing: 'Starting at $500 per session',
    popular: false,
  },
  {
    icon: Users,
    title: 'Event Promotion',
    description: 'Strategic marketing and promotion services to ensure your culinary events reach the right audience.',
    image: 'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=800',
    features: [
      'Social media campaign management',
      'Influencer partnership coordination',
      'Community outreach programs',
      'Event listing optimization',
      'Performance analytics and reporting',
    ],
    pricing: 'Starting at $1,200 per campaign',
    popular: false,
  },
  {
    icon: Lightbulb,
    title: 'Culinary Consulting',
    description: 'Expert guidance for restaurants, food brands, and culinary entrepreneurs looking to excel in the industry.',
    image: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800',
    features: [
      'Menu development and optimization',
      'Brand strategy and positioning',
      'Operational efficiency analysis',
      'Staff training programs',
      'Market research and insights',
    ],
    pricing: 'Starting at $200 per hour',
    popular: false,
  },
];

export default function ServicesPage() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-red-600 to-orange-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Our Services
            </h1>
            <p className="text-xl text-red-100 max-w-3xl mx-auto">
              From intimate catering to large-scale events, we bring culinary excellence 
              and professional service to every occasion. Let us help you create unforgettable experiences.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section ref={ref} className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                }`}
              >
                {/* Content */}
                <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                      <service.icon className="h-6 w-6 text-red-600" />
                    </div>
                    {service.popular && (
                      <Badge className="bg-red-600 text-white">Most Popular</Badge>
                    )}
                  </div>
                  
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                    {service.title}
                  </h3>
                  <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  <div className="space-y-3 mb-6">
                    {service.features.map((feature) => (
                      <div key={feature} className="flex items-center space-x-3">
                        <Check className="h-5 w-5 text-green-600 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between mb-6">
                    <div className="text-2xl font-bold text-red-600">
                      {service.pricing}
                    </div>
                  </div>

                  <Button 
                    size="lg" 
                    className="bg-red-600 hover:bg-red-700 px-8 py-3 rounded-full font-semibold transition-all duration-200 hover:scale-105"
                  >
                    <span>Get Quote</span>
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </Button>
                </div>

                {/* Image */}
                <div className={index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}>
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-96 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Ready to Work Together?
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Contact us today to discuss your project and discover how we can bring your culinary vision to life.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-red-600 hover:bg-red-700 px-8 py-3 rounded-full font-semibold transition-all duration-200 hover:scale-105"
            >
              <Link href="/contact" className="flex items-center space-x-2">
                <span>Start Your Project</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
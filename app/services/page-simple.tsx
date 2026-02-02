"use client";

// Simple services page without animations to fix SSR context issues
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Utensils,
  Calendar,
  Users,
  Star,
  Phone,
  Mail,
  MapPin,
  Clock,
  ChefHat,
  Camera,
  Heart,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

const services = [
  {
    title: "Event Catering",
    description:
      "Professional catering services for all your special occasions. From intimate gatherings to grand celebrations.",
    features: [
      "Custom menu planning",
      "Professional staff",
      "Full event setup",
      "Dietary accommodations",
    ],
    icon: <Utensils className="h-8 w-8" />,
    image:
      "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Personal Chef Service",
    description:
      "Enjoy restaurant-quality meals in the comfort of your own home with our personal chef services.",
    features: [
      "Customized meal planning",
      "Fresh, local ingredients",
      "In-home preparation",
      "Cleanup included",
    ],
    icon: <ChefHat className="h-8 w-8" />,
    image:
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Food Photography",
    description:
      "Professional food photography services to showcase your culinary creations in the best light.",
    features: [
      "Professional styling",
      "High-quality images",
      "Multiple angles",
      "Quick turnaround",
    ],
    icon: <Camera className="h-8 w-8" />,
    image:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?auto=format&fit=crop&w=800&q=80",
  },
];

export default function ServicesPage() {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-red-600 to-orange-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Our Services
            </h1>
            <p className="text-xl text-red-100 mb-8 max-w-3xl mx-auto leading-relaxed">
              From intimate dinner parties to grand celebrations, we bring
              culinary excellence and professional service to every occasion.
              Let us help you create unforgettable experiences.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {services.map((service, index) => (
              <div
                key={service.title}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? "lg:grid-flow-col-dense" : ""
                }`}
              >
                <div className={index % 2 === 1 ? "lg:col-start-2" : ""}>
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-red-600 mr-4">
                      {service.icon}
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900">
                      {service.title}
                    </h2>
                  </div>
                  <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  <ul className="space-y-3 mb-8">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mr-3">
                          <Star className="h-3 w-3 text-green-600" />
                        </div>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-full font-semibold transition-all duration-200 hover:scale-105 shadow-lg">
                    Learn More
                  </Button>
                </div>
                <div className={index % 2 === 1 ? "lg:col-start-1" : ""}>
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-[400px] object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-600 to-red-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Create Something Amazing?
            </h2>
            <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
              Let's discuss your next event and create an unforgettable culinary
              experience together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                asChild
                size="lg"
                className="bg-white text-red-600 hover:bg-gray-100 px-8 py-3 rounded-full font-semibold transition-all duration-200 hover:scale-105 shadow-lg"
              >
                <Link href="/contact" className="flex items-center space-x-2">
                  <Mail className="h-5 w-5" />
                  <span>Get a Quote</span>
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-red-600 px-8 py-3 rounded-full font-semibold transition-all duration-200 hover:scale-105"
              >
                <Phone className="h-5 w-5 mr-2" />
                Call Us
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

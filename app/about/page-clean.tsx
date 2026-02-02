'use client';

import { useInView } from 'react-intersection-observer';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Heart, Users, Award, Globe, Target, Eye, Zap } from 'lucide-react';

export const dynamic = "force-dynamic";

const timeline = [
  {
    year: '2020',
    title: 'The Beginning',
    description: 'Started as a passion project by three food enthusiasts sharing family recipes.',
  },
  {
    year: '2021',
    title: 'Community Growth',
    description: 'Reached 1,000 members and launched our first cooking workshops.',
  },
  {
    year: '2022',
    title: 'Service Expansion',
    description: 'Added catering services and food photography to our offerings.',
  },
  {
    year: '2023',
    title: 'Restaurant Partnerships',
    description: 'Partnered with 100+ restaurants and launched our restaurant directory.',
  },
  {
    year: '2024',
    title: 'AI Integration',
    description: 'Introduced Foodiety AI for personalized recipe recommendations.',
  },
  {
    year: '2025',
    title: 'Global Expansion',
    description: 'Expanding internationally with localized content and partnerships.',
  },
];

const team = [
  {
    name: 'Sarah Chen',
    role: 'Founder & Head Chef',
    image: 'https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg?auto=compress&cs=tinysrgb&w=400',
    bio: 'Culinary Institute graduate with 15 years of experience in fine dining and food innovation.',
  },
  {
    name: 'Marco Rodriguez',
    role: 'Creative Director',
    image: 'https://images.pexels.com/photos/3184183/pexels-photo-3184183.jpeg?auto=compress&cs=tinysrgb&w=400',
    bio: 'Award-winning food photographer and visual storyteller with a passion for authentic cuisine.',
  },
  {
    name: 'Elena Thompson',
    role: 'Community Manager',
    image: 'https://images.pexels.com/photos/3184460/pexels-photo-3184460.jpeg?auto=compress&cs=tinysrgb&w=400',
    bio: 'Food blogger and nutritionist dedicated to building inclusive culinary communities.',
  },
];

const values = [
  {
    icon: Heart,
    title: 'Passion First',
    description: 'Every recipe, every story, and every service comes from genuine love for food and cooking.',
  },
  {
    icon: Users,
    title: 'Community Driven',
    description: 'We believe the best food experiences are shared, and our community is at the heart of everything we do.',
  },
  {
    icon: Award,
    title: 'Quality Excellence',
    description: 'From ingredients to execution, we maintain the highest standards in everything we create and recommend.',
  },
  {
    icon: Globe,
    title: 'Cultural Respect',
    description: 'We celebrate diverse culinary traditions while honoring their origins and authenticity.',
  },
];

export default function AboutPage() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-red-600 to-orange-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                About Foodiety
              </h1>
              <p className="text-xl text-red-100 mb-8 leading-relaxed">
                We're more than just a food platform – we're a community of passionate food lovers 
                dedicated to making exceptional culinary experiences accessible to everyone.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold">50K+</div>
                  <div className="text-red-200">Community Members</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">10K+</div>
                  <div className="text-red-200">Recipes Shared</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">500+</div>
                  <div className="text-red-200">Partner Restaurants</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">25+</div>
                  <div className="text-red-200">Countries Reached</div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Our team"
                  className="w-full h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section ref={ref} className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div>
              <Card className="h-full border-0 shadow-lg">
                <CardContent className="p-8 text-center">
                  <Target className="h-12 w-12 text-red-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Our Mission</h3>
                  <p className="text-gray-600 leading-relaxed">
                    To democratize exceptional food experiences by connecting people through 
                    authentic recipes, quality ingredients, and memorable dining adventures.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card className="h-full border-0 shadow-lg">
                <CardContent className="p-8 text-center">
                  <Eye className="h-12 w-12 text-red-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Our Vision</h3>
                  <p className="text-gray-600 leading-relaxed">
                    A world where great food brings people together, cultural traditions are preserved, 
                    and culinary creativity knows no bounds.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card className="h-full border-0 shadow-lg">
                <CardContent className="p-8 text-center">
                  <Zap className="h-12 w-12 text-red-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Our Impact</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Empowering home cooks, supporting local restaurants, and fostering 
                    a global community passionate about food and culture.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Values
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              These core principles guide everything we do and shape how we serve our community.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <div key={value.title}>
                <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg h-full">
                  <CardContent className="p-8">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                        <value.icon className="h-6 w-6 text-red-600" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-red-600 transition-colors">
                          {value.title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                          {value.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Journey
            </h2>
            <p className="text-lg text-gray-600">
              From humble beginnings to a thriving community – here's how we've grown together.
            </p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-0.5 bg-red-200" />

            <div className="space-y-12">
              {timeline.map((item, index) => (
                <div
                  key={item.year}
                  className={`relative flex items-center ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Timeline Node */}
                  <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 bg-red-600 rounded-full border-4 border-white shadow-lg z-10" />

                  {/* Content */}
                  <div className={`ml-12 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                    <Card className="border-0 shadow-lg">
                      <CardContent className="p-6">
                        <Badge className="bg-red-600 text-white mb-3">{item.year}</Badge>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                        <p className="text-gray-600">{item.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The passionate individuals behind Foodiety who work tirelessly to bring you 
              the best culinary experiences and content.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={member.name}>
                <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg overflow-hidden">
                  <div className="relative overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <CardContent className="p-6 text-center">
                    <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-red-600 transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-red-600 font-medium mb-3">{member.role}</p>
                    <p className="text-gray-600 text-sm leading-relaxed">{member.bio}</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

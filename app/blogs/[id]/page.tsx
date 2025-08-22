'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Calendar, Eye, Share2, Heart, Bookmark, User, ArrowLeft, Clock } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

// This would typically come from a CMS or database
const blogPost = {
  id: 1,
  title: 'The Art of Perfect Pasta: Secrets from Italian Grandmothers',
  content: `
    <p>There's something magical about watching an Italian grandmother make pasta from scratch. The way her weathered hands work the dough, the intuitive understanding of texture and timing, the stories shared while rolling each strand – it's a masterclass in both cooking and cultural preservation.</p>

    <p>After spending three months in various Italian kitchens, learning from nonnas who've been perfecting their craft for decades, I've gathered their most closely guarded secrets. These aren't just cooking techniques; they're time-honored traditions that transform simple ingredients into extraordinary experiences.</p>

    <h2>The Foundation: Choosing Your Flour</h2>
    <p>Every great pasta begins with the right flour. Italian grandmothers swear by "00" flour (doppio zero), which is milled to an incredibly fine consistency. This creates the perfect texture – smooth yet with enough grip to hold sauce beautifully.</p>

    <blockquote>"La pasta è come la vita – serve pazienza e amore." (Pasta is like life – it requires patience and love.) - Nonna Maria, age 84</blockquote>

    <h2>The Golden Ratio</h2>
    <p>For every 100 grams of flour, use one large egg. This ratio has been passed down through generations and creates the perfect elasticity. Some regions add a pinch of semolina for extra texture, but the basic ratio remains sacred.</p>

    <h2>The Kneading Ritual</h2>
    <p>Kneading isn't just about developing gluten – it's a meditative process. Italian nonnas knead for exactly 10 minutes, no more, no less. They listen to the dough, feeling when it transforms from rough and shaggy to smooth and elastic.</p>

    <h2>The Rest Period</h2>
    <p>After kneading, the dough must rest for at least 30 minutes, wrapped in a damp cloth. This allows the gluten to relax and makes rolling much easier. Many grandmothers use this time to prepare their sauce or simply enjoy an espresso.</p>

    <h2>Rolling Techniques</h2>
    <p>The traditional wooden rolling pin (mattarello) is preferred over machines for its ability to create the perfect thickness variation. Roll from the center outward, rotating the dough 90 degrees regularly to maintain a circular shape.</p>

    <h2>The Final Touch</h2>
    <p>Always cook pasta in abundant, well-salted water – as salty as the sea. The pasta should be al dente, with just a slight resistance when bitten. Reserve some pasta water before draining; its starch content helps bind sauce to pasta perfectly.</p>
  `,
  excerpt: 'Discover the time-honored techniques that make Italian pasta truly exceptional, passed down through generations of skilled home cooks.',
  image: 'https://images.pexels.com/photos/4518843/pexels-photo-4518843.jpeg?auto=compress&cs=tinysrgb&w=1200',
  date: '2024-12-15',
  views: 2847,
  category: 'Cooking Tips',
  readTime: '8 min read',
  author: {
    name: 'Isabella Romano',
    image: 'https://images.pexels.com/photos/3184460/pexels-photo-3184460.jpeg?auto=compress&cs=tinysrgb&w=200',
    bio: 'Food writer and Italian cuisine specialist',
  },
  tags: ['Italian', 'Pasta', 'Traditional', 'Techniques'],
  relatedPosts: [
    {
      id: 2,
      title: 'Global Street Food: A Journey Through Authentic Flavors',
      image: 'https://images.pexels.com/photos/4958792/pexels-photo-4958792.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Travel',
    },
    {
      id: 3,
      title: 'Seasonal Cooking: Winter Comfort Foods That Warm the Soul',
      image: 'https://images.pexels.com/photos/2890387/pexels-photo-2890387.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Seasonal',
    },
  ],
};

export default function BlogPostPage() {
  const params = useParams();

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-red-600 to-orange-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Button asChild variant="ghost" className="text-white hover:bg-white/10 mb-6">
              <Link href="/blogs" className="flex items-center space-x-2">
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Blogs</span>
              </Link>
            </Button>

            <Badge className="bg-white/20 text-white mb-4">{blogPost.category}</Badge>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              {blogPost.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 text-red-100">
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4" />
                <span>{new Date(blogPost.date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Eye className="h-4 w-4" />
                <span>{blogPost.views.toLocaleString()} views</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4" />
                <span>{blogPost.readTime}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Featured Image */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="mb-8"
              >
                <img
                  src={blogPost.image}
                  alt={blogPost.title}
                  className="w-full h-96 object-cover rounded-2xl shadow-xl"
                />
              </motion.div>

              {/* Author Info */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="mb-8"
              >
                <Card className="border-0 shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <img
                        src={blogPost.author.image}
                        alt={blogPost.author.name}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-bold text-lg text-gray-900">{blogPost.author.name}</h3>
                        <p className="text-gray-600 text-sm">{blogPost.author.bio}</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Heart className="h-4 w-4 mr-2" />
                          Like
                        </Button>
                        <Button variant="outline" size="sm">
                          <Share2 className="h-4 w-4 mr-2" />
                          Share
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Article Content */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="prose prose-lg prose-gray max-w-none mb-8"
                dangerouslySetInnerHTML={{ __html: blogPost.content }}
              />

              {/* Tags */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="mb-8"
              >
                <div className="flex flex-wrap gap-2">
                  {blogPost.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="hover:bg-red-100 hover:text-red-800 cursor-pointer">
                      #{tag}
                    </Badge>
                  ))}
                </div>
              </motion.div>

              {/* Related Posts */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Related Articles</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {blogPost.relatedPosts.map((post) => (
                    <Card key={post.id} className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md overflow-hidden">
                      <div className="relative overflow-hidden">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-32 object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <Badge className="absolute top-2 left-2 bg-red-600 text-white text-xs">
                          {post.category}
                        </Badge>
                      </div>
                      <CardContent className="p-4">
                        <h4 className="font-semibold text-gray-900 group-hover:text-red-600 transition-colors line-clamp-2">
                          {post.title}
                        </h4>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Share Actions */}
                <Card className="border-0 shadow-lg">
                  <CardContent className="p-6">
                    <h4 className="font-bold text-gray-900 mb-4">Share this article</h4>
                    <div className="space-y-3">
                      <Button variant="outline" className="w-full justify-start">
                        <Share2 className="h-4 w-4 mr-2" />
                        Share on Social
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Bookmark className="h-4 w-4 mr-2" />
                        Bookmark
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Newsletter Signup */}
                <Card className="border-0 shadow-lg bg-red-50">
                  <CardContent className="p-6">
                    <h4 className="font-bold text-gray-900 mb-2">Stay Updated</h4>
                    <p className="text-sm text-gray-600 mb-4">
                      Get the latest recipes and food stories delivered to your inbox.
                    </p>
                    <div className="space-y-3">
                      <input
                        type="email"
                        placeholder="Enter your email"
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                      />
                      <Button className="w-full bg-red-600 hover:bg-red-700">
                        Subscribe
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
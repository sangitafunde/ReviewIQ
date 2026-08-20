"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Search, BarChart3, TrendingUp, MessageCircle, Star, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function LandingPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    } else {
      router.push(`/search`);
    }
  };

  // Enhanced Animation variants for dramatic sliding text
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      }
    }
  };

  const slideUp = {
    hidden: { opacity: 0, y: 120, filter: "blur(10px)" },
    show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } }
  };

  // Floating background elements
  const floatingElements = [
    { icon: Star, color: "text-amber-400", bg: "bg-amber-100 dark:bg-amber-900/30", x: "10%", y: "20%", delay: 0 },
    { icon: MessageCircle, color: "text-blue-500", bg: "bg-blue-100 dark:bg-blue-900/30", x: "80%", y: "15%", delay: 1 },
    { icon: TrendingUp, color: "text-green-500", bg: "bg-green-100 dark:bg-green-900/30", x: "85%", y: "60%", delay: 2 },
    { icon: BarChart3, color: "text-purple-500", bg: "bg-purple-100 dark:bg-purple-900/30", x: "15%", y: "70%", delay: 1.5 },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-[#FCFBF4] dark:bg-slate-950 font-sans">
      {/* Header - Trustpilot Style (Dark Background) */}
      <header className="px-4 lg:px-8 h-20 flex items-center justify-between bg-[#191919] z-50 text-white">
        <Link className="flex items-center gap-2 hover:opacity-90 transition-opacity" href="/">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500 text-white font-black text-xl">
            R
          </div>
          <span className="font-bold text-2xl tracking-tight">ReviewIQ</span>
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          <Link className="text-[15px] font-semibold hover:text-indigo-400 transition-colors" href="/search">
            Write a review
          </Link>
          <Link className="text-[15px] font-semibold hover:text-indigo-400 transition-colors" href="#categories">
            Categories
          </Link>
          <Link className="text-[15px] font-semibold hover:text-indigo-400 transition-colors" href="#about">
            Blog
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <Link href="/login" className="text-[15px] font-semibold hover:text-indigo-400 hidden sm:block">
            Log in
          </Link>
          <Link 
            href="/login" 
            className="inline-flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-full px-6 py-2 h-10 md:py-5 md:h-[42px] text-[15px] transition-transform hover:scale-105"
          >
            For businesses
          </Link>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="flex-1">
        {/* NEW TRUSTPILOT-STYLE HERO SECTION */}
        <section className="relative w-full py-24 lg:py-32 flex flex-col items-center justify-center overflow-hidden min-h-[500px]">
          
          {/* Blue Geometric Edge Shapes (Mimicking Trustpilot's brand shapes) */}
          <div className="absolute top-0 right-[15%] w-[400px] h-[150px] bg-indigo-500 rounded-b-full opacity-90 -translate-y-1/2 hidden md:block" />
          <div className="absolute bottom-0 left-[-5%] w-[300px] h-[300px] bg-blue-600 rounded-tr-full opacity-90 translate-y-1/4 hidden md:block" />
          <div className="absolute bottom-[-10%] right-[-5%] w-[250px] h-[250px] bg-cyan-400 rounded-tl-full opacity-90 hidden lg:block" />

          <div className="container px-4 md:px-12 mx-auto relative z-20 flex flex-col items-center text-center">
            
            {/* Simple Centered Heading */}
            <motion.h1 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-[#191919] dark:text-white mb-4"
            >
              Find a business you can trust
            </motion.h1>
            
            {/* Simple Subtitle */}
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-lg md:text-[22px] text-slate-700 dark:text-slate-300 mb-10 font-medium"
            >
              Discover, read, and write reviews
            </motion.p>
            
            {/* Trustpilot-Style Search Bar */}
            <motion.form 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              onSubmit={handleSearch} 
              className="relative max-w-[800px] w-full flex items-center bg-white rounded-full p-2 shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-slate-200"
            >
              <Input 
                type="text"
                placeholder="Search company or category"
                className="w-full h-12 md:h-14 pl-6 pr-[60px] border-none bg-transparent text-base md:text-[17px] shadow-none focus-visible:ring-0 text-slate-900 rounded-full placeholder:text-slate-500 font-medium"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button 
                type="submit" 
                size="icon"
                className="absolute right-2 h-10 w-10 md:h-12 md:w-12 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white flex items-center justify-center transition-transform hover:scale-105"
              >
                <Search className="h-5 w-5" />
                <span className="sr-only">Search</span>
              </Button>
            </motion.form>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="mt-6"
            >
              <Link href="#how-it-works" className="text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors">
                Learn more about <span className="underline decoration-indigo-300 underline-offset-4">how ReviewIQ works</span> <ArrowRight className="inline-block h-3 w-3 ml-1" />
              </Link>
            </motion.div>
          </div>
        </section>
        
        {/* Animated Live Reviews Slider Section */}
        <section className="w-full py-16 bg-white dark:bg-slate-900 overflow-hidden relative border-t border-slate-100">
          <div className="container px-4 md:px-6 mx-auto mb-10">
            <div className="flex flex-col items-center text-center">
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-[#191919] dark:text-white">Recent Reviews</h2>
              <p className="mt-2 text-slate-500">Real people. Real experiences.</p>
            </div>
          </div>
          
          {/* Infinite Marquee Slider */}
          <div className="relative w-full flex overflow-hidden group">
            {/* Gradient Mask for fading edges */}
            <div className="absolute top-0 left-0 w-[10%] h-full bg-gradient-to-r from-white dark:from-slate-900 to-transparent z-10 pointer-events-none" />
            <div className="absolute top-0 right-0 w-[10%] h-full bg-gradient-to-l from-white dark:from-slate-900 to-transparent z-10 pointer-events-none" />
            
            <motion.div 
              className="flex gap-6 px-3"
              animate={{ x: [0, -1920] }} // Approximating width of one set of cards
              transition={{ 
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 25,
                  ease: "linear",
                }
              }}
            >
              {/* Duplicate the array twice to create a seamless infinite loop */}
              {[...Array(2)].map((_, arrayIndex) => (
                <div key={arrayIndex} className="flex gap-6">
                  {/* Review Card 1 */}
                  <div className="w-[350px] shrink-0 bg-[#FCFBF4] dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 transition-shadow hover:shadow-md">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold">A</div>
                      <div>
                        <p className="font-semibold text-sm text-slate-900 dark:text-white">Aditya D.</p>
                        <p className="text-xs text-slate-500">Reviewed <span className="font-medium text-indigo-600">Cafe Aroma, Pune</span></p>
                      </div>
                    </div>
                    <div className="flex gap-1 mb-3">
                      {[1, 2, 3, 4, 5].map(i => <Star key={i} className="h-4 w-4 fill-[#00B67A] text-[#00B67A]" />)}
                    </div>
                    <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
                      "Absolutely amazing cold coffee and the vibe is perfect for evening meetings. The service was a bit slow, but the taste makes up for it entirely!"
                    </p>
                    <p className="text-xs text-slate-400 mt-4">2 hours ago</p>
                  </div>

                  {/* Review Card 2 */}
                  <div className="w-[350px] shrink-0 bg-[#FCFBF4] dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 transition-shadow hover:shadow-md">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="h-10 w-10 rounded-full bg-rose-100 flex items-center justify-center text-rose-700 font-bold">S</div>
                      <div>
                        <p className="font-semibold text-sm text-slate-900 dark:text-white">Sneha K.</p>
                        <p className="text-xs text-slate-500">Reviewed <span className="font-medium text-indigo-600">Glow Studio, Mumbai</span></p>
                      </div>
                    </div>
                    <div className="flex gap-1 mb-3">
                      {[1, 2, 3, 4, 5].map(i => <Star key={i} className="h-4 w-4 fill-[#00B67A] text-[#00B67A]" />)}
                    </div>
                    <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
                      "Best hair spa in Bandra! The staff is super polite and they use genuine products. Highly recommend booking in advance as they are usually full."
                    </p>
                    <p className="text-xs text-slate-400 mt-4">5 hours ago</p>
                  </div>

                  {/* Review Card 3 */}
                  <div className="w-[350px] shrink-0 bg-[#FCFBF4] dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 transition-shadow hover:shadow-md">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold">R</div>
                      <div>
                        <p className="font-semibold text-sm text-slate-900 dark:text-white">Rahul M.</p>
                        <p className="text-xs text-slate-500">Reviewed <span className="font-medium text-indigo-600">TechNova Solutions</span></p>
                      </div>
                    </div>
                    <div className="flex gap-1 mb-3">
                      {[1, 2, 3, 4].map(i => <Star key={i} className="h-4 w-4 fill-[#00B67A] text-[#00B67A]" />)}
                      <Star className="h-4 w-4 text-[#00B67A]" />
                    </div>
                    <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
                      "They handled our IT infrastructure setup perfectly. Very professional team. Only giving 4 stars because the final delivery was delayed by a day."
                    </p>
                    <p className="text-xs text-slate-400 mt-4">1 day ago</p>
                  </div>

                  {/* Review Card 4 */}
                  <div className="w-[350px] shrink-0 bg-[#FCFBF4] dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 transition-shadow hover:shadow-md">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 font-bold">P</div>
                      <div>
                        <p className="font-semibold text-sm text-slate-900 dark:text-white">Pooja V.</p>
                        <p className="text-xs text-slate-500">Reviewed <span className="font-medium text-indigo-600">Dream Homes</span></p>
                      </div>
                    </div>
                    <div className="flex gap-1 mb-3">
                      {[1, 2, 3, 4, 5].map(i => <Star key={i} className="h-4 w-4 fill-[#00B67A] text-[#00B67A]" />)}
                    </div>
                    <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
                      "Helped us find our first apartment in Pune. Very transparent pricing and excellent paperwork assistance. Highly trusted!"
                    </p>
                    <p className="text-xs text-slate-400 mt-4">2 days ago</p>
                  </div>

                  {/* Review Card 5 */}
                  <div className="w-[350px] shrink-0 bg-[#FCFBF4] dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 transition-shadow hover:shadow-md">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-700 font-bold">V</div>
                      <div>
                        <p className="font-semibold text-sm text-slate-900 dark:text-white">Vikram S.</p>
                        <p className="text-xs text-slate-500">Reviewed <span className="font-medium text-indigo-600">Shree Motors</span></p>
                      </div>
                    </div>
                    <div className="flex gap-1 mb-3">
                      {[1, 2, 3, 4, 5].map(i => <Star key={i} className="h-4 w-4 fill-[#00B67A] text-[#00B67A]" />)}
                    </div>
                    <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
                      "Serviced my car here. Genuine parts used and the mechanic explained everything clearly. Car feels brand new again."
                    </p>
                    <p className="text-xs text-slate-400 mt-4">3 days ago</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>
        
        {/* Features Section */}
        <section id="how-it-works" className="w-full py-20 lg:py-32 bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-900">
          <div className="container px-4 md:px-6 mx-auto">
            <motion.div 
              initial={{ opacity: 0 }} 
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl text-slate-900 dark:text-white">How It Works</h2>
              <p className="mt-4 text-muted-foreground md:text-lg max-w-2xl mx-auto">Turn raw feedback into actionable intelligence in three simple steps.</p>
            </motion.div>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { title: "Search Businesses", desc: "Use our powerful database to find over 500+ real-world businesses across Maharashtra and beyond.", step: "1", href: "/search" },
                { title: "Analyze With AI", desc: "Our advanced AI identifies sentiment, generates health scores, and finds recurring themes instantly.", step: "2", href: "/search" },
                { title: "Explore Insights", desc: "Understand actual strengths and weaknesses without biased data. Only real customer evidence.", step: "3", href: "/dashboard/custom" }
              ].map((feature, i) => (
                <Link key={i} href={feature.href} className="block group">
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15, duration: 0.5 }}
                    whileHover={{ y: -5 }}
                    className="flex flex-col items-center text-center p-8 bg-slate-50 dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 transition-all group-hover:shadow-lg group-hover:border-indigo-200 dark:group-hover:border-indigo-800 h-full cursor-pointer"
                  >
                    <div className="h-12 w-12 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center mb-6 transition-transform group-hover:scale-110">
                      <span className="text-xl font-bold text-indigo-600 dark:text-indigo-400">{feature.step}</span>
                    </div>
                    <h3 className="text-xl font-bold tracking-tight mb-3 text-slate-900 dark:text-white">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.desc}</p>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </section>
        
        {/* About Section */}
        <section id="about" className="w-full py-20 lg:py-32 bg-slate-50 dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="max-w-4xl mx-auto space-y-8 text-center">
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl text-slate-900 dark:text-white">About ReviewIQ</h2>
              <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                ReviewIQ turns unstructured customer feedback into understandable insights using AI. 
                Our approach ensures that AI is grounded strictly in the provided data. We never invent statistics or fake quotes. Just pure, honest analysis.
              </p>
              <div className="grid sm:grid-cols-2 gap-6 text-left pt-8">
                <div className="bg-white dark:bg-slate-950 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
                  <h4 className="text-lg font-bold mb-3 text-slate-900 dark:text-white">Data Source</h4>
                  <p className="text-slate-500 dark:text-slate-400">Includes a realistic bundled dataset of public reviews, or you can paste your own raw feedback directly into the platform.</p>
                </div>
                <div className="bg-white dark:bg-slate-950 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
                  <h4 className="text-lg font-bold mb-3 text-slate-900 dark:text-white">AI Approach</h4>
                  <p className="text-slate-500 dark:text-slate-400">Utilizes the Google Gemini API with strict structured generation constraints to guarantee trustworthy, evidence-based outputs.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="bg-white dark:bg-slate-950 py-8 w-full shrink-0 text-center px-4 md:px-6 border-t border-slate-200 dark:border-slate-800">
        <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
          © 2026 ReviewIQ. Built for demonstration purposes.
        </p>
      </footer>
    </div>
  );
}

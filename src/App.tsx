import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShoppingBag, 
  Truck, 
  Heart, 
  Sparkles, 
  Menu, 
  X, 
  Instagram, 
  Mail, 
  ChevronRight,
  Droplets,
  Users
} from 'lucide-react';

// --- Mock Data ---
const PRODUCTS = [
  {
    id: 1,
    name: "Lavender Dream",
    price: 12.00,
    category: "Soap Bar",
    image: "https://picsum.photos/seed/lavender-soap/800/1000",
    color: "bg-purple-100"
  },
  {
    id: 2,
    name: "Citrus Burst Scrub",
    price: 18.00,
    category: "Body Scrub",
    image: "https://picsum.photos/seed/citrus-scrub/800/1000",
    color: "bg-orange-100"
  },
  {
    id: 3,
    name: "Ocean Breeze",
    price: 12.00,
    category: "Soap Bar",
    image: "https://picsum.photos/seed/ocean-soap/800/1000",
    color: "bg-blue-100"
  },
  {
    id: 4,
    name: "Rose Petal Glow",
    price: 14.00,
    category: "Soap Bar",
    image: "https://picsum.photos/seed/rose-soap/800/1000",
    color: "bg-pink-100"
  }
];

const B2B_FEATURES = [
  {
    icon: <Truck className="w-6 h-6" />,
    title: "Bulk Wholesale",
    description: "Competitive pricing for retailers and boutique shops."
  },
  {
    icon: <Sparkles className="w-6 h-6" />,
    title: "Custom Batches",
    description: "Bespoke scents and designs for your brand or event."
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Partner Support",
    description: "Dedicated account management for our B2B partners."
  }
];

// --- Components ---

interface BubbleProps {
  delay: number;
  x: number;
  size: number;
  duration: number;
}

const Bubble: React.FC<BubbleProps> = ({ delay, x, size, duration }) => (
  <motion.div
    initial={{ y: '110vh', opacity: 0, scale: 0.5 }}
    animate={{ 
      y: '-10vh', 
      opacity: [0, 1, 1, 0],
      scale: [0.5, 1, 1.2, 0.8],
      x: [x, x + 2, x - 2, x]
    }}
    transition={{ 
      duration, 
      delay, 
      repeat: Infinity,
      ease: "linear"
    }}
    className="absolute rounded-full border border-white/40 bg-white/10 backdrop-blur-[1px]"
    style={{ width: size, height: size, left: `${x}%` }}
  />
);

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const bubbles = useMemo(() => {
    return [...Array(15)].map((_, i) => ({
      id: i,
      delay: i * 0.8,
      x: Math.random() * 100,
      size: 20 + Math.random() * 60,
      duration: 10 + Math.random() * 5
    }));
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen selection:bg-soap-pink selection:text-soap-ink overflow-x-hidden">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-soap-cream/90 backdrop-blur-md py-4 shadow-sm' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-soap-pink rounded-full flex items-center justify-center group-hover:rotate-12 transition-transform">
              <Droplets className="text-soap-ink w-6 h-6" />
            </div>
            <span className="text-xl font-serif font-bold tracking-tight">Tatis Tremendous</span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#shop" className="text-sm font-medium hover:text-soap-pink transition-colors">Shop</a>
            <a href="#wholesale" className="text-sm font-medium hover:text-soap-pink transition-colors">Wholesale</a>
            <a href="#about" className="text-sm font-medium hover:text-soap-pink transition-colors">Our Story</a>
            <button className="bg-soap-ink text-soap-cream px-6 py-2 rounded-full text-sm font-medium hover:bg-soap-ink/90 transition-all flex items-center gap-2">
              <ShoppingBag className="w-4 h-4" />
              Shop Now
            </button>
          </div>

          {/* Mobile Toggle */}
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-soap-cream pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col gap-6 text-2xl font-serif font-bold">
              <a href="#shop" onClick={() => setIsMenuOpen(false)}>Shop</a>
              <a href="#wholesale" onClick={() => setIsMenuOpen(false)}>Wholesale</a>
              <a href="#about" onClick={() => setIsMenuOpen(false)}>Our Story</a>
              <button className="bg-soap-ink text-soap-cream px-8 py-4 rounded-full text-lg mt-4">
                Shop Now
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Background Image with Enhanced Overlay */}
        <motion.div 
          initial={{ scale: 1.15 }}
          animate={{ scale: 1 }}
          transition={{ duration: 15, ease: "easeOut" }}
          className="absolute inset-0 z-0"
        >
          <img 
            src="https://picsum.photos/seed/soap-artisan/1920/1080" 
            alt="Handmade Soap Background"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          {/* Layered Overlays for Depth */}
          <div className="absolute inset-0 bg-soap-cream/40 backdrop-blur-[4px]" />
          <div className="absolute inset-0 bg-gradient-to-b from-soap-cream/20 via-transparent to-soap-cream/60" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(253,252,248,0.8)_70%)]" />
        </motion.div>

        {/* Animated Bubbles Background */}
        <div className="absolute inset-0 pointer-events-none z-10">
          {bubbles.map((bubble) => (
            <Bubble 
              key={bubble.id} 
              delay={bubble.delay} 
              x={bubble.x} 
              size={bubble.size} 
              duration={bubble.duration} 
            />
          ))}
        </div>

        <div className="container mx-auto px-6 relative z-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <span className="inline-block px-4 py-1 bg-soap-sage/90 backdrop-blur-sm rounded-full text-xs font-bold uppercase tracking-widest mb-6 shadow-sm">
              Handmade with Love
            </span>
            <h1 className="text-6xl md:text-9xl font-serif font-bold leading-[0.9] mb-8 tracking-tighter drop-shadow-sm">
              Tremendous <br /> 
              <span className="italic text-soap-pink drop-shadow-[0_2px_10px_rgba(255,183,197,0.3)]">Suds & Scrubs</span>
            </h1>
            <p className="max-w-xl mx-auto text-lg md:text-xl text-soap-ink/80 mb-10 font-medium">
              Elevate your daily ritual with our artisan-crafted soaps and body scrubs. 
              Pure ingredients, playful designs, and professional quality for your skin.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="w-full sm:w-auto bg-soap-ink text-soap-cream px-10 py-4 rounded-full text-lg font-bold hover:scale-105 transition-transform shadow-2xl shadow-soap-ink/20">
                Shop Collection
              </button>
              <button className="w-full sm:w-auto bg-white/50 backdrop-blur-md border border-soap-ink/10 px-10 py-4 rounded-full text-lg font-bold hover:bg-soap-ink hover:text-soap-cream transition-all shadow-lg">
                Wholesale Inquiry
              </button>
            </div>
          </motion.div>
        </div>

        {/* Floating Product Image */}
        <motion.div 
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-20 -right-20 w-64 h-64 bg-soap-pink rounded-full blur-3xl opacity-30"
        />
      </section>

      {/* Featured Products */}
      <section id="shop" className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">Our Best Sellers</h2>
              <p className="text-soap-ink/60">Discover the scents that started it all. Each bar is cured for 6 weeks to ensure the longest-lasting, creamiest lather.</p>
            </div>
            <a href="#" className="flex items-center gap-2 font-bold group">
              View All Products <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {PRODUCTS.map((product, idx) => (
              <motion.div 
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="group cursor-pointer"
              >
                <div className={`aspect-[4/5] rounded-3xl overflow-hidden mb-6 relative ${product.color}`}>
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover mix-blend-multiply group-hover:scale-110 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <button className="absolute bottom-4 right-4 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all">
                    <ShoppingBag className="w-5 h-5" />
                  </button>
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-xs font-bold text-soap-ink/40 uppercase tracking-wider">{product.category}</span>
                    <h3 className="text-xl font-bold mt-1">{product.name}</h3>
                  </div>
                  <span className="font-serif font-bold text-lg">${product.price.toFixed(2)}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* B2B / Wholesale Section */}
      <section id="wholesale" className="py-24 bg-soap-sage/30">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-soap-ink/60 mb-4 block">B2B Opportunities</span>
              <h2 className="text-4xl md:text-6xl font-serif font-bold mb-8 leading-tight">
                Partner with <br /> <span className="text-soap-ink/40 italic">Tatis Tremendous</span>
              </h2>
              <p className="text-lg text-soap-ink/70 mb-12">
                Looking to stock high-quality, handmade soaps in your shop? 
                We offer flexible wholesale options, custom branding, and 
                reliable shipping for businesses of all sizes.
              </p>
              
              <div className="space-y-8">
                {B2B_FEATURES.map((feature, idx) => (
                  <div key={idx} className="flex gap-6">
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shrink-0 shadow-sm">
                      {feature.icon}
                    </div>
                    <div>
                      <h4 className="text-xl font-bold mb-1">{feature.title}</h4>
                      <p className="text-soap-ink/60">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <button className="mt-12 bg-soap-ink text-soap-cream px-10 py-4 rounded-full text-lg font-bold hover:bg-soap-ink/90 transition-all">
                Become a Partner
              </button>
            </div>

            <div className="relative">
              <div className="aspect-square rounded-[40px] overflow-hidden shadow-2xl rotate-3">
                <img 
                  src="https://picsum.photos/seed/soap-workshop/1000/1000" 
                  alt="Soap Workshop"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-10 -left-10 bg-white p-8 rounded-3xl shadow-xl max-w-[240px] -rotate-3">
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex -space-x-2">
                    {[1,2,3].map(i => (
                      <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-soap-pink overflow-hidden">
                        <img src={`https://i.pravatar.cc/100?u=${i}`} alt="User" />
                      </div>
                    ))}
                  </div>
                  <span className="text-xs font-bold">50+ Retailers</span>
                </div>
                <p className="text-sm font-medium italic">"The best addition to our boutique this year. Our customers love the scents!"</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <Heart className="w-12 h-12 text-soap-pink mx-auto mb-8" />
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-8">The Tremendous Story</h2>
            <p className="text-xl leading-relaxed text-soap-ink/70 mb-12">
              What started as a kitchen experiment in search of the perfect body scrub 
              turned into a passion for creating the most tremendous suds imaginable. 
              Tatis Tremendous Soaps is built on the belief that everyday essentials 
              should be extraordinary. We use only natural oils, ethically sourced 
              botanicals, and a whole lot of personality in every batch.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <div className="text-3xl font-serif font-bold mb-1">100%</div>
                <div className="text-xs font-bold uppercase tracking-widest text-soap-ink/40">Natural</div>
              </div>
              <div>
                <div className="text-3xl font-serif font-bold mb-1">0%</div>
                <div className="text-xs font-bold uppercase tracking-widest text-soap-ink/40">Parabens</div>
              </div>
              <div>
                <div className="text-3xl font-serif font-bold mb-1">Hand</div>
                <div className="text-xs font-bold uppercase tracking-widest text-soap-ink/40">Poured</div>
              </div>
              <div>
                <div className="text-3xl font-serif font-bold mb-1">Small</div>
                <div className="text-xs font-bold uppercase tracking-widest text-soap-ink/40">Batches</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-24 bg-soap-ink text-soap-cream relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <img 
            src="https://picsum.photos/seed/soap-texture/1920/1080" 
            alt="Soap Texture"
            className="w-full h-full object-cover grayscale"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-soap-pink/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 z-10" />
        <div className="container mx-auto px-6 relative z-20">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-6xl font-serif font-bold mb-8">Join the Suds Club</h2>
            <p className="text-lg text-soap-cream/60 mb-12">Get 10% off your first order and stay updated on new seasonal drops.</p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="your@email.com" 
                className="flex-1 bg-white/10 border border-white/20 rounded-full px-6 py-4 focus:outline-none focus:border-soap-pink transition-colors"
              />
              <button className="bg-soap-pink text-soap-ink px-8 py-4 rounded-full font-bold hover:scale-105 transition-transform">
                Sign Up
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 bg-soap-cream border-t border-soap-ink/5">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-soap-pink rounded-full flex items-center justify-center">
                  <Droplets className="text-soap-ink w-4 h-4" />
                </div>
                <span className="text-xl font-serif font-bold tracking-tight">Tatis Tremendous</span>
              </div>
              <p className="text-soap-ink/60 max-w-sm mb-8">
                Artisan soaps and body scrubs designed to make your skin feel tremendous. 
                Handmade with integrity and a touch of playfulness.
              </p>
              <div className="flex gap-4">
                <a href="https://www.instagram.com/tatis.tremendous.soaps/" target="_blank" className="w-10 h-10 rounded-full bg-soap-ink/5 flex items-center justify-center hover:bg-soap-pink transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="mailto:tatis.tremendous.soaps@gmail.com" className="w-10 h-10 rounded-full bg-soap-ink/5 flex items-center justify-center hover:bg-soap-pink transition-colors">
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>
            
            <div>
              <h5 className="font-bold mb-6">Shop</h5>
              <ul className="space-y-4 text-soap-ink/60 text-sm">
                <li><a href="#" className="hover:text-soap-ink transition-colors">All Soaps</a></li>
                <li><a href="#" className="hover:text-soap-ink transition-colors">Body Scrubs</a></li>
                <li><a href="#" className="hover:text-soap-ink transition-colors">Gift Sets</a></li>
                <li><a href="#" className="hover:text-soap-ink transition-colors">Wholesale</a></li>
              </ul>
            </div>

            <div>
              <h5 className="font-bold mb-6">Support</h5>
              <ul className="space-y-4 text-soap-ink/60 text-sm">
                <li><a href="#" className="hover:text-soap-ink transition-colors">Shipping Info</a></li>
                <li><a href="#" className="hover:text-soap-ink transition-colors">Returns</a></li>
                <li><a href="#" className="hover:text-soap-ink transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-soap-ink transition-colors">FAQ</a></li>
              </ul>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-soap-ink/5 text-xs font-bold uppercase tracking-widest text-soap-ink/40 gap-4">
            <p>© 2026 Tatis Tremendous Soaps. All Rights Reserved.</p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-soap-ink transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-soap-ink transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

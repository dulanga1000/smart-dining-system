import { useState, useEffect } from 'react';
import { Clock, MapPin, Phone, Star, Coffee, Sun, Moon } from 'lucide-react';
import { Link } from 'react-router';
import { motion } from 'motion/react';
import LuxuryNav from './LuxuryNav';
import LuxuryFooter from './LuxuryFooter';
import Elegant_Dining_Area from '../../assets/Elegant Dining Area.jpg';

import { projectId, publicAnonKey } from '../../../utils/supabase/info';

export default function LuxuryRestaurantPage() {
  const [restaurantStatus, setRestaurantStatus] = useState<any>(null);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-ce9c7d1f/status`,
          { headers: { 'Authorization': `Bearer ${publicAnonKey}` } }
        );
        const data = await response.json();
        setRestaurantStatus(data);
      } catch (error) {
        console.error('Failed to fetch status:', error);
      }
    };
    fetchStatus();
    const interval = setInterval(fetchStatus, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-luxury-ivory">
      <LuxuryNav />

      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden mt-20">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1920&q=80"
            alt="Restaurant"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-black/30"></div>
        </div>
        <div className="relative z-10 container mx-auto px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <p className="text-luxury-gold text-sm tracking-[0.3em] uppercase mb-4">Our Story</p>
            <h1 className="font-serif text-6xl md:text-7xl text-white mb-6">Sueen Nature Resort</h1>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-white/90">
              <div className="flex items-center gap-2">
                <Star className="w-6 h-6 text-luxury-gold fill-luxury-gold" />
                <span className="font-light">4.9/5 Rating</span>
              </div>
              <span className="text-luxury-gold">•</span>
              <span className="font-light">Status: {restaurantStatus?.status || 'Loading...'}</span>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-32 bg-white">
        <div className="container mx-auto px-8">
          <div className="grid md:grid-cols-2 gap-24 items-center max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <p className="text-luxury-gold text-sm tracking-[0.3em] uppercase mb-4">About Us</p>
              <h2 className="font-serif text-5xl text-luxury-charcoal mb-6 leading-tight">
                A Destination for<br />Fine Dining
              </h2>
              <div className="space-y-6 text-luxury-charcoal leading-relaxed">
                <p className="text-lg font-light">
                  Experience world-class buffet dining at Sueen Nature Resort. Our extensive buffet features authentic Sri Lankan cuisine, international favorites, and live cooking stations.
                </p>
                <p className="font-light">
                  With our innovative virtual queue system, you can enjoy premium dining without the hassle of physical waiting lines. Book in advance or join the queue remotely and receive real-time updates.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="relative h-[500px]"
            >
              <img
                src={Elegant_Dining_Area}
                alt="Elegant Dining Area"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-32 bg-luxury-cream">
        <div className="container mx-auto px-8">
          <div className="text-center mb-20">
            <p className="text-luxury-gold text-sm tracking-[0.3em] uppercase mb-4">Hours</p>
            <h2 className="font-serif text-5xl text-luxury-charcoal">Operating Hours</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
            {[
              { icon: Coffee, title: 'Breakfast', time: '6:30 AM - 10:30 AM', desc: 'Traditional Sri Lankan & Continental' },
              { icon: Sun, title: 'Lunch', time: '12:30 PM - 3:00 PM', desc: 'Rice & Curry, Pasta, Salad Bar' },
              { icon: Moon, title: 'Dinner', time: '7:00 PM - 10:30 PM', desc: 'Live Kottu, Seafood, International' }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="bg-white p-8 text-center"
              >
                <div className="w-16 h-16 border border-luxury-gold/20 flex items-center justify-center mx-auto mb-6">
                  <item.icon className="w-8 h-8 text-luxury-gold" strokeWidth={1} />
                </div>
                <h3 className="font-serif text-2xl text-luxury-charcoal mb-3">{item.title}</h3>
                <p className="text-luxury-gold mb-2 font-light tracking-wide">{item.time}</p>
                <p className="text-luxury-charcoal/70 text-sm font-light">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 bg-white">
        <div className="container mx-auto px-8">
          <div className="text-center mb-20">
            <p className="text-luxury-gold text-sm tracking-[0.3em] uppercase mb-4">Offerings</p>
            <h2 className="font-serif text-5xl text-luxury-charcoal">Buffet Categories</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              { name: 'Traditional Sri Lankan', items: 'Rice & Curry, Hoppers, Kottu' },
              { name: 'Live Cooking Stations', items: 'Eggs, Kottu, Pasta' },
              { name: 'International Cuisine', items: 'Pizza, Chinese, Western' },
              { name: 'Seafood', items: 'Fresh catch prepared daily' },
              { name: 'Salad & Healthy', items: 'Fresh greens, fruits' },
              { name: 'Dessert Bar', items: 'Cakes, ice cream, puddings' }
            ].map((category, index) => (
              <div key={index} className="p-6 border border-luxury-gold/20 bg-luxury-cream/50">
                <h3 className="font-serif text-xl text-luxury-charcoal mb-2">{category.name}</h3>
                <p className="text-sm text-luxury-charcoal/70 font-light">{category.items}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 bg-luxury-charcoal text-white">
        <div className="container mx-auto px-8">
          <div className="max-w-4xl mx-auto text-center mb-20">
            <p className="text-luxury-gold text-sm tracking-[0.3em] uppercase mb-4">Visit Us</p>
            <h2 className="font-serif text-5xl mb-8">Contact Information</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto mb-16">
            {[
              { icon: Phone, title: '+94 77 123 4567', label: 'Reservations' },
              { icon: MapPin, title: 'Baduraliya', label: 'Sri Lanka' },
              { icon: Clock, title: '6:30 AM - 10:30 PM', label: 'Daily' }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <item.icon className="w-8 h-8 mx-auto mb-4 text-luxury-gold" strokeWidth={1} />
                <p className="text-sm tracking-wide text-luxury-gold mb-2 uppercase">{item.label}</p>
                <p className="text-white font-light">{item.title}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link
              to="/booking"
              className="inline-flex items-center gap-3 px-12 py-5 bg-luxury-gold text-luxury-charcoal hover:bg-luxury-gold-light transition-all duration-500"
            >
              <span className="tracking-wide">Make a Reservation</span>
            </Link>
          </div>
        </div>
      </section>

      <LuxuryFooter />
    </div>
  );
}

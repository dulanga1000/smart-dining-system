import LuxuryNav from './LuxuryNav';
import LuxuryFooter from './LuxuryFooter';
import { useState, useEffect } from 'react';
import { Clock, MapPin, Phone, Star, UtensilsCrossed, Activity, Calendar } from 'lucide-react';
import { Link } from 'react-router';
import { projectId, publicAnonKey } from '/utils/supabase/info';
import Navigation from './Navigation';
import Footer from './Footer';

export default function RestaurantInfoPage() {
  const [restaurantStatus, setRestaurantStatus] = useState<any>(null);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-ce9c7d1f/status`,
          {
            headers: {
              'Authorization': `Bearer ${publicAnonKey}`
            }
          }
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
    <>
      <LuxuryNav />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="relative h-[60vh] min-h-[500px] overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1920"
              alt="Restaurant"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
          </div>
          <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-end pb-16">
            <h1 className="text-6xl md:text-7xl font-bold text-white mb-6">Queen Nature Resort</h1>
            <div className="flex items-center gap-6 text-white/90 text-lg">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                <Star className="w-6 h-6 text-gold fill-gold" />
                <span className="font-semibold">4.9/5 Rating</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                <Activity className="w-6 h-6" />
                <span className="font-semibold">
                  Status: {restaurantStatus?.status || 'Loading...'}
                </span>
              </div>
            </div>
          </div>
        </div>

      {/* Image Gallery Preview */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-4">
          <div className="h-48 rounded-xl shadow-xl overflow-hidden group relative">
            <img src="https://images.unsplash.com/photo-1660120447916-123439b05c40?w=600" alt="Buffet" className="w-full h-full object-cover transition-transform group-hover:scale-110" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Link to="/gallery" className="px-4 py-2 bg-white text-green rounded-lg font-semibold">View Gallery</Link>
            </div>
          </div>
          <div className="h-48 rounded-xl shadow-xl overflow-hidden group relative">
            <img src="https://images.unsplash.com/photo-1768697358705-c1b60333da35?w=600" alt="Restaurant" className="w-full h-full object-cover transition-transform group-hover:scale-110" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Link to="/gallery" className="px-4 py-2 bg-white text-green rounded-lg font-semibold">View Gallery</Link>
            </div>
          </div>
          <div className="h-48 rounded-xl shadow-xl overflow-hidden group relative">
            <img src="https://images.unsplash.com/photo-1743525700011-afac212694d7?w=600" alt="Food" className="w-full h-full object-cover transition-transform group-hover:scale-110" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Link to="/gallery" className="px-4 py-2 bg-white text-green rounded-lg font-semibold">View Gallery</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Info */}
          <div className="lg:col-span-2 space-y-8">
            {/* About */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-3xl font-bold text-green mb-4">About Our Buffet</h2>
              <div className="w-24 h-1 bg-gold mb-6"></div>
              <p className="text-gray-600 leading-relaxed mb-4">
                Experience world-class buffet dining at Queen Nature Resort. Our extensive buffet features authentic Sri Lankan cuisine, international favorites, and live cooking stations.
              </p>
              <p className="text-gray-600 leading-relaxed">
                With our innovative virtual queue system, you can enjoy premium dining without the hassle of physical waiting lines. Book in advance or join the queue remotely and receive real-time updates.
              </p>
            </div>

            {/* Operating Hours */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-green mb-6 flex items-center gap-2">
                <Clock className="w-6 h-6" />
                Operating Hours
              </h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">🌅</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-green mb-1">Breakfast Buffet</h3>
                    <p className="text-gray-600">6:30 AM - 10:30 AM</p>
                    <p className="text-sm text-gray-500 mt-1">Traditional Sri Lankan & Continental</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">☀️</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-green mb-1">Lunch Buffet</h3>
                    <p className="text-gray-600">12:30 PM - 3:00 PM</p>
                    <p className="text-sm text-gray-500 mt-1">Rice & Curry, Pasta, Salad Bar</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">🌙</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-green mb-1">Dinner Buffet</h3>
                    <p className="text-gray-600">7:00 PM - 10:30 PM</p>
                    <p className="text-sm text-gray-500 mt-1">Live Kottu, Seafood, International</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Buffet Categories */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-green mb-6 flex items-center gap-2">
                <UtensilsCrossed className="w-6 h-6" />
                Buffet Categories
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { name: 'Traditional Sri Lankan', items: 'Rice & Curry, Hoppers, Kottu' },
                  { name: 'Live Cooking Stations', items: 'Eggs, Kottu, Pasta' },
                  { name: 'International Cuisine', items: 'Pizza, Chinese, Western' },
                  { name: 'Seafood', items: 'Fresh catch prepared daily' },
                  { name: 'Salad & Healthy', items: 'Fresh greens, fruits' },
                  { name: 'Dessert Bar', items: 'Cakes, ice cream, puddings' }
                ].map((category, index) => (
                  <div key={index} className="p-4 bg-gradient-to-br from-gold/5 to-green/5 rounded-lg border border-gold/20">
                    <h3 className="font-bold text-green mb-1">{category.name}</h3>
                    <p className="text-sm text-gray-600">{category.items}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-green mb-6 flex items-center gap-2">
                <Star className="w-6 h-6 text-gold fill-gold" />
                Guest Reviews
              </h2>
              <div className="flex items-center gap-3 mb-6">
                <div className="text-5xl font-bold text-green">4.9</div>
                <div>
                  <div className="flex mb-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-5 h-5 text-gold fill-gold" />
                    ))}
                  </div>
                  <p className="text-gray-600">Based on 234 reviews</p>
                </div>
              </div>
              <div className="space-y-4">
                {[
                  { name: 'Sarah M.', rating: 5, text: 'The virtual queue system is genius! No more standing in line. Food quality is exceptional.' },
                  { name: 'John D.', rating: 5, text: 'Best buffet in Sri Lanka. The live kottu station is amazing. Highly recommend!' },
                  { name: 'Priya K.', rating: 5, text: 'Booking was seamless and the variety of food is incredible. Great for families.' }
                ].map((review, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-semibold text-green">{review.name}</p>
                      <div className="flex">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-gold fill-gold" />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm italic">"{review.text}"</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Contact & CTA */}
          <div className="lg:col-span-1 space-y-6">
            {/* Live Status */}
            <div className="bg-gradient-to-br from-gold to-gold/80 text-white rounded-2xl shadow-lg p-6 sticky top-4">
              <div className="flex items-center gap-2 mb-4">
                <Activity className="w-5 h-5 animate-pulse" />
                <h3 className="font-bold">Current Status</h3>
              </div>
              <div className="text-center py-6">
                <p className="text-5xl font-bold mb-2">{restaurantStatus?.status || '...'}</p>
                <p className="text-sm opacity-90">
                  {restaurantStatus?.waitingCount || 0} people in queue
                </p>
              </div>
              <div className="space-y-3 mt-6">
                <Link to="/booking" className="block w-full px-6 py-3 bg-white text-gold rounded-lg font-semibold text-center hover:bg-gray-50 transition-all">
                  Book Table
                </Link>
                <Link to="/queue" className="block w-full px-6 py-3 bg-green text-white rounded-lg font-semibold text-center hover:bg-green/90 transition-all">
                  Join Queue
                </Link>
                <Link to="/menu" className="block w-full px-6 py-3 border-2 border-white text-white rounded-lg font-semibold text-center hover:bg-white/10 transition-all">
                  View Menu
                </Link>
              </div>
            </div>

            {/* Contact Info */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="font-bold text-green mb-4">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-gold mt-1" />
                  <div>
                    <p className="font-semibold text-green">Address</p>
                    <p className="text-sm text-gray-600">Queen Nature Resort<br />Kandy Road, Sri Lanka</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-gold mt-1" />
                  <div>
                    <p className="font-semibold text-green">Phone</p>
                    <p className="text-sm text-gray-600">+94 77 123 4567</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-gold mt-1" />
                  <div>
                    <p className="font-semibold text-green">Open Daily</p>
                    <p className="text-sm text-gray-600">6:30 AM - 10:30 PM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="h-48 bg-gradient-to-br from-green/20 to-gold/20 flex items-center justify-center">
                <MapPin className="w-12 h-12 text-green" />
              </div>
              <div className="p-4">
                <p className="text-sm text-gray-600 text-center">
                  Queen Nature Resort, Kandy
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <LuxuryFooter />
    </>
  );
}

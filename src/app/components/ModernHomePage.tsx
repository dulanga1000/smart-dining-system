import { useState, useEffect } from 'react';
import { Clock, MapPin, Phone, Star, UtensilsCrossed, Camera, MessageSquare, BarChart3, Gift, CheckCircle, TrendingUp, Users, Sparkles, ArrowRight, Play } from 'lucide-react';
import { Link } from 'react-router';
import { projectId, publicAnonKey } from '/utils/supabase/info';
import Navigation from './Navigation';
import Footer from './Footer';

export default function ModernHomePage() {
  const [restaurantStatus, setRestaurantStatus] = useState<any>(null);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-ce9c7d1f/status`,
          {
            headers: { 'Authorization': `Bearer ${publicAnonKey}` }
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
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="relative h-[90vh] min-h-[600px] overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1660120447916-123439b05c40?w=1920"
            alt="Luxury Buffet"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gold/20 backdrop-blur-sm border border-gold/30 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-gold" />
              <span className="text-white text-sm font-semibold">Luxury Buffet Experience</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Dine Without<br />
              <span className="text-gold">The Wait</span>
            </h1>

            <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
              Experience world-class buffet dining with our revolutionary virtual queue system. No more standing in lines.
            </p>

            <div className="flex flex-wrap gap-4 mb-8">
              <Link
                to="/booking"
                className="group px-8 py-4 bg-gold hover:bg-gold/90 text-white rounded-lg font-semibold transition-all shadow-xl hover:shadow-2xl flex items-center gap-2"
              >
                Reserve Table
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/queue"
                className="px-8 py-4 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white border-2 border-white/30 rounded-lg font-semibold transition-all flex items-center gap-2"
              >
                <Users className="w-5 h-5" />
                Join Virtual Queue
              </Link>
            </div>

            {/* Stats Bar */}
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-gold fill-gold" />
                <div>
                  <p className="text-white font-bold">4.9/5</p>
                  <p className="text-white/60 text-sm">Rating</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-gold" />
                <div>
                  <p className="text-white font-bold">{restaurantStatus?.waitingCount || 0} Waiting</p>
                  <p className="text-white/60 text-sm">In Queue</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-gold" />
                <div>
                  <p className="text-white font-bold">{restaurantStatus?.status || 'Available'}</p>
                  <p className="text-white/60 text-sm">Current Status</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-8 h-12 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
            <div className="w-1.5 h-3 bg-white/60 rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-green mb-4">
              Why Choose Queen Nature?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Revolutionary dining experience with premium quality and exceptional service
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Users className="w-8 h-8" />,
                title: 'No Physical Queues',
                description: 'Join our virtual queue from anywhere. Get notified when your table is ready.',
                color: 'from-blue-500 to-cyan-500'
              },
              {
                icon: <Clock className="w-8 h-8" />,
                title: 'Real-Time Updates',
                description: 'Track your position live with automatic 3-second refresh updates.',
                color: 'from-purple-500 to-pink-500'
              },
              {
                icon: <UtensilsCrossed className="w-8 h-8" />,
                title: 'Premium Buffet',
                description: 'Unlimited selection of international and local Sri Lankan cuisine.',
                color: 'from-green-500 to-emerald-500'
              },
              {
                icon: <Star className="w-8 h-8" />,
                title: 'Table Reservations',
                description: 'Book your preferred time slot with instant confirmation and QR code.',
                color: 'from-gold to-yellow-500'
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-green mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Promotions Banner */}
      <section className="py-16 bg-gradient-to-r from-gold via-yellow-500 to-gold">
        <div className="container mx-auto px-4">
          <Link to="/promotions" className="block group">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-6 text-white">
                <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                  <Gift className="w-10 h-10" />
                </div>
                <div>
                  <h3 className="text-3xl font-bold mb-2">Limited Time Offers!</h3>
                  <p className="text-lg text-white/90">Save up to 20% on breakfast & special family bundles</p>
                </div>
              </div>
              <div className="px-8 py-4 bg-white text-gold rounded-xl font-bold text-lg group-hover:scale-105 transition-transform flex items-center gap-2">
                View All Deals
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Menu Highlights */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-green mb-4">
              Culinary Excellence
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From traditional Sri Lankan flavors to international cuisine
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Breakfast',
                time: '6:30 AM - 10:30 AM',
                image: 'https://images.unsplash.com/photo-1742281095650-dd3c50c08772?w=800',
                items: ['String Hoppers', 'Live Egg Station', 'Tropical Fruits'],
                color: 'from-orange-500/90 to-red-500/90'
              },
              {
                title: 'Lunch',
                time: '12:30 PM - 3:00 PM',
                image: 'https://images.unsplash.com/photo-1743525700011-afac212694d7?w=800',
                items: ['Rice & Curry', 'Pasta Station', 'Desserts'],
                color: 'from-green-500/90 to-emerald-500/90'
              },
              {
                title: 'Dinner',
                time: '7:00 PM - 10:30 PM',
                image: 'https://images.unsplash.com/photo-1769638913569-40fc740b44f5?w=800',
                items: ['Live Kottu', 'Seafood', 'International'],
                color: 'from-purple-500/90 to-pink-500/90'
              }
            ].map((meal, index) => (
              <div
                key={index}
                className="group relative h-[500px] rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500"
              >
                <img
                  src={meal.image}
                  alt={meal.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${meal.color} opacity-80 group-hover:opacity-90 transition-opacity`}></div>
                <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
                  <div className="mb-4">
                    <h3 className="text-3xl font-bold mb-2">{meal.title}</h3>
                    <div className="flex items-center gap-2 text-white/90 mb-4">
                      <Clock className="w-4 h-4" />
                      <span>{meal.time}</span>
                    </div>
                  </div>
                  <ul className="space-y-2 mb-6">
                    {meal.items.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    to="/menu"
                    className="inline-flex items-center gap-2 text-white font-semibold group-hover:gap-3 transition-all"
                  >
                    View Full Menu
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/menu"
              className="inline-flex items-center gap-2 px-8 py-4 bg-green hover:bg-green/90 text-white rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl"
            >
              Explore Complete Menu
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Gallery Preview */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-green mb-4">
                Gallery
              </h2>
              <p className="text-xl text-gray-600">
                A glimpse into our premium dining experience
              </p>
            </div>
            <Link
              to="/gallery"
              className="hidden md:inline-flex items-center gap-2 px-6 py-3 bg-gold hover:bg-gold/90 text-white rounded-lg font-semibold transition-all"
            >
              <Camera className="w-5 h-5" />
              View All Photos
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              'https://images.unsplash.com/photo-1660120447916-123439b05c40?w=600',
              'https://images.unsplash.com/photo-1768697358705-c1b60333da35?w=600',
              'https://images.unsplash.com/photo-1743525700011-afac212694d7?w=600',
              'https://images.unsplash.com/photo-1769638913569-40fc740b44f5?w=600'
            ].map((img, index) => (
              <div
                key={index}
                className="relative aspect-square overflow-hidden rounded-2xl group cursor-pointer"
              >
                <img
                  src={img}
                  alt={`Gallery ${index + 1}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Camera className="w-8 h-8 text-white" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-green mb-4">
              What Guests Say
            </h2>
            <div className="flex items-center justify-center gap-2 text-gold mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="w-6 h-6 fill-gold" />
              ))}
            </div>
            <p className="text-xl text-gray-600">4.9/5 from 234+ reviews</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Sarah Mitchell',
                role: 'Food Enthusiast',
                text: 'The virtual queue system is brilliant! No more waiting in line. Food quality is exceptional and the variety is amazing.',
                rating: 5
              },
              {
                name: 'John Davidson',
                role: 'Travel Blogger',
                text: 'Best buffet experience in Sri Lanka. The live kottu station is a must-try. Booking system made everything so convenient.',
                rating: 5
              },
              {
                name: 'Priya Kumar',
                role: 'Family Traveler',
                text: 'Perfect for families! Kids loved the dessert bar. The QR code system for bookings is very professional and modern.',
                rating: 5
              }
            ].map((review, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-gold fill-gold" />
                  ))}
                </div>
                <p className="text-gray-700 leading-relaxed mb-6 italic">"{review.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-gold to-yellow-600 rounded-full flex items-center justify-center text-white font-bold">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-green">{review.name}</p>
                    <p className="text-sm text-gray-500">{review.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/reviews"
              className="inline-flex items-center gap-2 px-8 py-4 bg-green hover:bg-green/90 text-white rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl"
            >
              <MessageSquare className="w-5 h-5" />
              Read All Reviews
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-green to-green/90 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gold rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold rounded-full blur-3xl"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Experience Hassle-Free Dining?
            </h2>
            <p className="text-xl text-white/90 mb-10">
              Book your table or join our virtual queue now. No more waiting in lines!
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                to="/booking"
                className="px-10 py-5 bg-gold hover:bg-gold/90 text-white rounded-xl font-bold text-lg transition-all shadow-2xl hover:shadow-gold/50 flex items-center gap-2"
              >
                Book a Table
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/queue"
                className="px-10 py-5 bg-white hover:bg-gray-50 text-green rounded-xl font-bold text-lg transition-all shadow-2xl flex items-center gap-2"
              >
                <Users className="w-5 h-5" />
                Join Queue Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

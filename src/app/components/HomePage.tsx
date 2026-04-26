import { Clock, MapPin, Phone, Star, UtensilsCrossed, Camera, MessageSquare, BarChart3, Gift } from 'lucide-react';
import { Link } from 'react-router';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <div className="relative h-[60vh] min-h-[400px] bg-gradient-to-r from-green to-green/90 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200')] bg-cover bg-center opacity-20"></div>
        <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
          <div className="inline-block px-6 py-2 bg-gold rounded-full mb-4">
            <span className="text-sm font-semibold tracking-wide">LUXURY DINING EXPERIENCE</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Sueen Nature Resort</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl">Experience World-Class Buffet Without the Wait</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/menu" className="px-8 py-4 bg-gold hover:bg-gold/90 text-white rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl">
              Explore Menu
            </Link>
            <Link to="/booking" className="px-8 py-4 bg-white hover:bg-gray-50 text-green rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl">
              Reserve Table
            </Link>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="container mx-auto px-4 -mt-16 relative z-20">
        <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-6">
          <Link to="/menu" className="bg-white rounded-xl shadow-xl p-6 hover:shadow-2xl transition-all transform hover:-translate-y-1">
            <div className="w-12 h-12 bg-gold/10 rounded-lg flex items-center justify-center mb-4">
              <UtensilsCrossed className="w-6 h-6 text-gold" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-green">View Menu</h3>
            <p className="text-gray-600">Browse our extensive buffet selection</p>
          </Link>

          <Link to="/booking" className="bg-white rounded-xl shadow-xl p-6 hover:shadow-2xl transition-all transform hover:-translate-y-1">
            <div className="w-12 h-12 bg-gold/10 rounded-lg flex items-center justify-center mb-4">
              <Clock className="w-6 h-6 text-gold" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-green">Book Table</h3>
            <p className="text-gray-600">Reserve your spot in advance</p>
          </Link>

          <Link to="/queue" className="bg-white rounded-xl shadow-xl p-6 hover:shadow-2xl transition-all transform hover:-translate-y-1">
            <div className="w-12 h-12 bg-gold/10 rounded-lg flex items-center justify-center mb-4">
              <Star className="w-6 h-6 text-gold" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-green">Join Queue</h3>
            <p className="text-gray-600">Skip the physical waiting line</p>
          </Link>

          <Link to="/gallery" className="bg-white rounded-xl shadow-xl p-6 hover:shadow-2xl transition-all transform hover:-translate-y-1">
            <div className="w-12 h-12 bg-gold/10 rounded-lg flex items-center justify-center mb-4">
              <Camera className="w-6 h-6 text-gold" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-green">Gallery</h3>
            <p className="text-gray-600">View our beautiful dining spaces</p>
          </Link>

          <Link to="/reviews" className="bg-white rounded-xl shadow-xl p-6 hover:shadow-2xl transition-all transform hover:-translate-y-1">
            <div className="w-12 h-12 bg-gold/10 rounded-lg flex items-center justify-center mb-4">
              <MessageSquare className="w-6 h-6 text-gold" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-green">Reviews</h3>
            <p className="text-gray-600">Read guest experiences</p>
          </Link>

          <Link to="/admin" className="bg-white rounded-xl shadow-xl p-6 hover:shadow-2xl transition-all transform hover:-translate-y-1">
            <div className="w-12 h-12 bg-gold/10 rounded-lg flex items-center justify-center mb-4">
              <BarChart3 className="w-6 h-6 text-gold" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-green">Admin</h3>
            <p className="text-gray-600">Management dashboard</p>
          </Link>
        </div>
      </div>

      {/* Promotions Banner */}
      <div className="container mx-auto px-4 py-8">
        <Link to="/promotions" className="block bg-gradient-to-r from-gold to-yellow-500 text-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all transform hover:scale-105">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <Gift className="w-12 h-12" />
              <div>
                <h3 className="text-2xl font-bold mb-1">Special Offers Available!</h3>
                <p className="text-white/90">Save up to 20% on select meals • Tap to view all promotions</p>
              </div>
            </div>
            <span className="px-6 py-3 bg-white text-gold rounded-lg font-bold">View Deals →</span>
          </div>
        </Link>
      </div>

      {/* Today's Specials */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-green mb-4">Today's Highlights</h2>
          <div className="w-24 h-1 bg-gold mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl overflow-hidden shadow-lg">
            <div className="h-48 bg-gradient-to-br from-orange-400 to-red-500"></div>
            <div className="p-6">
              <div className="inline-block px-3 py-1 bg-gold/10 text-gold rounded-full text-sm font-semibold mb-3">
                BREAKFAST
              </div>
              <h3 className="text-xl font-bold mb-2 text-green">Live Egg Station</h3>
              <p className="text-gray-600">Custom omelettes & traditional hoppers</p>
            </div>
          </div>

          <div className="bg-white rounded-xl overflow-hidden shadow-lg">
            <div className="h-48 bg-gradient-to-br from-green-400 to-emerald-600"></div>
            <div className="p-6">
              <div className="inline-block px-3 py-1 bg-gold/10 text-gold rounded-full text-sm font-semibold mb-3">
                LUNCH
              </div>
              <h3 className="text-xl font-bold mb-2 text-green">Rice & Curry Varieties</h3>
              <p className="text-gray-600">Authentic Sri Lankan flavors</p>
            </div>
          </div>

          <div className="bg-white rounded-xl overflow-hidden shadow-lg">
            <div className="h-48 bg-gradient-to-br from-purple-400 to-pink-500"></div>
            <div className="p-6">
              <div className="inline-block px-3 py-1 bg-gold/10 text-gold rounded-full text-sm font-semibold mb-3">
                DINNER
              </div>
              <h3 className="text-xl font-bold mb-2 text-green">Live Kottu Station</h3>
              <p className="text-gray-600">Fresh made to order</p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact & Location */}
      <div className="bg-green text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-3xl font-bold mb-6">Visit Us</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-gold mt-1" />
                  <div>
                    <p className="font-semibold">Location</p>
                    <p className="text-gray-300">Sueen Nature Resort, Kandy Road</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-gold mt-1" />
                  <div>
                    <p className="font-semibold">Opening Hours</p>
                    <p className="text-gray-300">Breakfast: 6:30 AM - 10:30 AM</p>
                    <p className="text-gray-300">Lunch: 12:30 PM - 3:00 PM</p>
                    <p className="text-gray-300">Dinner: 7:00 PM - 10:30 PM</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-gold mt-1" />
                  <div>
                    <p className="font-semibold">Contact</p>
                    <p className="text-gray-300">+94 77 123 4567</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-3xl font-bold mb-6">Reviews</h3>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-5 h-5 text-gold fill-gold" />
                  ))}
                </div>
                <span className="text-lg font-semibold">4.9/5</span>
                <span className="text-gray-300">(234 reviews)</span>
              </div>
              <div className="space-y-4">
                <div className="bg-white/10 rounded-lg p-4">
                  <p className="italic">"Amazing buffet experience! The queue system made everything so convenient."</p>
                  <p className="text-gold text-sm mt-2">- Sarah M.</p>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <p className="italic">"Best resort dining in Sri Lanka. No more waiting in line!"</p>
                  <p className="text-gold text-sm mt-2">- John D.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

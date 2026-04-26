import LuxuryNav from './LuxuryNav';
import LuxuryFooter from './LuxuryFooter';
import { useState, useEffect } from 'react';
import { Gift, Clock, Percent, Calendar, TrendingUp, Sparkles } from 'lucide-react';
import { Link } from 'react-router';
import Navigation from './Navigation';
import Footer from './Footer';

const promotions = [
  {
    id: 1,
    title: "Early Bird Special",
    description: "Get 20% off breakfast buffet when you arrive before 8:00 AM",
    discount: "20% OFF",
    validTime: "6:30 AM - 8:00 AM",
    category: "Breakfast",
    color: "from-orange-500 to-red-500",
    icon: "🌅"
  },
  {
    id: 2,
    title: "Family Bundle",
    description: "Book for 4+ people and get complimentary desserts for kids under 12",
    discount: "FREE",
    validTime: "All Day",
    category: "All Meals",
    color: "from-green-500 to-emerald-500",
    icon: "👨‍👩‍👧‍👦"
  },
  {
    id: 3,
    title: "Weekend Feast",
    description: "Saturday & Sunday dinner buffet includes live seafood station",
    discount: "PREMIUM",
    validTime: "Sat-Sun 7:00 PM - 10:30 PM",
    category: "Dinner",
    color: "from-purple-500 to-pink-500",
    icon: "🦞"
  },
  {
    id: 4,
    title: "Birthday Special",
    description: "Celebrate with us! Free dessert platter for birthday guests with ID",
    discount: "FREE",
    validTime: "All Day",
    category: "All Meals",
    color: "from-gold to-yellow-500",
    icon: "🎂"
  },
  {
    id: 5,
    title: "Senior Discount",
    description: "15% off for guests 60 years and above",
    discount: "15% OFF",
    validTime: "Mon-Fri Lunch",
    category: "Lunch",
    color: "from-blue-500 to-cyan-500",
    icon: "👴"
  },
  {
    id: 6,
    title: "Loyalty Rewards",
    description: "Visit 5 times and get your 6th meal at 50% off",
    discount: "50% OFF",
    validTime: "All Time",
    category: "All Meals",
    color: "from-indigo-500 to-purple-500",
    icon: "⭐"
  }
];

export default function PromotionsPage() {
  const [timeRemaining, setTimeRemaining] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const endOfDay = new Date();
      endOfDay.setHours(23, 59, 59, 999);

      const diff = endOfDay.getTime() - now.getTime();

      setTimeRemaining({
        hours: Math.floor(diff / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <LuxuryNav />

      {/* Header */}
      <div className="relative bg-gradient-to-r from-gold to-gold/80 text-white py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1607344645866-009c320b63e0?w=1920"
            alt="Special Offers"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gold/90 to-gold/70"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 flex items-center gap-4">
            <Gift className="w-12 h-12" />
            Special Offers & Promotions
          </h1>
          <p className="text-2xl text-white/90">Save more on your dining experience</p>
        </div>
      </div>

      {/* Countdown Timer */}
      <div className="bg-green text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Clock className="w-6 h-6 animate-pulse" />
            <h2 className="text-2xl font-bold">Today's Deals End In</h2>
          </div>
          <div className="flex justify-center gap-4">
            <div className="bg-white/20 rounded-xl p-4 min-w-[100px]">
              <div className="text-4xl font-bold">{timeRemaining.hours.toString().padStart(2, '0')}</div>
              <div className="text-sm opacity-80">Hours</div>
            </div>
            <div className="bg-white/20 rounded-xl p-4 min-w-[100px]">
              <div className="text-4xl font-bold">{timeRemaining.minutes.toString().padStart(2, '0')}</div>
              <div className="text-sm opacity-80">Minutes</div>
            </div>
            <div className="bg-white/20 rounded-xl p-4 min-w-[100px]">
              <div className="text-4xl font-bold">{timeRemaining.seconds.toString().padStart(2, '0')}</div>
              <div className="text-sm opacity-80">Seconds</div>
            </div>
          </div>
        </div>
      </div>

      {/* Promotions Grid */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {promotions.map((promo) => (
            <div
              key={promo.id}
              className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all transform hover:-translate-y-2"
            >
              <div className={`bg-gradient-to-r ${promo.color} text-white p-6 relative`}>
                <div className="absolute top-4 right-4 text-6xl opacity-20">{promo.icon}</div>
                <div className="relative z-10">
                  <div className="inline-block px-4 py-2 bg-white/20 rounded-full mb-3">
                    <span className="font-bold">{promo.category}</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{promo.title}</h3>
                  <div className="text-3xl font-bold mb-2">{promo.discount}</div>
                </div>
              </div>

              <div className="p-6">
                <p className="text-gray-700 mb-4">{promo.description}</p>

                <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                  <Clock className="w-4 h-4 text-gold" />
                  <span>Valid: {promo.validTime}</span>
                </div>

                <div className="pt-4 border-t">
                  <div className="grid grid-cols-2 gap-3">
                    <Link
                      to="/booking"
                      className="px-4 py-2 bg-green text-white rounded-lg font-semibold text-center hover:bg-green/90 transition-all text-sm"
                    >
                      Book Now
                    </Link>
                    <Link
                      to="/queue"
                      className="px-4 py-2 bg-gold text-white rounded-lg font-semibold text-center hover:bg-gold/90 transition-all text-sm"
                    >
                      Join Queue
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* How to Redeem */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-green mb-4 flex items-center justify-center gap-2">
              <Sparkles className="w-8 h-8 text-gold" />
              How to Redeem Your Offers
            </h2>
            <div className="w-24 h-1 bg-gold mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-gold" />
              </div>
              <h3 className="font-bold text-green mb-2">1. Book or Join Queue</h3>
              <p className="text-gray-600 text-sm">Make your reservation or join the virtual queue online</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Gift className="w-8 h-8 text-gold" />
              </div>
              <h3 className="font-bold text-green mb-2">2. Mention Promotion</h3>
              <p className="text-gray-600 text-sm">Tell our staff which promotion you want to use</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Percent className="w-8 h-8 text-gold" />
              </div>
              <h3 className="font-bold text-green mb-2">3. Get Verified</h3>
              <p className="text-gray-600 text-sm">Present any required ID or proof at the entrance</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-gold" />
              </div>
              <h3 className="font-bold text-green mb-2">4. Enjoy & Save</h3>
              <p className="text-gray-600 text-sm">Enjoy your meal with the discount applied</p>
            </div>
          </div>
        </div>
      </div>

      {/* Terms & Conditions */}
      <div className="bg-gray-100 py-12">
        <div className="container mx-auto px-4">
          <h3 className="text-2xl font-bold text-green mb-6 text-center">Terms & Conditions</h3>
          <div className="bg-white rounded-xl p-8 max-w-4xl mx-auto">
            <ul className="space-y-3 text-gray-700">
              <li className="flex gap-3">
                <span className="text-gold">•</span>
                <span>Promotions cannot be combined with other offers unless specified</span>
              </li>
              <li className="flex gap-3">
                <span className="text-gold">•</span>
                <span>Valid ID or proof may be required for age-specific or birthday promotions</span>
              </li>
              <li className="flex gap-3">
                <span className="text-gold">•</span>
                <span>Management reserves the right to modify or cancel promotions without prior notice</span>
              </li>
              <li className="flex gap-3">
                <span className="text-gold">•</span>
                <span>Discounts apply to buffet price only, beverages and special items excluded</span>
              </li>
              <li className="flex gap-3">
                <span className="text-gold">•</span>
                <span>Loyalty program requires registration at the reception desk</span>
              </li>
              <li className="flex gap-3">
                <span className="text-gold">•</span>
                <span>Time-specific offers must be claimed within the specified hours</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <LuxuryFooter />
    </div>
  );
}

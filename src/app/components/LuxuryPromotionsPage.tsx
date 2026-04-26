import { useState, useEffect } from 'react';
import { Gift, Clock, Calendar } from 'lucide-react';
import { Link } from 'react-router';
import { motion } from 'motion/react';
import LuxuryNav from './LuxuryNav';
import LuxuryFooter from './LuxuryFooter';

const promotions = [
  {
    id: 1,
    title: "Early Bird Special",
    description: "Get 20% off breakfast buffet when you arrive before 8:00 AM",
    discount: "20% OFF",
    validTime: "6:30 AM - 8:00 AM",
    category: "Breakfast"
  },
  {
    id: 2,
    title: "Family Bundle",
    description: "Book for 4+ people and get complimentary desserts for kids under 12",
    discount: "FREE",
    validTime: "All Day",
    category: "All Meals"
  },
  {
    id: 3,
    title: "Weekend Feast",
    description: "Saturday & Sunday dinner buffet includes live seafood station",
    discount: "PREMIUM",
    validTime: "Sat-Sun 7:00 PM - 10:30 PM",
    category: "Dinner"
  },
  {
    id: 4,
    title: "Birthday Special",
    description: "Celebrate with us! Free dessert platter for birthday guests with ID",
    discount: "FREE",
    validTime: "All Day",
    category: "All Meals"
  },
  {
    id: 5,
    title: "Senior Discount",
    description: "15% off for guests 60 years and above",
    discount: "15% OFF",
    validTime: "Mon-Fri Lunch",
    category: "Lunch"
  },
  {
    id: 6,
    title: "Loyalty Rewards",
    description: "Visit 5 times and get your 6th meal at 50% off",
    discount: "50% OFF",
    validTime: "All Time",
    category: "All Meals"
  }
];

export default function LuxuryPromotionsPage() {
  const [timeRemaining, setTimeRemaining] = useState({ hours: 0, minutes: 0, seconds: 0 });

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
    <div className="min-h-screen bg-luxury-ivory">
      <LuxuryNav />

      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden mt-20">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1607344645866-009c320b63e0?w=1920"
            alt="Special Offers"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        <div className="relative z-10 text-center px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <p className="text-luxury-gold text-sm tracking-[0.3em] uppercase mb-4">Special Offers</p>
            <h1 className="font-serif text-6xl md:text-7xl text-white mb-6">Exclusive Promotions</h1>
            <p className="text-white/80 text-lg max-w-2xl mx-auto font-light">
              Save more on your dining experience
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-luxury-charcoal text-white">
        <div className="container mx-auto px-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Clock className="w-6 h-6 text-luxury-gold" />
            <h2 className="font-serif text-2xl">Today's Deals End In</h2>
          </div>
          <div className="flex justify-center gap-6">
            {[
              { value: timeRemaining.hours, label: 'Hours' },
              { value: timeRemaining.minutes, label: 'Minutes' },
              { value: timeRemaining.seconds, label: 'Seconds' }
            ].map((item, idx) => (
              <div key={idx} className="bg-luxury-charcoal p-6 min-w-[120px] border border-luxury-gold/20">
                <div className="text-5xl font-serif text-luxury-gold mb-2">
                  {item.value.toString().padStart(2, '0')}
                </div>
                <div className="text-sm tracking-wide text-white/60 uppercase">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
            {promotions.map((promo, index) => (
              <motion.div
                key={promo.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="group"
              >
                <div className="bg-luxury-charcoal text-white p-8 mb-6 relative overflow-hidden">
                  <div className="absolute top-4 right-4">
                    <span className="px-4 py-2 bg-luxury-gold text-luxury-charcoal text-xs tracking-wider uppercase">
                      {promo.category}
                    </span>
                  </div>
                  <h3 className="font-serif text-3xl mb-4 mt-8">{promo.title}</h3>
                  <div className="text-4xl font-serif text-luxury-gold mb-2">{promo.discount}</div>
                </div>

                <div className="bg-luxury-cream p-8">
                  <p className="text-luxury-charcoal mb-6 font-light leading-relaxed">{promo.description}</p>
                  
                  <div className="flex items-center gap-2 text-sm text-luxury-charcoal/70 mb-6 font-light">
                    <Clock className="w-4 h-4 text-luxury-gold" />
                    <span>Valid: {promo.validTime}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <Link
                      to="/booking"
                      className="px-4 py-3 bg-luxury-gold text-luxury-charcoal text-center hover:bg-luxury-gold-light transition-all text-sm tracking-wide"
                    >
                      Book Now
                    </Link>
                    <Link
                      to="/queue"
                      className="px-4 py-3 border border-luxury-charcoal text-luxury-charcoal text-center hover:bg-luxury-charcoal hover:text-white transition-all text-sm tracking-wide"
                    >
                      Join Queue
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-luxury-cream">
        <div className="container mx-auto px-8">
          <div className="text-center mb-16">
            <p className="text-luxury-gold text-sm tracking-[0.3em] uppercase mb-4">How It Works</p>
            <h2 className="font-serif text-4xl text-luxury-charcoal">Redeem Your Offers</h2>
          </div>

          <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              { num: '1', title: 'Book or Join Queue', desc: 'Make your reservation or join the virtual queue online' },
              { num: '2', title: 'Mention Promotion', desc: 'Tell our staff which promotion you want to use' },
              { num: '3', title: 'Get Verified', desc: 'Present any required ID or proof at the entrance' },
              { num: '4', title: 'Enjoy & Save', desc: 'Enjoy your meal with the discount applied' }
            ].map((step, idx) => (
              <div key={idx} className="text-center">
                <div className="w-16 h-16 bg-luxury-gold text-luxury-charcoal flex items-center justify-center mx-auto mb-4 font-serif text-2xl">
                  {step.num}
                </div>
                <h3 className="font-serif text-xl text-luxury-charcoal mb-2">{step.title}</h3>
                <p className="text-luxury-charcoal/70 text-sm font-light">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-8">
          <div className="max-w-4xl mx-auto bg-luxury-cream p-12">
            <h3 className="font-serif text-2xl text-luxury-charcoal mb-6 text-center">Terms & Conditions</h3>
            <ul className="space-y-3 text-luxury-charcoal font-light">
              {[
                'Promotions cannot be combined with other offers unless specified',
                'Valid ID or proof may be required for age-specific or birthday promotions',
                'Management reserves the right to modify or cancel promotions without prior notice',
                'Discounts apply to buffet price only, beverages and special items excluded',
                'Loyalty program requires registration at the reception desk',
                'Time-specific offers must be claimed within the specified hours'
              ].map((term, idx) => (
                <li key={idx} className="flex gap-3">
                  <span className="text-luxury-gold">•</span>
                  <span>{term}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <LuxuryFooter />
    </div>
  );
}

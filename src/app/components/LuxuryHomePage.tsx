import { ArrowRight, Phone, MapPin, Clock } from 'lucide-react';
import { Link } from 'react-router';
import { motion } from 'motion/react';
import LuxuryNav from './LuxuryNav';
import LuxuryFooter from './LuxuryFooter';
import chickenKottuImage from '../../assets/Chicken_Kottu.jpg';

export default function LuxuryHomePage() {
  const googleMapsLocationUrl = 'https://google.com/maps?q=H735+X64+Sueen+Nature,+Baduraliya&ftid=0x3ae3cf3ce1cc4b5b:0xcf5359e7f62b0adc&entry=gps&shh=CAE&lucs=,94297699,94284463,94231188,94280568,47071704,94218641,94282134,94286869&g_ep=CAISEjI2LjE2LjAuODk4OTU0MjE1MBgAIIgnKkgsOTQyOTc2OTksOTQyODQ0NjMsOTQyMzExODgsOTQyODA1NjgsNDcwNzE3MDQsOTQyMTg2NDEsOTQyODIxMzQsOTQyODY4NjlCAkxL&skid=223f69b3-4779-47cf-b8d9-8d74d353c7fe&g_st=iw';

  return (
    <div className="min-h-screen bg-luxury-ivory">
      <LuxuryNav />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&q=90"
            alt="Fine Dining"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50"></div>
        </div>

        <div className="relative z-10 text-center px-8 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
          >
            <p className="text-luxury-gold text-sm tracking-[0.3em] uppercase mb-8 font-light">
              Experience Luxury
            </p>
            <h1 className="font-serif text-6xl md:text-8xl text-white mb-8 leading-[0.95] tracking-tight">
              Where Culinary<br />
              Art Meets<br />
              <span className="italic text-luxury-gold">Elegance</span>
            </h1>
            <p className="text-white/90 text-lg md:text-xl mb-12 max-w-2xl mx-auto font-light leading-relaxed">
              Indulge in an unforgettable dining experience at Sri Lanka's most distinguished resort
            </p>
            <div className="flex gap-6 justify-center flex-wrap">
              <Link
                to="/booking"
                className="group px-10 py-4 bg-luxury-gold text-luxury-charcoal hover:bg-luxury-gold-light transition-all duration-500 flex items-center gap-3"
              >
                <span className="text-sm tracking-wide">Reserve a Table</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
              <Link
                to="/menu"
                className="px-10 py-4 border border-luxury-gold text-luxury-gold hover:bg-luxury-gold hover:text-luxury-charcoal transition-all duration-500"
              >
                <span className="text-sm tracking-wide">View Menu</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-8">
          <div className="grid md:grid-cols-2 gap-24 items-center max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="relative h-[600px]"
            >
              <img
                src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=90"
                alt="Interior"
                className="w-full h-full object-cover"
              />
              <div className="absolute -bottom-12 -right-12 w-64 h-64 border border-luxury-gold/20"></div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="space-y-8"
            >
              <div>
                <p className="text-luxury-gold text-sm tracking-[0.3em] uppercase mb-4">Our Story</p>
                <h2 className="font-serif text-5xl text-luxury-charcoal mb-6 leading-tight">
                  A Legacy of<br />Excellence
                </h2>
              </div>
              <div className="space-y-6 text-luxury-charcoal leading-relaxed">
                <p className="text-lg font-light">
                  Nestled in the heart of Sri Lanka's most breathtaking landscapes, Sueen Nature Resort represents the pinnacle of luxury dining and hospitality.
                </p>
                <p className="font-light">
                  For over a decade, we have curated exceptional experiences that blend authentic Sri Lankan cuisine with international sophistication.
                </p>
              </div>
              <Link
                to="/restaurant"
                className="inline-flex items-center gap-2 text-luxury-charcoal border-b border-luxury-charcoal pb-1 hover:text-luxury-gold hover:border-luxury-gold transition-all duration-300"
              >
                <span className="text-sm tracking-wide">Discover Our Journey</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Signature Experience */}
      <section className="py-32 bg-luxury-cream">
        <div className="container mx-auto px-8">
          <div className="text-center mb-20 max-w-3xl mx-auto">
            <p className="text-luxury-gold text-sm tracking-[0.3em] uppercase mb-4">Signature Experience</p>
            <h2 className="font-serif text-5xl text-luxury-charcoal mb-6">
              Curated Excellence
            </h2>
            <p className="text-luxury-charcoal font-light text-lg">
              Each offering is meticulously crafted to deliver an extraordinary sensory journey
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-16 max-w-7xl mx-auto">
            {[
              {
                title: 'Live Kottu Theatre',
                description: 'Experience the rhythmic art of traditional Sri Lankan kottu preparation',
                image: chickenKottuImage,
                link: '/menu'
              },
              {
                title: 'Curated Buffet Selection',
                description: 'An exquisite array of international and local delicacies',
                image: 'https://images.unsplash.com/photo-1743525700011-afac212694d7?w=600&q=90',
                link: '/menu'
              },
              {
                title: 'Premium Seafood',
                description: 'Daily fresh catches prepared with coastal authenticity',
                image: 'https://images.unsplash.com/photo-1761314036779-84078bec535c?w=600&q=90',
                link: '/menu'
              }
            ].map((item, index) => (
              <Link
                key={index}
                to={item.link}
              >
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  className="group cursor-pointer"
                >
                  <div className="relative h-96 mb-6 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <h3 className="font-serif text-2xl text-luxury-charcoal mb-3 group-hover:text-luxury-gold transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-luxury-charcoal font-light leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-16">
            <Link
              to="/menu"
              className="inline-flex items-center gap-2 px-10 py-4 border border-luxury-charcoal text-luxury-charcoal hover:bg-luxury-charcoal hover:text-white transition-all duration-500"
            >
              <span className="text-sm tracking-wide">Explore Full Menu</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Virtual Queue Highlight */}
      <section className="py-32 bg-luxury-charcoal text-white">
        <div className="container mx-auto px-8">
          <div className="grid md:grid-cols-2 gap-20 items-center max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="space-y-8"
            >
              <div>
                <p className="text-luxury-gold text-sm tracking-[0.3em] uppercase mb-4">Innovation</p>
                <h2 className="font-serif text-5xl mb-6 leading-tight">
                  Dine Without<br />
                  The Wait
                </h2>
              </div>
              <p className="text-white/80 text-lg font-light leading-relaxed">
                Our revolutionary virtual queue system respects your time. Join remotely, track your position in real-time, and arrive when your table awaits.
              </p>
              <div className="flex gap-6 flex-wrap">
                <Link
                  to="/queue"
                  className="inline-flex items-center gap-2 px-8 py-3 bg-luxury-gold text-luxury-charcoal hover:bg-luxury-gold-light transition-all duration-300"
                >
                  <span className="text-sm tracking-wide">Join Queue</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/queue/status"
                  className="inline-flex items-center gap-2 px-8 py-3 border border-white/30 text-white hover:bg-white hover:text-luxury-charcoal transition-all duration-300"
                >
                  <span className="text-sm tracking-wide">Live Status</span>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="relative"
            >
              <img
                src="https://images.unsplash.com/photo-1556740758-90de374c12ad?w=800&q=90"
                alt="Technology"
                className="w-full h-[500px] object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact & Reservation */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-8">
          <div className="max-w-4xl mx-auto text-center mb-20">
            <p className="text-luxury-gold text-sm tracking-[0.3em] uppercase mb-4">Visit Us</p>
            <h2 className="font-serif text-5xl text-luxury-charcoal mb-8">
              Reserve Your Experience
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto mb-16">
            {[
              { icon: Phone, title: '+94 77 123 4567', label: 'Reservations' },
              { icon: MapPin, title: 'Sueen Nature, Baduraliya', label: 'Sri Lanka' },
              { icon: Clock, title: '6:30 AM - 10:30 PM', label: 'Daily' }
            ].map((item, index) => (
              <div key={index} className="text-center group">
                <item.icon className="w-8 h-8 mx-auto mb-4 text-luxury-gold" strokeWidth={1} />
                <p className="text-sm tracking-wide text-luxury-charcoal/60 mb-2 uppercase">
                  {item.label}
                </p>
                {item.icon === MapPin ? (
                  <a
                    href={googleMapsLocationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-luxury-charcoal font-light hover:text-luxury-gold transition-colors duration-300"
                  >
                    {item.title}
                  </a>
                ) : (
                  <p className="text-luxury-charcoal font-light">{item.title}</p>
                )}
              </div>
            ))}
          </div>

          <div className="max-w-5xl mx-auto mb-12">
            <div className="overflow-hidden border border-luxury-gold/20 bg-luxury-cream">
              <iframe
                title="Sueen Nature Baduraliya Location Map"
                src="https://www.google.com/maps?q=H735+X64+Sueen+Nature,+Baduraliya&output=embed"
                className="w-full h-[380px]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <div className="text-center mt-4">
              <a
                href={googleMapsLocationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-luxury-charcoal hover:text-luxury-gold transition-colors duration-300"
              >
                <MapPin className="w-4 h-4" />
                <span className="text-sm tracking-wide">Open in Google Maps</span>
              </a>
            </div>
          </div>

          <div className="text-center">
            <Link
              to="/booking"
              className="inline-flex items-center gap-3 px-12 py-5 bg-luxury-gold text-luxury-charcoal hover:bg-luxury-gold-light transition-all duration-500"
            >
              <span className="tracking-wide">Make a Reservation</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      <LuxuryFooter />
    </div>
  );
}

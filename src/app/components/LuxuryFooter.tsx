import { Link } from 'react-router';
import { Phone, MapPin, Mail } from 'lucide-react';
import logo from '../../assets/logo.png';

export default function LuxuryFooter() {
  return (
    <footer className="relative overflow-hidden bg-luxury-charcoal text-white py-16 border-t border-luxury-gold/20">
      <div className="pointer-events-none absolute -top-24 -right-20 h-64 w-64 rounded-full bg-luxury-gold/10 blur-3xl"></div>
      <div className="container mx-auto px-8 relative">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src={logo} alt="Sueen Nature" className="h-12 w-12 rounded-xl object-cover ring-2 ring-luxury-gold/40" />
              <div>
                <h3 className="font-serif text-2xl">Sueen Nature</h3>
              </div>
            </div>
            <p className="text-white/70 text-sm leading-relaxed">
              Refined dining, elegant atmosphere, and seamless reservations for memorable moments.
            </p>
          </div>

          <div>
            <h4 className="text-luxury-gold text-sm uppercase tracking-[0.22em] mb-4">Explore</h4>
            <div className="space-y-2 text-sm">
              {[
                { label: 'About', to: '/restaurant' },
                { label: 'Menu', to: '/menu' },
                { label: 'Gallery', to: '/gallery' },
                { label: 'Reviews', to: '/reviews' }
              ].map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="block text-white/65 hover:text-luxury-gold transition-colors duration-300"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-luxury-gold text-sm uppercase tracking-[0.22em] mb-4">Services</h4>
            <div className="space-y-2 text-sm">
              {[
                { label: 'Table Reservation', to: '/booking' },
                { label: 'Virtual Queue', to: '/queue' },
                { label: 'Queue Status', to: '/queue/status' },
                { label: 'Promotions', to: '/promotions' }
              ].map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="block text-white/65 hover:text-luxury-gold transition-colors duration-300"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-luxury-gold text-sm uppercase tracking-[0.22em] mb-4">Contact</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2 text-white/70">
                <MapPin className="w-4 h-4 mt-0.5 text-luxury-gold" />
                <span>Baduraliya, Sri Lanka</span>
              </div>
              <a href="tel:+94771234567" className="flex items-center gap-2 text-white/70 hover:text-luxury-gold transition-colors">
                <Phone className="w-4 h-4 text-luxury-gold" />
                <span>+94 77 123 4567</span>
              </a>
              <a href="mailto:info@sueennature.lk" className="flex items-center gap-2 text-white/70 hover:text-luxury-gold transition-colors">
                <Mail className="w-4 h-4 text-luxury-gold" />
                <span>info@sueennature.lk</span>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/45">© {new Date().getFullYear()} Sueen Nature. All rights reserved.</p>
          <div className="flex items-center gap-5 text-xs text-white/45">
            <Link to="/restaurant" className="hover:text-luxury-gold transition-colors">Privacy</Link>
            <Link to="/restaurant" className="hover:text-luxury-gold transition-colors">Terms</Link>
            <Link to="/restaurant" className="hover:text-luxury-gold transition-colors">Support</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, Clock } from 'lucide-react';
import { Link } from 'react-router';
import logo from '../../assets/logo.png';

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-green via-green to-[#0d3c2f] text-white">
      <div className="pointer-events-none absolute -top-20 -right-20 h-64 w-64 rounded-full bg-gold/10 blur-3xl"></div>
      <div className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-white/5 blur-3xl"></div>
      <div className="container relative mx-auto px-4 py-14">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* About */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <img
                src={logo}
                alt="Sueen Nature"
                className="h-12 w-12 rounded-xl object-cover ring-2 ring-gold/50"
              />
              <div>
                <h3 className="text-xl font-bold tracking-wide">Sueen Nature</h3>
              </div>
            </div>
            <p className="text-white/80 text-sm leading-relaxed mb-4">
              Experience world-class buffet dining with our innovative queue-free system. Premium quality, exceptional service.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-9 h-9 bg-white/10 hover:bg-gold rounded-full flex items-center justify-center transition-all">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 bg-white/10 hover:bg-gold rounded-full flex items-center justify-center transition-all">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 bg-white/10 hover:bg-gold rounded-full flex items-center justify-center transition-all">
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-4 text-gold">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { to: '/', label: 'Home' },
                { to: '/restaurant', label: 'About Us' },
                { to: '/menu', label: 'Menu' },
                { to: '/gallery', label: 'Gallery' },
                { to: '/reviews', label: 'Reviews' },
                { to: '/promotions', label: 'Promotions' }
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-white/80 hover:text-gold transition-colors text-sm flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 bg-gold rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold text-lg mb-4 text-gold">Services</h4>
            <ul className="space-y-2">
              {[
                { to: '/booking', label: 'Table Reservation' },
                { to: '/queue', label: 'Virtual Queue' },
                { to: '/queue/status', label: 'Queue Status' },
                { to: '/admin', label: 'Admin Dashboard' }
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-white/80 hover:text-gold transition-colors text-sm flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 bg-gold rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-bold text-lg mb-4 text-gold">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-white/80">Sueen Nature</p>
                  <p className="text-sm text-white/80">Baduraliya, Sri Lanka</p>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-gold flex-shrink-0" />
                <a href="tel:+94771234567" className="text-sm text-white/80 hover:text-gold transition-colors">
                  +94 77 123 4567
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gold flex-shrink-0" />
                <a href="mailto:info@sueennature.lk" className="text-sm text-white/80 hover:text-gold transition-colors">
                  info@sueennature.lk
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-white/80">Open Daily</p>
                  <p className="text-sm text-white/80">6:30 AM - 10:30 PM</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 pt-6 mt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-white/60">
              © {new Date().getFullYear()} Sueen Nature. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

import { useState, useEffect } from 'react';
import { Menu, X, Phone, Clock, MapPin } from 'lucide-react';
import { Link, useLocation } from 'react-router';
import logo from '../../assets/logo.png';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/restaurant', label: 'About' },
    { path: '/menu', label: 'Menu' },
    { path: '/queue/status', label: 'Live Queue' },
    { path: '/gallery', label: 'Gallery' },
    { path: '/reviews', label: 'Reviews' },
    { path: '/promotions', label: 'Offers' }
  ];

  return (
    <>
      {/* Top Info Bar */}
      <div className="bg-green text-white py-2 text-sm">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center flex-wrap gap-2">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Phone className="w-3 h-3" />
                <span>+94 77 123 4567</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3 h-3" />
                <span>Open Daily: 6:30 AM - 10:30 PM</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-3 h-3" />
              <span>Kandy Road, Sri Lanka</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white shadow-lg py-3'
            : 'bg-white/95 backdrop-blur-md py-4'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3">
              <img src={logo} alt="Sueen Nature Resort & Dining" className="h-12 w-auto object-contain" />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`font-semibold transition-colors relative group ${
                    location.pathname === link.path
                      ? 'text-gold'
                      : 'text-green hover:text-gold'
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 bg-gold transition-all ${
                      location.pathname === link.path ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  ></span>
                </Link>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="hidden lg:flex items-center gap-3">
              <Link
                to="/booking"
                className="px-6 py-2.5 bg-gold hover:bg-gold/90 text-white rounded-lg font-semibold transition-all shadow-md hover:shadow-lg"
              >
                Book Table
              </Link>
              <Link
                to="/queue"
                className="px-6 py-2.5 bg-green hover:bg-green/90 text-white rounded-lg font-semibold transition-all shadow-md hover:shadow-lg"
              >
                Join Queue
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-green hover:text-gold transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="lg:hidden mt-4 pb-4 border-t pt-4">
              <div className="flex flex-col gap-3">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`font-semibold py-2 transition-colors ${
                      location.pathname === link.path
                        ? 'text-gold'
                        : 'text-green hover:text-gold'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="flex flex-col gap-2 mt-2">
                  <Link
                    to="/booking"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="px-6 py-2.5 bg-gold hover:bg-gold/90 text-white rounded-lg font-semibold transition-all text-center"
                  >
                    Book Table
                  </Link>
                  <Link
                    to="/queue"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="px-6 py-2.5 bg-green hover:bg-green/90 text-white rounded-lg font-semibold transition-all text-center"
                  >
                    Join Queue
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}

import { Link } from 'react-router';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

export default function LuxuryNav() {
  const { totalItems } = useCart();
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-luxury-gold/20 shadow-sm">
      <div className="container mx-auto px-8 py-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="group">
            <h1 className="font-serif text-2xl tracking-tight text-luxury-charcoal">Queen Nature</h1>
            <p className="text-xs tracking-[0.2em] uppercase text-luxury-gold">Resort & Dining</p>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {[
              { label: 'Home', path: '/' },
              { label: 'About', path: '/restaurant' },
              { label: 'Menu', path: '/menu' },
              { label: 'Gallery', path: '/gallery' },
              { label: 'Reviews', path: '/reviews' },
              { label: 'Offers', path: '/promotions' },
              { label: 'Queue Status', path: '/queue/status' }
            ].map((item) => (
              <Link
                key={item.label}
                to={item.path}
                className="text-sm tracking-wide text-luxury-charcoal/80 hover:text-luxury-gold transition-colors duration-300"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <Link
              to="/cart"
              className="relative px-4 py-2.5 text-luxury-charcoal/80 hover:text-luxury-gold transition-colors duration-300"
            >
              <ShoppingCart className="w-5 h-5" strokeWidth={1.5} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-luxury-gold text-luxury-charcoal text-xs flex items-center justify-center font-semibold">
                  {totalItems}
                </span>
              )}
            </Link>
            <Link
              to="/queue"
              className="px-6 py-2.5 text-sm tracking-wide text-luxury-charcoal/80 hover:text-luxury-gold transition-colors duration-300"
            >
              Join Queue
            </Link>
            <Link
              to="/booking"
              className="px-6 py-2.5 border border-luxury-gold text-luxury-gold hover:bg-luxury-gold hover:text-luxury-charcoal transition-all duration-500 text-sm tracking-wide"
            >
              Reserve Table
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

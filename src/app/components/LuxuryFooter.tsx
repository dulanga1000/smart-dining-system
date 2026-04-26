import { Link } from 'react-router';

export default function LuxuryFooter() {
  return (
    <footer className="bg-luxury-charcoal text-white py-16 border-t border-luxury-gold/20">
      <div className="container mx-auto px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <h3 className="font-serif text-2xl mb-2">Queen Nature</h3>
            <p className="text-xs tracking-[0.2em] uppercase text-luxury-gold">Resort & Dining</p>
          </div>

          <div className="flex gap-12 text-sm">
            {['About', 'Menu', 'Gallery', 'Reviews', 'Contact'].map((item) => (
              <Link
                key={item}
                to={item === 'About' ? '/restaurant' : `/${item.toLowerCase()}`}
                className="text-white/60 hover:text-luxury-gold transition-colors duration-300"
              >
                {item}
              </Link>
            ))}
          </div>

          <p className="text-xs text-white/40">© 2026 Queen Nature Resort</p>
        </div>
      </div>
    </footer>
  );
}

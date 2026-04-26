import { Link } from 'react-router';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { useCart } from '../contexts/CartContext';
import LuxuryNav from './LuxuryNav';
import LuxuryFooter from './LuxuryFooter';

export default function LuxuryCartPage() {
  const { items, removeFromCart, updateQuantity, totalItems, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-luxury-ivory">
        <LuxuryNav />

        <section className="relative h-[50vh] flex items-center justify-center overflow-hidden mt-20">
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1920&q=80"
              alt="Cart"
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
              <p className="text-luxury-gold text-sm tracking-[0.3em] uppercase mb-4">Your Order</p>
              <h1 className="font-serif text-6xl md:text-7xl text-white mb-6">Shopping Cart</h1>
            </motion.div>
          </div>
        </section>

        <div className="container mx-auto px-8 py-32">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-24 h-24 border border-luxury-gold/20 flex items-center justify-center mx-auto mb-8">
              <ShoppingBag className="w-12 h-12 text-luxury-gold" strokeWidth={1} />
            </div>
            <h2 className="font-serif text-4xl text-luxury-charcoal mb-6">Your Cart is Empty</h2>
            <p className="text-luxury-charcoal/70 font-light mb-12 text-lg">
              Explore our exquisite menu and add items to get started
            </p>
            <Link
              to="/menu"
              className="inline-flex items-center gap-3 px-10 py-4 bg-luxury-gold text-luxury-charcoal hover:bg-luxury-gold-light transition-all duration-500 text-sm tracking-wide"
            >
              <span>Browse Menu</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        <LuxuryFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-luxury-ivory">
      <LuxuryNav />

      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden mt-20">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1920&q=80"
            alt="Cart"
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
            <p className="text-luxury-gold text-sm tracking-[0.3em] uppercase mb-4">Your Order</p>
            <h1 className="font-serif text-6xl md:text-7xl text-white mb-6">Shopping Cart</h1>
            <p className="text-white/80 text-lg font-light">
              {totalItems} {totalItems === 1 ? 'item' : 'items'} in your cart
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-8 py-20">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-6">
              {items.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white p-6 flex gap-6"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-32 h-32 object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-serif text-2xl text-luxury-charcoal mb-1">{item.name}</h3>
                        <p className="text-sm text-luxury-charcoal/60 font-light">{item.description}</p>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-luxury-charcoal/40 hover:text-luxury-gold transition-colors"
                      >
                        <Trash2 className="w-5 h-5" strokeWidth={1.5} />
                      </button>
                    </div>
                    <p className="text-luxury-gold text-lg font-light mb-4">LKR {item.price} each</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center border border-luxury-gold/20">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-10 h-10 flex items-center justify-center hover:bg-luxury-cream transition-colors"
                        >
                          <Minus className="w-4 h-4" strokeWidth={1.5} />
                        </button>
                        <span className="w-12 text-center font-light">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-10 h-10 flex items-center justify-center hover:bg-luxury-cream transition-colors"
                        >
                          <Plus className="w-4 h-4" strokeWidth={1.5} />
                        </button>
                      </div>
                      <p className="text-luxury-charcoal text-xl font-light">LKR {(item.price || 0) * item.quantity}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="lg:col-span-1">
              <div className="bg-luxury-charcoal text-white p-8 sticky top-32">
                <h3 className="font-serif text-2xl mb-8">Order Summary</h3>
                <div className="space-y-4 mb-8 pb-8 border-b border-luxury-gold/20">
                  <div className="flex justify-between font-light">
                    <span className="text-white/70">Total Items</span>
                    <span>{totalItems}</span>
                  </div>
                  <div className="flex justify-between font-light">
                    <span className="text-white/70">Subtotal</span>
                    <span>LKR {totalPrice}</span>
                  </div>
                </div>
                <div className="flex justify-between text-xl mb-8">
                  <span className="text-luxury-gold">Total</span>
                  <span className="text-luxury-gold">LKR {totalPrice}</span>
                </div>
                <Link
                  to="/checkout"
                  className="w-full block text-center px-8 py-4 bg-luxury-gold text-luxury-charcoal hover:bg-luxury-gold-light transition-all duration-500 text-sm tracking-wide"
                >
                  Proceed to Checkout
                </Link>
                <Link
                  to="/menu"
                  className="w-full block text-center px-8 py-4 border border-luxury-gold/20 text-luxury-gold hover:bg-luxury-gold/10 transition-all duration-500 text-sm tracking-wide mt-4"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <LuxuryFooter />
    </div>
  );
}

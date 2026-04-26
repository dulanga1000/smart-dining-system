import { useState } from 'react';
import jsPDF from 'jspdf';
import QRCode from 'qrcode';
import { useNavigate, Link } from 'react-router';
import { User, Phone, MapPin, MessageSquare, CheckCircle, CreditCard } from 'lucide-react';
import { motion } from 'motion/react';
import { toast } from 'sonner';
import { useCart } from '../contexts/CartContext';
import { projectId, publicAnonKey } from '../../../utils/supabase/info';
import LuxuryNav from './LuxuryNav';
import LuxuryFooter from './LuxuryFooter';
import QRCodeDisplay from './QRCodeDisplay';

export default function LuxuryCheckoutPage() {
  const navigate = useNavigate();
  const { items, totalItems, totalPrice, clearCart } = useCart();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    specialInstructions: '',
    paymentMethod: 'Pay at Counter'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState<any>(null);

  if (items.length === 0 && !orderSuccess) {
    navigate('/cart');
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate order success for demo frontend
    setTimeout(() => {
      setOrderSuccess({
        orderId: 'DEMO-' + Date.now(),
        name: formData.name,
        phone: formData.phone,
        paymentMethod: formData.paymentMethod,
        specialInstructions: formData.specialInstructions,
        items: items,
        totalItems: totalItems,
        totalPrice: totalPrice
      });
      clearCart();
      toast.success('Order placed successfully!');
      setIsSubmitting(false);
    }, 1000);
  };

  if (orderSuccess) {
    const handlePrint = () => {
      const printWindow = window.open('', '_blank', 'width=400,height=600');
      if (!printWindow) return;

      const itemsHtml = (orderSuccess.items || items).map((item: any) => `
        <div class="row">
          <span>${item.quantity}x ${item.name}</span>
          <span>LKR ${(item.price || 0) * item.quantity}</span>
        </div>
      `).join('');

      printWindow.document.write(`
        <html>
          <head>
            <title>Order Bill ${orderSuccess.orderId}</title>
            <style>
              @import url('https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap');
              body { 
                font-family: 'Space Mono', monospace; 
                padding: 20px; 
                color: #000; 
                width: 300px; 
                margin: 0 auto; 
              }
              .header { text-align: center; margin-bottom: 20px; }
              .logo { font-size: 24px; font-weight: bold; margin-bottom: 5px; text-transform: uppercase; }
              .sub { font-size: 12px; color: #444; }
              .divider { border-top: 1px dashed #000; margin: 15px 0; }
              .row { display: flex; justify-content: space-between; font-size: 14px; margin: 8px 0; }
              .big-ticket { font-size: 18px; font-weight: bold; text-align: center; margin: 15px 0; }
              .qr { margin-top: 20px; text-align: center; }
              img { width: 120px; height: 120px; display: block; margin: 0 auto; }
              .footer { text-align: center; font-size: 12px; margin-top: 20px; color: #555; }
              .total-row { font-size: 16px; font-weight: bold; margin-top: 10px; }
            </style>
          </head>
          <body>
            <div class="header">
              <div class="logo">Smart Dining</div>
              <div class="sub">Premium Restaurant Experience</div>
              <div class="sub">123 Culinary Hub, Colombo</div>
            </div>
            <div class="divider"></div>
            <div class="row"><span>Order ID:</span><span>${orderSuccess.orderId}</span></div>
            <div class="row"><span>Name:</span><span>${orderSuccess.name}</span></div>
            <div class="row"><span>Phone:</span><span>${orderSuccess.phone}</span></div>
            <div class="divider"></div>
            <div style="font-weight: bold; margin-bottom: 10px; font-size: 12px;">ITEMS</div>
            ${itemsHtml}
            <div class="divider"></div>
            <div class="row">
              <span>Items Total:</span>
              <span>${orderSuccess.totalItems || items.reduce((sum: number, i: any) => sum + i.quantity, 0)}</span>
            </div>
            <div class="row total-row">
              <span>TOTAL (LKR):</span>
              <span>${orderSuccess.totalPrice || items.reduce((sum: number, i: any) => sum + (i.price || 0) * i.quantity, 0)}</span>
            </div>
            <div class="divider"></div>
            <div class="row"><span>Payment:</span><span>${orderSuccess.paymentMethod}</span></div>
            <div class="qr">
              <img src="${document.querySelector('canvas')?.toDataURL() || ''}" alt="QR Code" />
            </div>
            <div class="footer">
              Thank you for dining with us!<br/>
              Please present this bill.
            </div>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.focus();
      setTimeout(() => {
        printWindow.print();
        printWindow.close();
      }, 250);
    };

    const handleDownload = async () => {
      const doc = new jsPDF({ unit: 'mm', format: [80, 250] });
      const width = doc.internal.pageSize.getWidth();
      let y = 15;

      const centerText = (text: string, yPos: number, size = 10, isBold = false) => {
        doc.setFontSize(size);
        doc.setFont('courier', isBold ? 'bold' : 'normal');
        const textWidth = doc.getStringUnitWidth(text) * size / doc.internal.scaleFactor;
        doc.text(text, (width - textWidth) / 2, yPos);
      };

      centerText('SMART DINING', y, 16, true);
      y += 6;
      centerText('Premium Restaurant Experience', y, 8);
      y += 4;
      centerText('123 Culinary Hub, Colombo', y, 8);

      y += 8;
      doc.setLineDashPattern([1, 1], 0);
      doc.line(5, y, width - 5, y);
      y += 8;

      centerText('ORDER BILL', y, 12, true);
      y += 8;

      doc.setFontSize(9);
      doc.setFont('courier', 'normal');
      doc.text(`ID: ${orderSuccess.orderId}`, 5, y);
      y += 5;
      doc.text(`Customer: ${orderSuccess.name}`, 5, y);
      y += 5;
      doc.text(`Phone: ${orderSuccess.phone}`, 5, y);
      y += 5;

      y += 3;
      doc.setLineDashPattern([1, 1], 0);
      doc.line(5, y, width - 5, y);
      y += 6;

      doc.setFont('courier', 'bold');
      doc.text('QTY  ITEM', 5, y);
      doc.text('TOTAL', width - 5, y, { align: 'right' });
      doc.setFont('courier', 'normal');
      y += 6;

      const orderItems = orderSuccess.items || items;
      orderItems.forEach((item: any) => {
        const itemLine = `${item.quantity}x ${item.name}`;
        const priceLine = `${(item.price || 0) * item.quantity}`;
        doc.text(itemLine.substring(0, 20), 5, y);
        doc.text(priceLine, width - 5, y, { align: 'right' });
        y += 5;
      });

      y += 3;
      doc.setLineDashPattern([1, 1], 0);
      doc.line(5, y, width - 5, y);
      y += 6;

      doc.text('Total Items:', 5, y);
      const totalCount = orderSuccess.totalItems || items.reduce((sum: number, i: any) => sum + i.quantity, 0);
      doc.text(totalCount.toString(), width - 5, y, { align: 'right' });
      y += 6;

      doc.setFontSize(11);
      doc.setFont('courier', 'bold');
      doc.text('TOTAL (LKR):', 5, y);
      const finalPrice = orderSuccess.totalPrice || items.reduce((sum: number, i: any) => sum + (i.price || 0) * i.quantity, 0);
      doc.text(finalPrice.toString(), width - 5, y, { align: 'right' });

      y += 8;
      doc.setLineDashPattern([1, 1], 0);
      doc.line(5, y, width - 5, y);
      y += 10;

      const qrValue = `ORDER:${orderSuccess.orderId}`;
      try {
        const qrDataUrl = await QRCode.toDataURL(qrValue, { width: 100, margin: 1 });
        doc.addImage(qrDataUrl, 'PNG', (width - 40) / 2, y, 40, 40);
        y += 45;
      } catch (err) { }

      centerText('Thank you for dining with us!', y, 8);
      y += 4;
      centerText('Please present this bill.', y, 8);

      doc.save(`Order_${orderSuccess.orderId}.pdf`);
    };

    return (
      <div className="min-h-screen bg-luxury-ivory flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white max-w-2xl w-full text-center p-12"
        >
          <div className="w-20 h-20 bg-luxury-gold/10 flex items-center justify-center mx-auto mb-8">
            <CheckCircle className="w-12 h-12 text-luxury-gold" strokeWidth={1.5} />
          </div>
          <p className="text-luxury-gold text-sm tracking-[0.3em] uppercase mb-4">Confirmed</p>
          <h1 className="font-serif text-4xl text-luxury-charcoal mb-6">Order Placed</h1>
          <p className="text-luxury-charcoal/70 font-light mb-12">Your order has been received</p>

          {/* Bill section to print/download */}
          <div id="order-bill">
            <div className="border border-luxury-charcoal/10 p-8 mb-12 text-left">
              <div className="grid gap-6">
                <div className="flex items-start gap-4">
                  <CreditCard className="w-5 h-5 text-luxury-gold mt-1" strokeWidth={1.5} />
                  <div className="flex-1">
                    <p className="text-xs tracking-wide text-luxury-charcoal/60 mb-1 uppercase">Order ID</p>
                    <p className="text-luxury-charcoal font-light">{orderSuccess.orderId}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <User className="w-5 h-5 text-luxury-gold mt-1" strokeWidth={1.5} />
                  <div className="flex-1">
                    <p className="text-xs tracking-wide text-luxury-charcoal/60 mb-1 uppercase">Name</p>
                    <p className="text-luxury-charcoal font-light">{orderSuccess.name}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Phone className="w-5 h-5 text-luxury-gold mt-1" strokeWidth={1.5} />
                  <div className="flex-1">
                    <p className="text-xs tracking-wide text-luxury-charcoal/60 mb-1 uppercase">Phone</p>
                    <p className="text-luxury-charcoal font-light">{orderSuccess.phone}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <CreditCard className="w-5 h-5 text-luxury-gold mt-1" strokeWidth={1.5} />
                  <div className="flex-1">
                    <p className="text-xs tracking-wide text-luxury-charcoal/60 mb-1 uppercase">Payment Method</p>
                    <p className="text-luxury-charcoal font-light">{orderSuccess.paymentMethod}</p>
                  </div>
                </div>
                {orderSuccess.specialInstructions && (
                  <div className="flex items-start gap-4">
                    <MessageSquare className="w-5 h-5 text-luxury-gold mt-1" strokeWidth={1.5} />
                    <div className="flex-1">
                      <p className="text-xs tracking-wide text-luxury-charcoal/60 mb-1 uppercase">Special Instructions</p>
                      <p className="text-luxury-charcoal font-light">{orderSuccess.specialInstructions}</p>
                    </div>
                  </div>
                )}
                <div className="mt-6">
                  <p className="text-xs tracking-wide text-luxury-charcoal/60 mb-2 uppercase">Order Items</p>
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr>
                        <th className="py-1 px-2 border-b border-luxury-charcoal/10">Item</th>
                        <th className="py-1 px-2 border-b border-luxury-charcoal/10">Qty</th>
                        <th className="py-1 px-2 border-b border-luxury-charcoal/10">Price</th>
                        <th className="py-1 px-2 border-b border-luxury-charcoal/10">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(orderSuccess.items || items).map((item: any, idx: number) => (
                        <tr key={idx}>
                          <td className="py-1 px-2">{item.name}</td>
                          <td className="py-1 px-2">{item.quantity}</td>
                          <td className="py-1 px-2">LKR {item.price}</td>
                          <td className="py-1 px-2">LKR {(item.price || 0) * item.quantity}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="flex justify-end mt-4">
                    <div>
                      <div className="flex justify-between gap-8">
                        <span className="text-luxury-charcoal/70">Total Items:</span>
                        <span className="text-luxury-charcoal">{orderSuccess.totalItems || items.reduce((sum: number, i: any) => sum + i.quantity, 0)}</span>
                      </div>
                      <div className="flex justify-between gap-8">
                        <span className="text-luxury-charcoal/70">Subtotal:</span>
                        <span className="text-luxury-charcoal">LKR {orderSuccess.totalPrice || items.reduce((sum: number, i: any) => sum + (i.price || 0) * i.quantity, 0)}</span>
                      </div>
                      <div className="flex justify-between gap-8 font-bold text-lg mt-2">
                        <span className="text-luxury-gold">Total:</span>
                        <span className="text-luxury-gold">LKR {orderSuccess.totalPrice || items.reduce((sum: number, i: any) => sum + (i.price || 0) * i.quantity, 0)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-luxury-cream p-8 mb-12">
              <p className="text-xs tracking-wide text-luxury-charcoal/60 mb-4 uppercase">Order Reference</p>
              <QRCodeDisplay value={`ORDER:${orderSuccess.orderId}`} size={200} />
              <p className="text-sm text-luxury-charcoal/70 font-light mt-4">Save for your records</p>
            </div>
          </div>

          {/* Print and Download buttons */}
          <div className="flex gap-4 mb-8">
            <button
              onClick={handlePrint}
              className="flex-1 px-8 py-4 bg-luxury-gold text-luxury-charcoal text-center hover:bg-luxury-gold-light transition-all duration-500 text-sm tracking-wide"
            >
              Print Bill
            </button>
            <button
              onClick={handleDownload}
              className="flex-1 px-8 py-4 border border-luxury-gold text-luxury-charcoal text-center hover:bg-luxury-gold hover:text-luxury-charcoal transition-all duration-500 text-sm tracking-wide"
            >
              Download Bill
            </button>
          </div>

          <div className="flex gap-4">
            <Link
              to="/"
              className="flex-1 px-8 py-4 bg-luxury-gold text-luxury-charcoal text-center hover:bg-luxury-gold-light transition-all duration-500 text-sm tracking-wide"
            >
              Return Home
            </Link>
            <Link
              to="/menu"
              className="flex-1 px-8 py-4 border border-luxury-gold text-luxury-charcoal text-center hover:bg-luxury-gold hover:text-luxury-charcoal transition-all duration-500 text-sm tracking-wide"
            >
              Order Again
            </Link>
          </div>
        </motion.div>
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
            alt="Checkout"
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
            <p className="text-luxury-gold text-sm tracking-[0.3em] uppercase mb-4">Final Step</p>
            <h1 className="font-serif text-6xl md:text-7xl text-white mb-6">Checkout</h1>
            <p className="text-white/80 text-lg max-w-2xl mx-auto font-light">
              Complete your order details
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-8 py-20">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="bg-white p-12">
                <h2 className="font-serif text-3xl text-luxury-charcoal mb-8">Dine-In Information</h2>

                <div className="space-y-8">
                  <div>
                    <label className="flex items-center gap-2 text-luxury-charcoal mb-3 text-sm tracking-wide">
                      <User className="w-4 h-4 text-luxury-gold" strokeWidth={1.5} />
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 border border-luxury-charcoal/10 focus:outline-none focus:border-luxury-gold transition-all bg-white text-luxury-charcoal font-light"
                    />
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-luxury-charcoal mb-3 text-sm tracking-wide">
                      <Phone className="w-4 h-4 text-luxury-gold" strokeWidth={1.5} />
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 border border-luxury-charcoal/10 focus:outline-none focus:border-luxury-gold transition-all bg-white text-luxury-charcoal font-light"
                      placeholder="+94 77 123 4567"
                    />
                  </div>

                  {/* Delivery Address field removed for dine-in only */}

                  <div>
                    <label className="flex items-center gap-2 text-luxury-charcoal mb-3 text-sm tracking-wide">
                      <CreditCard className="w-4 h-4 text-luxury-gold" strokeWidth={1.5} />
                      Payment Method
                    </label>
                    <select
                      value={formData.paymentMethod}
                      onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                      className="w-full px-4 py-3 border border-luxury-charcoal/10 focus:outline-none focus:border-luxury-gold transition-all bg-white text-luxury-charcoal font-light"
                    >
                      <option value="Pay at Counter">Pay at Counter</option>
                    </select>
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-luxury-charcoal mb-3 text-sm tracking-wide">
                      <MessageSquare className="w-4 h-4 text-luxury-gold" strokeWidth={1.5} />
                      Special Instructions (Optional)
                    </label>
                    <textarea
                      value={formData.specialInstructions}
                      onChange={(e) => setFormData({ ...formData, specialInstructions: e.target.value })}
                      rows={4}
                      className="w-full px-4 py-3 border border-luxury-charcoal/10 focus:outline-none focus:border-luxury-gold transition-all bg-white text-luxury-charcoal font-light"
                      placeholder="Any dietary requirements or notes"
                    ></textarea>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-10 px-8 py-4 bg-luxury-gold text-luxury-charcoal hover:bg-luxury-gold-light disabled:bg-luxury-charcoal/30 transition-all duration-500 text-sm tracking-wide"
                >
                  {isSubmitting ? 'Processing...' : 'Place Order'}
                </button>
              </form>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-luxury-charcoal text-white p-8 sticky top-32">
                <h3 className="font-serif text-2xl mb-8">Your Order</h3>
                <div className="space-y-4 mb-8 pb-8 border-b border-luxury-gold/20">
                  {items.map(item => (
                    <div key={item.id} className="space-y-1">
                      <div className="flex justify-between font-light text-sm">
                        <span className="text-white/70">{item.name} x {item.quantity}</span>
                        <span className="text-white">LKR {(item.price || 0) * item.quantity}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between font-light">
                    <span className="text-white/70">Total Items</span>
                    <span className="text-white">{totalItems}</span>
                  </div>
                  <div className="flex justify-between font-light">
                    <span className="text-white/70">Subtotal</span>
                    <span className="text-white">LKR {totalPrice}</span>
                  </div>
                </div>
                <div className="flex justify-between text-xl pt-6 border-t border-luxury-gold/20">
                  <span className="text-luxury-gold">Total</span>
                  <span className="text-luxury-gold">LKR {totalPrice}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <LuxuryFooter />
    </div>
  );
}

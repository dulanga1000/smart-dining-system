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
  const businessName = 'Sueen Nature';
  const businessAddress = 'Sueen Baduraliya, Sri Lanka';
  const businessContact = '+94 77 123 4567';

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

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat('en-LK', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);

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
    const handlePrint = async () => {
      const printWindow = window.open('', '_blank', 'width=400,height=600');
      if (!printWindow) return;

      const orderItems = orderSuccess.items || items;
      const totalCount = orderSuccess.totalItems || orderItems.reduce((sum: number, i: any) => sum + i.quantity, 0);
      const subtotal = orderSuccess.totalPrice || orderItems.reduce((sum: number, i: any) => sum + (i.price || 0) * i.quantity, 0);
      const serviceCharge = 0;
      const tax = 0;
      const grandTotal = subtotal + serviceCharge + tax;
      const issuedAt = new Date();
      const invoiceNo = orderSuccess.orderId;

      let qrDataUrl = '';
      try {
        qrDataUrl = await QRCode.toDataURL(`ORDER:${orderSuccess.orderId}`, { width: 180, margin: 1 });
      } catch {
        qrDataUrl = '';
      }

      const itemsHtml = orderItems.map((item: any) => `
        <tr>
          <td>${item.name}</td>
          <td style="text-align:center;">${item.quantity}</td>
          <td style="text-align:right;">${formatCurrency(item.price || 0)}</td>
          <td style="text-align:right;">${formatCurrency((item.price || 0) * item.quantity)}</td>
        </tr>
      `).join('');

      printWindow.document.write(`
        <html>
          <head>
            <title>${businessName} Bill ${orderSuccess.orderId}</title>
            <style>
              @import url('https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap');
              body { 
                font-family: 'Space Mono', monospace; 
                padding: 20px; 
                color: #000; 
                width: 330px; 
                margin: 0 auto; 
              }
              .header { text-align: center; margin-bottom: 20px; }
              .logo { font-size: 24px; font-weight: bold; margin-bottom: 5px; text-transform: uppercase; }
              .sub { font-size: 12px; color: #444; }
              .divider { border-top: 1px dashed #000; margin: 15px 0; }
              .row { display: flex; justify-content: space-between; font-size: 14px; margin: 8px 0; }
              .qr { margin-top: 20px; text-align: center; }
              img { width: 120px; height: 120px; display: block; margin: 0 auto; }
              .footer { text-align: center; font-size: 12px; margin-top: 20px; color: #555; }
              table { width: 100%; border-collapse: collapse; font-size: 12px; }
              th, td { padding: 6px 2px; border-bottom: 1px dotted #bbb; }
              th { text-align: left; font-size: 11px; text-transform: uppercase; }
              .totals .row { margin: 4px 0; }
              .grand { font-size: 16px; font-weight: 700; }
            </style>
          </head>
          <body>
            <div class="header">
              <div class="logo">${businessName}</div>
              <div class="sub">${businessAddress}</div>
              <div class="sub">Contact: ${businessContact}</div>
            </div>
            <div class="divider"></div>
            <div class="row"><span>Invoice:</span><span>${invoiceNo}</span></div>
            <div class="row"><span>Date:</span><span>${issuedAt.toLocaleDateString()}</span></div>
            <div class="row"><span>Time:</span><span>${issuedAt.toLocaleTimeString()}</span></div>
            <div class="row"><span>Name:</span><span>${orderSuccess.name}</span></div>
            <div class="row"><span>Phone:</span><span>${orderSuccess.phone}</span></div>
            <div class="row"><span>Payment:</span><span>${orderSuccess.paymentMethod}</span></div>
            <div class="divider"></div>

            <table>
              <thead>
                <tr>
                  <th>Item</th>
                  <th style="text-align:center;">Qty</th>
                  <th style="text-align:right;">Rate</th>
                  <th style="text-align:right;">Amount</th>
                </tr>
              </thead>
              <tbody>
                ${itemsHtml}
              </tbody>
            </table>

            <div class="divider"></div>
            <div class="totals">
              <div class="row">
                <span>Total Items:</span>
                <span>${totalCount}</span>
              </div>
              <div class="row">
                <span>Subtotal:</span>
                <span>LKR ${formatCurrency(subtotal)}</span>
              </div>
              <div class="row">
                <span>Service Charge:</span>
                <span>LKR ${formatCurrency(serviceCharge)}</span>
              </div>
              <div class="row">
                <span>Tax:</span>
                <span>LKR ${formatCurrency(tax)}</span>
              </div>
              <div class="row grand">
                <span>Grand Total:</span>
                <span>LKR ${formatCurrency(grandTotal)}</span>
              </div>
            </div>

            <div class="divider"></div>
            <div class="qr">
              <img src="${qrDataUrl}" alt="QR Code" />
            </div>
            <div class="footer">
              Thank you for dining with us!<br/>
              Please keep this bill for reference.
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
      const orderItems = orderSuccess.items || items;
      const dynamicHeight = Math.max(260, Math.min(600, 180 + (orderItems.length * 8)));
      const doc = new jsPDF({ unit: 'mm', format: [80, dynamicHeight] });
      const width = doc.internal.pageSize.getWidth();
      let y = 15;

      const totalCount = orderSuccess.totalItems || orderItems.reduce((sum: number, i: any) => sum + i.quantity, 0);
      const subtotal = orderSuccess.totalPrice || orderItems.reduce((sum: number, i: any) => sum + (i.price || 0) * i.quantity, 0);
      const serviceCharge = 0;
      const tax = 0;
      const grandTotal = subtotal + serviceCharge + tax;
      const issuedAt = new Date();

      const centerText = (text: string, yPos: number, size = 10, isBold = false) => {
        doc.setFontSize(size);
        doc.setFont('courier', isBold ? 'bold' : 'normal');
        const textWidth = doc.getStringUnitWidth(text) * size / doc.internal.scaleFactor;
        doc.text(text, (width - textWidth) / 2, yPos);
      };

      centerText(businessName.toUpperCase(), y, 14, true);
      y += 6;
      centerText(businessAddress, y, 8);
      y += 4;
      centerText(`Contact: ${businessContact}`, y, 8);

      y += 8;
      doc.setLineDashPattern([1, 1], 0);
      doc.line(5, y, width - 5, y);
      y += 8;

      centerText('TAX INVOICE / BILL', y, 10, true);
      y += 8;

      doc.setFontSize(9);
      doc.setFont('courier', 'normal');
      doc.text(`Invoice: ${orderSuccess.orderId}`, 5, y);
      y += 5;
      doc.text(`Date: ${issuedAt.toLocaleDateString()}`, 5, y);
      y += 5;
      doc.text(`Time: ${issuedAt.toLocaleTimeString()}`, 5, y);
      y += 5;
      doc.text(`Customer: ${orderSuccess.name}`, 5, y);
      y += 5;
      doc.text(`Phone: ${orderSuccess.phone}`, 5, y);
      y += 5;
      doc.text(`Payment: ${orderSuccess.paymentMethod}`, 5, y);
      y += 5;

      y += 3;
      doc.setLineDashPattern([1, 1], 0);
      doc.line(5, y, width - 5, y);
      y += 6;

      doc.setFont('courier', 'bold');
      doc.text('ITEM', 5, y);
      doc.text('QTY', 42, y, { align: 'right' });
      doc.text('RATE', 57, y, { align: 'right' });
      doc.text('AMT', width - 5, y, { align: 'right' });
      doc.setFont('courier', 'normal');
      y += 6;

      orderItems.forEach((item: any) => {
        const lineTotal = (item.price || 0) * item.quantity;
        doc.text(String(item.name || '').substring(0, 14), 5, y);
        doc.text(String(item.quantity), 42, y, { align: 'right' });
        doc.text(formatCurrency(item.price || 0), 57, y, { align: 'right' });
        doc.text(formatCurrency(lineTotal), width - 5, y, { align: 'right' });
        y += 5;
      });

      y += 3;
      doc.setLineDashPattern([1, 1], 0);
      doc.line(5, y, width - 5, y);
      y += 6;

      doc.text('Total Items:', 5, y);
      doc.text(totalCount.toString(), width - 5, y, { align: 'right' });
      y += 6;

      doc.text('Subtotal:', 5, y);
      doc.text(`LKR ${formatCurrency(subtotal)}`, width - 5, y, { align: 'right' });
      y += 5;
      doc.text('Service Charge:', 5, y);
      doc.text(`LKR ${formatCurrency(serviceCharge)}`, width - 5, y, { align: 'right' });
      y += 5;
      doc.text('Tax:', 5, y);
      doc.text(`LKR ${formatCurrency(tax)}`, width - 5, y, { align: 'right' });
      y += 6;

      doc.setFontSize(11);
      doc.setFont('courier', 'bold');
      doc.text('GRAND TOTAL:', 5, y);
      doc.text(`LKR ${formatCurrency(grandTotal)}`, width - 5, y, { align: 'right' });

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
      centerText('Please keep this bill for reference.', y, 8);

      doc.save(`Sueen_Nature_Bill_${orderSuccess.orderId}.pdf`);
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
            <div className="border border-luxury-charcoal/10 p-8 mb-12 text-left bg-white">
              <div className="text-center pb-4 border-b border-dashed border-luxury-charcoal/20">
                <h2 className="font-serif text-3xl text-luxury-charcoal">{businessName}</h2>
                <p className="text-sm text-luxury-charcoal/70 mt-1">{businessAddress}</p>
                <p className="text-sm text-luxury-charcoal/70">Contact: {businessContact}</p>
                <p className="text-xs tracking-[0.22em] uppercase text-luxury-charcoal/50 mt-2">Tax Invoice / Bill</p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 py-5 border-b border-dashed border-luxury-charcoal/20 text-sm">
                <div className="space-y-2">
                  <p><span className="text-luxury-charcoal/60">Invoice:</span> <span className="text-luxury-charcoal">{orderSuccess.orderId}</span></p>
                  <p><span className="text-luxury-charcoal/60">Date:</span> <span className="text-luxury-charcoal">{new Date().toLocaleDateString()}</span></p>
                  <p><span className="text-luxury-charcoal/60">Time:</span> <span className="text-luxury-charcoal">{new Date().toLocaleTimeString()}</span></p>
                </div>
                <div className="space-y-2 sm:text-right">
                  <p><span className="text-luxury-charcoal/60">Customer:</span> <span className="text-luxury-charcoal">{orderSuccess.name}</span></p>
                  <p><span className="text-luxury-charcoal/60">Phone:</span> <span className="text-luxury-charcoal">{orderSuccess.phone}</span></p>
                  <p><span className="text-luxury-charcoal/60">Payment:</span> <span className="text-luxury-charcoal">{orderSuccess.paymentMethod}</span></p>
                </div>
              </div>

              {orderSuccess.specialInstructions && (
                <div className="py-4 border-b border-dashed border-luxury-charcoal/20">
                  <div className="flex items-start gap-3 text-sm">
                    <MessageSquare className="w-4 h-4 text-luxury-gold mt-0.5" strokeWidth={1.5} />
                    <p className="text-luxury-charcoal/80"><span className="text-luxury-charcoal/60">Special Note:</span> {orderSuccess.specialInstructions}</p>
                  </div>
                </div>
              )}

              <div className="overflow-x-auto py-5 border-b border-dashed border-luxury-charcoal/20">
                <table className="w-full min-w-[520px] text-sm border-collapse">
                  <thead>
                    <tr className="text-luxury-charcoal/70 uppercase text-xs tracking-wide">
                      <th className="text-left py-2 border-b border-luxury-charcoal/10">Item</th>
                      <th className="text-right py-2 border-b border-luxury-charcoal/10">Qty</th>
                      <th className="text-right py-2 border-b border-luxury-charcoal/10">Rate (LKR)</th>
                      <th className="text-right py-2 border-b border-luxury-charcoal/10">Amount (LKR)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(orderSuccess.items || items).map((item: any, idx: number) => (
                      <tr key={idx} className="border-b border-luxury-charcoal/5">
                        <td className="py-2 text-luxury-charcoal">{item.name}</td>
                        <td className="py-2 text-right text-luxury-charcoal">{item.quantity}</td>
                        <td className="py-2 text-right text-luxury-charcoal">{formatCurrency(item.price || 0)}</td>
                        <td className="py-2 text-right text-luxury-charcoal">{formatCurrency((item.price || 0) * item.quantity)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="pt-5 flex justify-end">
                <div className="w-full max-w-sm space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-luxury-charcoal/60">Total Items</span>
                    <span className="text-luxury-charcoal">{orderSuccess.totalItems || items.reduce((sum: number, i: any) => sum + i.quantity, 0)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-luxury-charcoal/60">Subtotal</span>
                    <span className="text-luxury-charcoal">LKR {formatCurrency(orderSuccess.totalPrice || items.reduce((sum: number, i: any) => sum + (i.price || 0) * i.quantity, 0))}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-luxury-charcoal/60">Service Charge</span>
                    <span className="text-luxury-charcoal">LKR {formatCurrency(0)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-luxury-charcoal/60">Tax</span>
                    <span className="text-luxury-charcoal">LKR {formatCurrency(0)}</span>
                  </div>
                  <div className="flex justify-between border-t border-luxury-charcoal/20 pt-2 font-semibold text-base">
                    <span className="text-luxury-gold">Grand Total</span>
                    <span className="text-luxury-gold">LKR {formatCurrency(orderSuccess.totalPrice || items.reduce((sum: number, i: any) => sum + (i.price || 0) * i.quantity, 0))}</span>
                  </div>
                </div>
              </div>

              <div className="pt-5 mt-5 border-t border-dashed border-luxury-charcoal/20 text-center text-xs text-luxury-charcoal/60">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <MapPin className="w-3.5 h-3.5 text-luxury-gold" strokeWidth={1.5} />
                  <span>{businessAddress}</span>
                </div>
                <p>Contact: {businessContact}</p>
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

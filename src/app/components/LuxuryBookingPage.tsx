import { useState } from 'react';
import { Calendar, Clock, MapPin, Phone, User, Users, MessageSquare, CheckCircle, Printer, Download } from 'lucide-react';
import { Link } from 'react-router';
import { projectId, publicAnonKey } from '../../../utils/supabase/info';
import { toast } from 'sonner';
import { motion } from 'motion/react';
import jsPDF from 'jspdf';
import QRCode from 'qrcode';
import QRCodeDisplay from './QRCodeDisplay';
import LuxuryNav from './LuxuryNav';
import LuxuryFooter from './LuxuryFooter';

export default function LuxuryBookingPage() {
  const businessName = 'Sueen Nature';
  const businessAddress = 'Sueen Baduraliya, Sri Lanka';
  const businessContact = '+94 77 123 4567';

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    date: '',
    time: '',
    guestCount: '2',
    tablePreference: 'Indoor',
    specialRequests: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-ce9c7d1f/bookings`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`
          },
          body: JSON.stringify(formData)
        }
      );

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to create booking');

      setBookingSuccess({
        ...data.booking,
        phone: data.booking?.phone || formData.phone,
        specialRequests: data.booking?.specialRequests || formData.specialRequests,
        confirmedAt: new Date().toLocaleString()
      });
      toast.success('Booking confirmed successfully!');
    } catch (error: any) {
      console.error('Booking error:', error);
      toast.error(error.message || 'Failed to create booking');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (bookingSuccess) {
    const handlePrintReceipt = () => {
      const printWindow = window.open('', '_blank', 'width=400,height=600');
      if (!printWindow) return;

      printWindow.document.write(`
        <html>
          <head>
            <title>Reservation Receipt ${bookingSuccess.bookingId}</title>
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
              .big-ticket { font-size: 24px; font-weight: bold; text-align: center; margin: 15px 0; }
              .qr { margin-top: 20px; text-align: center; }
              img { width: 120px; height: 120px; display: block; margin: 0 auto; }
              .footer { text-align: center; font-size: 12px; margin-top: 20px; color: #555; }
            </style>
          </head>
          <body>
            <div class="header">
              <div class="logo">Sueen Nature</div>
              <div class="sub">Baduraliya, Sri Lanka</div>
              <div class="sub">Contact: +94 77 123 4567</div>
            </div>
            <div class="divider"></div>
            <div style="text-align: center; font-size: 14px; margin-bottom: 5px;">RESERVATION TICKET</div>
            <div class="big-ticket">#${bookingSuccess.bookingId}</div>
            <div class="divider"></div>
            <div class="row"><span>Name:</span><span>${bookingSuccess.name || 'N/A'}</span></div>
            <div class="row"><span>Phone:</span><span>${bookingSuccess.phone || 'N/A'}</span></div>
            <div class="row"><span>Date:</span><span>${bookingSuccess.date || 'N/A'}</span></div>
            <div class="row"><span>Time:</span><span>${bookingSuccess.time || 'N/A'}</span></div>
            <div class="row"><span>Guests:</span><span>${bookingSuccess.guestCount || 'N/A'}</span></div>
            <div class="row"><span>Seating:</span><span>${bookingSuccess.tablePreference || 'N/A'}</span></div>
            <div class="divider"></div>
            <div class="qr">
              <img src="${document.querySelector('canvas')?.toDataURL() || ''}" alt="QR Code" />
            </div>
            <div class="footer">
              Keep this ticket safe.<br/>
              Please present at arrival.<br/>
              We'll hold your table for 15 mins.
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

    const handleDownloadReceipt = async () => {
      const doc = new jsPDF({ unit: 'mm', format: [80, 230] });
      const width = doc.internal.pageSize.getWidth();
      let y = 15;

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

      centerText('RESERVATION TICKET', y, 10, true);
      y += 10;
      centerText(`#${bookingSuccess.bookingId}`, y, 14, true);
      y += 8;

      doc.setLineDashPattern([1, 1], 0);
      doc.line(5, y, width - 5, y);
      y += 8;

      doc.setFontSize(9);
      doc.setFont('courier', 'normal');
      doc.text('Name:', 5, y);
      doc.text(bookingSuccess.name || 'N/A', width - 5, y, { align: 'right' });
      y += 6;
      doc.text('Phone:', 5, y);
      doc.text(bookingSuccess.phone || 'N/A', width - 5, y, { align: 'right' });
      y += 6;
      doc.text('Date:', 5, y);
      doc.text(bookingSuccess.date || 'N/A', width - 5, y, { align: 'right' });
      y += 6;
      doc.text('Time:', 5, y);
      doc.text(bookingSuccess.time || 'N/A', width - 5, y, { align: 'right' });
      y += 6;
      doc.text('Guests:', 5, y);
      doc.text(bookingSuccess.guestCount?.toString() || 'N/A', width - 5, y, { align: 'right' });
      y += 6;
      doc.text('Seating:', 5, y);
      doc.text(bookingSuccess.tablePreference || 'N/A', width - 5, y, { align: 'right' });

      y += 8;
      doc.setLineDashPattern([1, 1], 0);
      doc.line(5, y, width - 5, y);
      y += 10;

      const qrValue = `BOOKING:${bookingSuccess.bookingId}`;
      try {
        const qrDataUrl = await QRCode.toDataURL(qrValue, { width: 100, margin: 1 });
        doc.addImage(qrDataUrl, 'PNG', (width - 40) / 2, y, 40, 40);
        y += 45;
      } catch (err) { }

      centerText('Please present this ticket', y, 8);
      y += 4;
      centerText('at arrival. Thank you!', y, 8);

      doc.save(`Reservation_${bookingSuccess.bookingId}.pdf`);
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
          <h1 className="font-serif text-4xl text-luxury-charcoal mb-6">Reservation Secured</h1>
          <p className="text-luxury-charcoal/70 font-light mb-12">Your table awaits</p>

          <div id="booking-receipt" className="border border-luxury-charcoal/10 p-8 mb-8 text-left">
            <div className="grid gap-6">
              {[
                { icon: User, label: 'Confirmation', value: bookingSuccess.bookingId },
                { icon: User, label: 'Name', value: bookingSuccess.name },
                { icon: Phone, label: 'Phone', value: bookingSuccess.phone || 'N/A' },
                { icon: Calendar, label: 'Date & Time', value: `${bookingSuccess.date} at ${bookingSuccess.time}` },
                { icon: Users, label: 'Party Size', value: `${bookingSuccess.guestCount} Guests` },
                { icon: MapPin, label: 'Seating', value: bookingSuccess.tablePreference },
                { icon: Clock, label: 'Confirmed At', value: bookingSuccess.confirmedAt || 'N/A' }
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <item.icon className="w-5 h-5 text-luxury-gold mt-1" strokeWidth={1.5} />
                  <div className="flex-1">
                    <p className="text-xs tracking-wide text-luxury-charcoal/60 mb-1 uppercase">{item.label}</p>
                    <p className="text-luxury-charcoal font-light">{item.value}</p>
                  </div>
                </div>
              ))}
              {bookingSuccess.specialRequests && (
                <div className="flex items-start gap-4">
                  <MessageSquare className="w-5 h-5 text-luxury-gold mt-1" strokeWidth={1.5} />
                  <div className="flex-1">
                    <p className="text-xs tracking-wide text-luxury-charcoal/60 mb-1 uppercase">Special Requests</p>
                    <p className="text-luxury-charcoal font-light">{bookingSuccess.specialRequests}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="bg-luxury-cream p-8 mb-8">
            <p className="text-xs tracking-wide text-luxury-charcoal/60 mb-4 uppercase">Your Access Code</p>
            <QRCodeDisplay value={`BOOKING:${bookingSuccess.bookingId}`} size={200} />
            <p className="text-sm text-luxury-charcoal/70 font-light mt-4">Present upon arrival</p>
          </div>

          <div className="flex gap-4 mb-8">
            <button
              onClick={handlePrintReceipt}
              className="flex-1 px-8 py-4 border border-luxury-gold text-luxury-charcoal text-center hover:bg-luxury-gold hover:text-luxury-charcoal transition-all duration-500 text-sm tracking-wide flex items-center justify-center gap-2"
            >
              <Printer className="w-4 h-4" />
              Print Receipt
            </button>
            <button
              onClick={handleDownloadReceipt}
              className="flex-1 px-8 py-4 bg-luxury-gold text-luxury-charcoal text-center hover:bg-luxury-gold-light transition-all duration-500 text-sm tracking-wide flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              Download PDF
            </button>
          </div>

          <div className="flex gap-4">
            <Link to="/" className="flex-1 px-8 py-4 bg-luxury-gold text-luxury-charcoal text-center hover:bg-luxury-gold-light transition-all duration-500 text-sm tracking-wide">
              Return Home
            </Link>
            <button
              onClick={() => {
                setBookingSuccess(null);
                setFormData({ name: '', phone: '', date: '', time: '', guestCount: '2', tablePreference: 'Indoor', specialRequests: '' });
              }}
              className="flex-1 px-8 py-4 border border-luxury-gold text-luxury-charcoal text-center hover:bg-luxury-gold hover:text-luxury-charcoal transition-all duration-500 text-sm tracking-wide"
            >
              New Reservation
            </button>
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
          <img src="https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=1920" alt="Reservation" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        <div className="relative z-10 text-center px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
            <p className="text-luxury-gold text-sm tracking-[0.3em] uppercase mb-4">Reserve</p>
            <h1 className="font-serif text-6xl md:text-7xl text-white mb-6">Book Your Table</h1>
            <p className="text-white/80 text-lg max-w-2xl mx-auto font-light">Secure your place at Sri Lanka's finest dining destination</p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-8 py-20">
        <div className="max-w-3xl mx-auto">
          <form onSubmit={handleSubmit} className="bg-white p-12">
            <div className="grid md:grid-cols-2 gap-8">
              {[
                { icon: User, label: 'Full Name', type: 'text', field: 'name' },
                { icon: Phone, label: 'Phone Number', type: 'tel', field: 'phone' },
                { icon: Calendar, label: 'Date', type: 'date', field: 'date' },
                { icon: Clock, label: 'Time', type: 'select', field: 'time' },
                { icon: Users, label: 'Party Size', type: 'number', field: 'guestCount' },
                { icon: MapPin, label: 'Seating Preference', type: 'select', field: 'tablePreference' }
              ].map((item, idx) => (
                <div key={idx}>
                  <label className="flex items-center gap-2 text-luxury-charcoal mb-3 text-sm tracking-wide">
                    <item.icon className="w-4 h-4 text-luxury-gold" strokeWidth={1.5} />
                    {item.label}
                  </label>
                  {item.type === 'select' && item.field === 'time' ? (
                    <select required value={formData.time} onChange={(e) => setFormData({ ...formData, time: e.target.value })} className="w-full px-4 py-3 border border-luxury-charcoal/10 focus:outline-none focus:border-luxury-gold transition-all bg-white text-luxury-charcoal font-light">
                      <option value="">Select time</option>
                      <optgroup label="Breakfast (6:30 AM - 10:30 AM)">
                        {['7:00 AM', '8:00 AM', '9:00 AM', '10:00 AM'].map(t => <option key={t} value={t}>{t}</option>)}
                      </optgroup>
                      <optgroup label="Lunch (12:30 PM - 3:00 PM)">
                        {['12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM'].map(t => <option key={t} value={t}>{t}</option>)}
                      </optgroup>
                      <optgroup label="Dinner (7:00 PM - 10:30 PM)">
                        {['7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM', '9:00 PM'].map(t => <option key={t} value={t}>{t}</option>)}
                      </optgroup>
                    </select>
                  ) : item.type === 'select' ? (
                    <select value={formData.tablePreference} onChange={(e) => setFormData({ ...formData, tablePreference: e.target.value })} className="w-full px-4 py-3 border border-luxury-charcoal/10 focus:outline-none focus:border-luxury-gold transition-all bg-white text-luxury-charcoal font-light">
                      {['Indoor', 'Outdoor', 'VIP'].map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  ) : (
                    <input
                      type={item.type}
                      required={item.field !== 'specialRequests'}
                      value={formData[item.field as keyof typeof formData]}
                      onChange={(e) => setFormData({ ...formData, [item.field]: e.target.value })}
                      min={item.type === 'number' ? '1' : item.type === 'date' ? new Date().toISOString().split('T')[0] : undefined}
                      max={item.type === 'number' ? '20' : undefined}
                      className="w-full px-4 py-3 border border-luxury-charcoal/10 focus:outline-none focus:border-luxury-gold transition-all bg-white text-luxury-charcoal font-light"
                      placeholder={item.type === 'tel' ? '+94 77 123 4567' : ''}
                    />
                  )}
                </div>
              ))}
            </div>

            <div className="mt-8">
              <label className="flex items-center gap-2 text-luxury-charcoal mb-3 text-sm tracking-wide">
                <MessageSquare className="w-4 h-4 text-luxury-gold" strokeWidth={1.5} />
                Special Requests
              </label>
              <textarea
                value={formData.specialRequests}
                onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                rows={4}
                className="w-full px-4 py-3 border border-luxury-charcoal/10 focus:outline-none focus:border-luxury-gold transition-all bg-white text-luxury-charcoal font-light"
                placeholder="Dietary requirements, special occasions, or other preferences"
              ></textarea>
            </div>

            <button type="submit" disabled={isSubmitting} className="w-full mt-10 px-8 py-4 bg-luxury-gold text-luxury-charcoal hover:bg-luxury-gold-light disabled:bg-luxury-charcoal/30 transition-all duration-500 text-sm tracking-wide">
              {isSubmitting ? 'Processing...' : 'Confirm Reservation'}
            </button>

            <p className="text-center text-sm text-luxury-charcoal/60 font-light mt-6">
              Prefer to walk in? <Link to="/queue" className="text-luxury-gold hover:text-luxury-gold-light transition-colors duration-300">Join our virtual queue</Link>
            </p>
          </form>
        </div>
      </div>

      <LuxuryFooter />
    </div>
  );
}

import { useState } from 'react';
import { Calendar, Clock, MapPin, Phone, User, Users, MessageSquare, CheckCircle, Download, Printer } from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import { projectId, publicAnonKey } from '../../../utils/supabase/info';
import { toast } from 'sonner';
import jsPDF from 'jspdf';
import QRCode from 'qrcode';
import QRCodeDisplay from './QRCodeDisplay';
import Navigation from './Navigation';
import Footer from './Footer';

export default function BookingPage() {
  const navigate = useNavigate();
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

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create booking');
      }

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
            <title>Booking Receipt #${bookingSuccess.bookingId}</title>
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
              <div class="logo">Smart Dining</div>
              <div class="sub">Premium Restaurant Experience</div>
              <div class="sub">123 Culinary Hub, Colombo</div>
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
      const doc = new jsPDF({ unit: 'mm', format: [80, 160] });
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
      <>
        <Navigation />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 max-w-2xl w-full text-center">
            <div className="w-20 h-20 bg-green/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-green" />
            </div>
            <h1 className="text-3xl font-bold text-green mb-4">Booking Confirmed!</h1>
            <p className="text-gray-600 mb-8">Your table has been reserved successfully.</p>

            <div id="booking-receipt" className="bg-gold/5 rounded-xl p-6 mb-8 text-left">
              <div className="grid gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gold/10 rounded-lg flex items-center justify-center">
                    <User className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Booking ID</p>
                    <p className="font-bold text-green">{bookingSuccess.bookingId}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gold/10 rounded-lg flex items-center justify-center">
                    <User className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Name</p>
                    <p className="font-bold text-green">{bookingSuccess.name}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gold/10 rounded-lg flex items-center justify-center">
                    <Phone className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-bold text-green">{bookingSuccess.phone || 'N/A'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gold/10 rounded-lg flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Date & Time</p>
                    <p className="font-bold text-green">{bookingSuccess.date} at {bookingSuccess.time}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gold/10 rounded-lg flex items-center justify-center">
                    <Users className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Guests</p>
                    <p className="font-bold text-green">{bookingSuccess.guestCount} people</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gold/10 rounded-lg flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Table Preference</p>
                    <p className="font-bold text-green">{bookingSuccess.tablePreference}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gold/10 rounded-lg flex items-center justify-center">
                    <Clock className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Confirmed At</p>
                    <p className="font-bold text-green">{bookingSuccess.confirmedAt || 'N/A'}</p>
                  </div>
                </div>
                {bookingSuccess.specialRequests && (
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gold/10 rounded-lg flex items-center justify-center">
                      <MessageSquare className="w-5 h-5 text-gold" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Special Requests</p>
                      <p className="font-bold text-green">{bookingSuccess.specialRequests}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-gradient-to-br from-gold/10 to-green/10 rounded-xl p-6 mb-8">
              <h3 className="font-bold text-green mb-4 text-center">Your QR Code</h3>
              <QRCodeDisplay value={`BOOKING:${bookingSuccess.bookingId}`} size={200} />
              <p className="text-sm text-gray-600 text-center mt-4">Show this QR code at the entrance</p>
            </div>

            <div className="bg-green/5 rounded-lg p-4 mb-8 text-sm text-gray-600">
              <p>Please arrive 10 minutes before your reservation time. We'll hold your table for 15 minutes.</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button
                onClick={handlePrintReceipt}
                className="flex-1 px-6 py-3 border border-gold text-gold rounded-lg font-semibold hover:bg-gold hover:text-white transition-all flex items-center justify-center gap-2"
              >
                <Printer className="w-4 h-4" />
                Print Receipt
              </button>
              <button
                onClick={handleDownloadReceipt}
                className="flex-1 px-6 py-3 bg-gold text-white rounded-lg font-semibold hover:bg-gold/90 transition-all flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                Download PDF
              </button>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/" className="flex-1 px-6 py-3 bg-green text-white rounded-lg font-semibold hover:bg-green/90 transition-all">
                Back to Home
              </Link>
              <button
                onClick={() => {
                  setBookingSuccess(null);
                  setFormData({
                    name: '',
                    phone: '',
                    date: '',
                    time: '',
                    guestCount: '2',
                    tablePreference: 'Indoor',
                    specialRequests: ''
                  });
                }}
                className="flex-1 px-6 py-3 bg-gold text-white rounded-lg font-semibold hover:bg-gold/90 transition-all"
              >
                Make Another Booking
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
        {/* Header */}
        <div className="relative bg-gradient-to-r from-green to-green/90 text-white py-20 overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=1920"
              alt="Restaurant Interior"
              className="w-full h-full object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-green/90 to-green/80"></div>
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">Reserve Your Table</h1>
            <p className="text-2xl text-white/90">Guarantee your spot at our premium buffet</p>
          </div>
        </div>

        {/* Booking Form */}
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto">
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Name */}
                <div>
                  <label className="flex items-center gap-2 text-green font-semibold mb-2">
                    <User className="w-4 h-4" />
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gold"
                    placeholder="Enter your name"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="flex items-center gap-2 text-green font-semibold mb-2">
                    <Phone className="w-4 h-4" />
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gold"
                    placeholder="+94 77 123 4567"
                  />
                </div>

                {/* Date */}
                <div>
                  <label className="flex items-center gap-2 text-green font-semibold mb-2">
                    <Calendar className="w-4 h-4" />
                    Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gold"
                  />
                </div>

                {/* Time */}
                <div>
                  <label className="flex items-center gap-2 text-green font-semibold mb-2">
                    <Clock className="w-4 h-4" />
                    Time Slot *
                  </label>
                  <select
                    required
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gold"
                  >
                    <option value="">Select time</option>
                    <optgroup label="Breakfast (6:30 AM - 10:30 AM)">
                      <option value="7:00 AM">7:00 AM</option>
                      <option value="8:00 AM">8:00 AM</option>
                      <option value="9:00 AM">9:00 AM</option>
                      <option value="10:00 AM">10:00 AM</option>
                    </optgroup>
                    <optgroup label="Lunch (12:30 PM - 3:00 PM)">
                      <option value="12:30 PM">12:30 PM</option>
                      <option value="1:00 PM">1:00 PM</option>
                      <option value="1:30 PM">1:30 PM</option>
                      <option value="2:00 PM">2:00 PM</option>
                      <option value="2:30 PM">2:30 PM</option>
                    </optgroup>
                    <optgroup label="Dinner (7:00 PM - 10:30 PM)">
                      <option value="7:00 PM">7:00 PM</option>
                      <option value="7:30 PM">7:30 PM</option>
                      <option value="8:00 PM">8:00 PM</option>
                      <option value="8:30 PM">8:30 PM</option>
                      <option value="9:00 PM">9:00 PM</option>
                    </optgroup>
                  </select>
                </div>

                {/* Guest Count */}
                <div>
                  <label className="flex items-center gap-2 text-green font-semibold mb-2">
                    <Users className="w-4 h-4" />
                    Number of Guests *
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    max="20"
                    value={formData.guestCount}
                    onChange={(e) => setFormData({ ...formData, guestCount: e.target.value })}
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gold"
                  />
                </div>

                {/* Table Preference */}
                <div>
                  <label className="flex items-center gap-2 text-green font-semibold mb-2">
                    <MapPin className="w-4 h-4" />
                    Table Preference
                  </label>
                  <select
                    value={formData.tablePreference}
                    onChange={(e) => setFormData({ ...formData, tablePreference: e.target.value })}
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gold"
                  >
                    <option value="Indoor">Indoor</option>
                    <option value="Outdoor">Outdoor</option>
                    <option value="VIP">VIP Section</option>
                  </select>
                </div>
              </div>

              {/* Special Requests */}
              <div className="mt-6">
                <label className="flex items-center gap-2 text-green font-semibold mb-2">
                  <MessageSquare className="w-4 h-4" />
                  Special Requests
                </label>
                <textarea
                  value={formData.specialRequests}
                  onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gold"
                  placeholder="Any dietary restrictions or special occasions?"
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-8 px-6 py-4 bg-gold hover:bg-gold/90 disabled:bg-gray-300 text-white rounded-lg font-semibold text-lg transition-all shadow-lg hover:shadow-xl"
              >
                {isSubmitting ? 'Processing...' : 'Confirm Reservation'}
              </button>

              <p className="text-center text-sm text-gray-500 mt-4">
                Already have a booking? <Link to="/queue" className="text-gold hover:underline">Join the queue instead</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

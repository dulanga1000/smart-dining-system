import { useState } from 'react';
import { Phone, User, Users, Ticket, CheckCircle, Printer, Download } from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import { projectId, publicAnonKey } from '../../../utils/supabase/info';
import { toast } from 'sonner';
import { motion } from 'motion/react';
import jsPDF from 'jspdf';
import QRCode from 'qrcode';
import QRCodeDisplay from './QRCodeDisplay';
import LuxuryNav from './LuxuryNav';
import LuxuryFooter from './LuxuryFooter';

export default function LuxuryQueuePage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', phone: '', guestCount: '2' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [queueResult, setQueueResult] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-ce9c7d1f/queue/join`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${publicAnonKey}` },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to join queue');
      setQueueResult({
        ...data,
        customerName: formData.name,
        customerPhone: formData.phone,
        guestCount: formData.guestCount,
        joinedAt: new Date().toLocaleString()
      });
      toast.success('Successfully joined the queue!');
    } catch (error: any) {
      toast.error(error.message || 'Failed to join queue');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (queueResult) {
    const handlePrintTicket = () => {
      const printWindow = window.open('', '_blank', 'width=400,height=600');
      if (!printWindow) return;

      printWindow.document.write(`
        <html>
          <head>
            <title>Queue Ticket #${queueResult.ticketNumber}</title>
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
              .big-ticket { font-size: 32px; font-weight: bold; text-align: center; margin: 15px 0; }
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
            <div style="text-align: center; font-size: 14px; margin-bottom: 5px;">VIRTUAL QUEUE TICKET</div>
            <div class="big-ticket">#${queueResult.ticketNumber}</div>
            <div class="divider"></div>
            <div class="row"><span>Name:</span><span>${queueResult.customerName || 'N/A'}</span></div>
            <div class="row"><span>Phone:</span><span>${queueResult.customerPhone || 'N/A'}</span></div>
            <div class="row"><span>Party Size:</span><span>${queueResult.guestCount || 'N/A'}</span></div>
            <div class="row"><span>Time:</span><span>${queueResult.joinedAt || 'N/A'}</span></div>
            <div class="divider"></div>
            <div class="row"><span>Wait Position:</span><span>${queueResult.position}</span></div>
            <div class="row"><span>Est. Wait:</span><span>${queueResult.estimatedWait} min</span></div>
            <div class="divider"></div>
            <div class="qr">
              <img src="${document.querySelector('canvas')?.toDataURL() || ''}" alt="QR Code" />
            </div>
            <div class="footer">
              Keep this ticket safe.<br/>
              Please present when called.<br/>
              Track status in the queue page.
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

    const handleDownloadTicketPdf = async () => {
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

      centerText('VIRTUAL QUEUE TICKET', y, 10, true);
      y += 12;
      centerText(`#${queueResult.ticketNumber}`, y, 24, true);
      y += 10;

      doc.setLineDashPattern([1, 1], 0);
      doc.line(5, y, width - 5, y);
      y += 8;

      doc.setFontSize(9);
      doc.setFont('courier', 'normal');
      doc.text('Name:', 5, y);
      doc.text(queueResult.customerName || 'N/A', width - 5, y, { align: 'right' });
      y += 6;
      doc.text('Phone:', 5, y);
      doc.text(queueResult.customerPhone || 'N/A', width - 5, y, { align: 'right' });
      y += 6;
      doc.text('Party:', 5, y);
      doc.text(queueResult.guestCount ? `${queueResult.guestCount} Guests` : 'N/A', width - 5, y, { align: 'right' });
      y += 6;
      doc.text('Time:', 5, y);
      doc.text(queueResult.joinedAt || 'N/A', width - 5, y, { align: 'right' });

      y += 8;
      doc.setLineDashPattern([1, 1], 0);
      doc.line(5, y, width - 5, y);
      y += 8;

      doc.setFont('courier', 'bold');
      doc.text('Wait Pos:', 5, y);
      doc.text(queueResult.position?.toString() || '0', width - 5, y, { align: 'right' });
      y += 6;
      doc.text('Est. Wait:', 5, y);
      doc.text(`${queueResult.estimatedWait} min`, width - 5, y, { align: 'right' });

      y += 8;
      doc.setLineDashPattern([1, 1], 0);
      doc.line(5, y, width - 5, y);
      y += 10;

      const qrValue = `QUEUE:${queueResult.ticketNumber}`;
      try {
        const qrDataUrl = await QRCode.toDataURL(qrValue, { width: 100, margin: 1 });
        doc.addImage(qrDataUrl, 'PNG', (width - 40) / 2, y, 40, 40);
        y += 45;
      } catch (err) { }

      centerText('Please present this ticket', y, 8);
      y += 4;
      centerText('when called. Thank you!', y, 8);

      doc.save(`Queue_Ticket_${queueResult.ticketNumber}.pdf`);
    };

    return (
      <div className="min-h-screen bg-luxury-ivory flex items-center justify-center p-4">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="bg-white max-w-2xl w-full text-center p-12">
          <div className="w-20 h-20 bg-luxury-gold/10 flex items-center justify-center mx-auto mb-8">
            <CheckCircle className="w-12 h-12 text-luxury-gold" strokeWidth={1.5} />
          </div>
          <p className="text-luxury-gold text-sm tracking-[0.3em] uppercase mb-4">Confirmed</p>
          <h1 className="font-serif text-4xl text-luxury-charcoal mb-6">Queue Joined</h1>
          <p className="text-luxury-charcoal/70 font-light mb-12">Your virtual ticket is ready</p>

          <div id="queue-ticket-receipt" className="bg-luxury-charcoal text-white p-8 mb-8">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Ticket className="w-6 h-6 text-luxury-gold" strokeWidth={1.5} />
              <p className="text-sm uppercase tracking-wide font-light text-luxury-gold">Ticket Number</p>
            </div>
            <p className="text-6xl font-serif mb-4">#{queueResult.ticketNumber}</p>
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="border border-luxury-gold/20 p-4">
                <p className="text-xs tracking-wide mb-1 uppercase font-light text-luxury-gold">Position</p>
                <p className="text-2xl font-light">{queueResult.position}</p>
              </div>
              <div className="border border-luxury-gold/20 p-4">
                <p className="text-xs tracking-wide mb-1 uppercase font-light text-luxury-gold">Est. Wait</p>
                <p className="text-2xl font-light">{queueResult.estimatedWait} min</p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-3 mt-6 text-left">
              <div className="border border-luxury-gold/20 p-4">
                <p className="text-xs tracking-wide uppercase font-light text-luxury-gold mb-1">Name</p>
                <p className="text-base font-light">{queueResult.customerName}</p>
              </div>
              <div className="border border-luxury-gold/20 p-4">
                <p className="text-xs tracking-wide uppercase font-light text-luxury-gold mb-1">Phone</p>
                <p className="text-base font-light">{queueResult.customerPhone}</p>
              </div>
              <div className="border border-luxury-gold/20 p-4">
                <p className="text-xs tracking-wide uppercase font-light text-luxury-gold mb-1">Party Size</p>
                <p className="text-base font-light">{queueResult.guestCount} Guests</p>
              </div>
              <div className="border border-luxury-gold/20 p-4">
                <p className="text-xs tracking-wide uppercase font-light text-luxury-gold mb-1">Joined At</p>
                <p className="text-base font-light">{queueResult.joinedAt}</p>
              </div>
            </div>
          </div>

          <div className="bg-luxury-cream p-8 mb-8">
            <p className="text-xs tracking-wide text-luxury-charcoal/60 mb-4 uppercase">Digital Ticket</p>
            <QRCodeDisplay value={`QUEUE:${queueResult.ticketNumber}`} size={200} />
            <p className="text-sm text-luxury-charcoal/70 font-light mt-4">Present when called</p>
          </div>

          <div className="flex gap-4 mb-8">
            <button
              onClick={handlePrintTicket}
              className="flex-1 px-8 py-4 border border-luxury-gold text-luxury-charcoal text-center hover:bg-luxury-gold hover:text-luxury-charcoal transition-all duration-500 text-sm tracking-wide flex items-center justify-center gap-2"
            >
              <Printer className="w-4 h-4" />
              Print Ticket
            </button>
            <button
              onClick={handleDownloadTicketPdf}
              className="flex-1 px-8 py-4 bg-luxury-gold text-luxury-charcoal text-center hover:bg-luxury-gold-light transition-all duration-500 text-sm tracking-wide flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              Download PDF
            </button>
          </div>

          <div className="flex gap-4">
            <Link to="/" className="flex-1 px-8 py-4 bg-luxury-gold text-luxury-charcoal text-center hover:bg-luxury-gold-light transition-all duration-500 text-sm tracking-wide">Return Home</Link>
            <button onClick={() => navigate('/queue/status')} className="flex-1 px-8 py-4 border border-luxury-gold text-luxury-charcoal text-center hover:bg-luxury-gold hover:text-luxury-charcoal transition-all duration-500 text-sm tracking-wide">Track Status</button>
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
          <img src="https://images.pexels.com/photos/67468/pexels-photo-67468.jpeg?auto=compress&cs=tinysrgb&w=1920" alt="Queue" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        <div className="relative z-10 text-center px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
            <p className="text-luxury-gold text-sm tracking-[0.3em] uppercase mb-4">Virtual Queue</p>
            <h1 className="font-serif text-6xl md:text-7xl text-white mb-6">Join the Queue</h1>
            <p className="text-white/80 text-lg max-w-2xl mx-auto font-light">Reserve your place without the wait</p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-8 py-20">
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="bg-white p-12">
            <h2 className="font-serif text-3xl text-luxury-charcoal mb-8">Request Queue Number</h2>
            <div className="space-y-8">
              {[
                { icon: User, label: 'Full Name', type: 'text', field: 'name' },
                { icon: Phone, label: 'Phone Number', type: 'tel', field: 'phone' },
                { icon: Users, label: 'Party Size', type: 'number', field: 'guestCount' }
              ].map((item, idx) => (
                <div key={idx}>
                  <label className="flex items-center gap-2 text-luxury-charcoal mb-3 text-sm tracking-wide">
                    <item.icon className="w-4 h-4 text-luxury-gold" strokeWidth={1.5} />
                    {item.label}
                  </label>
                  <input
                    type={item.type}
                    required
                    value={formData[item.field as keyof typeof formData]}
                    onChange={(e) => setFormData({ ...formData, [item.field]: e.target.value })}
                    min={item.type === 'number' ? '1' : undefined}
                    max={item.type === 'number' ? '20' : undefined}
                    className="w-full px-4 py-3 border border-luxury-charcoal/10 focus:outline-none focus:border-luxury-gold transition-all bg-white text-luxury-charcoal font-light"
                    placeholder={item.type === 'tel' ? '+94 77 123 4567' : ''}
                  />
                </div>
              ))}
            </div>
            <button type="submit" disabled={isSubmitting} className="w-full mt-10 px-8 py-4 bg-luxury-gold text-luxury-charcoal hover:bg-luxury-gold-light disabled:bg-luxury-charcoal/30 transition-all duration-500 text-sm tracking-wide">
              {isSubmitting ? 'Processing...' : 'Join Queue'}
            </button>
            <p className="text-center text-sm text-luxury-charcoal/60 font-light mt-6">
              Prefer to reserve? <Link to="/booking" className="text-luxury-gold hover:text-luxury-gold-light transition-colors duration-300">Book a table</Link>
            </p>
          </form>
        </div>
      </div>
      <LuxuryFooter />
    </div>
  );
}

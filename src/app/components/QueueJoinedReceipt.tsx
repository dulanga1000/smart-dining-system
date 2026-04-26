import React from 'react';
import jsPDF from 'jspdf';
import QRCode from 'qrcode';

interface QueueJoinedReceiptProps {
  queueNumber: string;
  name: string;
  phone: string;
  joinTime: string;
}

const QueueJoinedReceipt: React.FC<QueueJoinedReceiptProps> = ({ queueNumber, name, phone, joinTime }) => {
  // Print handler
  const handlePrint = () => {
    const printWindow = window.open('', '_blank', 'width=400,height=600');
    if (!printWindow) return;

    printWindow.document.write(`
      <html>
        <head>
          <title>Queue Ticket #${queueNumber}</title>
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
          <div style="text-align: center; font-size: 14px; margin-bottom: 5px;">QUEUE TICKET</div>
          <div class="big-ticket">#${queueNumber}</div>
          <div class="divider"></div>
          <div class="row"><span>Name:</span><span>${name}</span></div>
          <div class="row"><span>Phone:</span><span>${phone}</span></div>
          <div class="row"><span>Time:</span><span>${joinTime}</span></div>
          <div class="divider"></div>
          <div class="qr">
            <img src="${document.querySelector('canvas')?.toDataURL() || ''}" alt="QR Code" />
          </div>
          <div class="footer">
            Please present this ticket when called.<br/>
            Thank you for waiting!
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    // Use timeout to allow image rendering
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 250);
  };

  // Download handler
  const handleDownload = async () => {
    // Thermal receipt style width 80mm
    const doc = new jsPDF({ unit: 'mm', format: [80, 150] });
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

    centerText('QUEUE TICKET', y, 10, true);
    y += 12;
    centerText(`#${queueNumber}`, y, 24, true);
    y += 10;

    doc.setLineDashPattern([1, 1], 0);
    doc.line(5, y, width - 5, y);
    y += 8;

    doc.setFontSize(9);
    doc.setFont('courier', 'normal');
    doc.text('Name:', 5, y);
    doc.text(name || 'N/A', width - 5, y, { align: 'right' });
    y += 6;
    doc.text('Phone:', 5, y);
    doc.text(phone || 'N/A', width - 5, y, { align: 'right' });
    y += 6;
    doc.text('Time:', 5, y);
    doc.text(joinTime || 'N/A', width - 5, y, { align: 'right' });

    y += 8;
    doc.setLineDashPattern([1, 1], 0);
    doc.line(5, y, width - 5, y);
    y += 10;

    const qrValue = `QUEUE:${queueNumber}`;
    try {
      const qrDataUrl = await QRCode.toDataURL(qrValue, { width: 100, margin: 1 });
      doc.addImage(qrDataUrl, 'PNG', (width - 40) / 2, y, 40, 40);
      y += 45;
    } catch (err) {
      // ignore
    }

    centerText('Please present this ticket', y, 8);
    y += 4;
    centerText('when called. Thank you!', y, 8);

    doc.save(`Queue_Ticket_${queueNumber}.pdf`);
  };

  return (
    <div className="min-h-screen bg-luxury-ivory flex items-center justify-center p-4">
      <div className="bg-white max-w-md w-full text-center p-8" id="queue-receipt">
        <h1 className="font-serif text-3xl text-luxury-charcoal mb-4">Queue Joined</h1>
        <p className="text-luxury-gold text-lg mb-2">Queue Number: <span className="font-bold">{queueNumber}</span></p>
        <div className="mb-4">
          <QRCodeCanvas value={`QUEUE:${queueNumber} `} size={120} />
        </div>
        <div className="text-left mb-6">
          <p><span className="font-medium">Name:</span> {name}</p>
          <p><span className="font-medium">Phone:</span> {phone}</p>
          <p><span className="font-medium">Join Time:</span> {joinTime}</p>
        </div>
      </div>
      <div className="flex gap-4 mt-6">
        <button
          onClick={handlePrint}
          className="flex-1 px-8 py-4 bg-luxury-gold text-luxury-charcoal text-center hover:bg-luxury-gold-light transition-all duration-500 text-sm tracking-wide"
        >
          Print Receipt
        </button>
        <button
          onClick={handleDownload}
          className="flex-1 px-8 py-4 border border-luxury-gold text-luxury-charcoal text-center hover:bg-luxury-gold hover:text-luxury-charcoal transition-all duration-500 text-sm tracking-wide"
        >
          Download PDF
        </button>
      </div>
    </div>
  );
};

// Use a simple QR code canvas for display
import { QRCodeCanvas } from 'qrcode.react';

export default QueueJoinedReceipt;

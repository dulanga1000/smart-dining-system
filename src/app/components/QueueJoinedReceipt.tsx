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
    const printContents = document.getElementById('queue-receipt')?.innerHTML;
    const originalContents = document.body.innerHTML;
    if (printContents) {
      document.body.innerHTML = printContents;
      window.print();
      document.body.innerHTML = originalContents;
      window.location.reload();
    }
  };

  // Download handler
  const handleDownload = async () => {
    const doc = new jsPDF();
    let y = 10;
    doc.setFontSize(18);
    doc.text('Queue Joined Receipt', 10, y);
    y += 10;
    doc.setFontSize(12);
    doc.text(`Queue Number: ${queueNumber}`, 10, y);
    y += 8;
    doc.text(`Name: ${name}`, 10, y);
    y += 8;
    doc.text(`Phone: ${phone}`, 10, y);
    y += 8;
    doc.text(`Join Time: ${joinTime}`, 10, y);
    y += 8;
    // Generate QR code for queue ticket
    const qrValue = `QUEUE:${queueNumber}`;
    try {
      const qrDataUrl = await QRCode.toDataURL(qrValue, { width: 100, margin: 1 });
      doc.addImage(qrDataUrl, 'PNG', 150, 10, 40, 40);
    } catch (err) {
      // QR code generation failed, skip
    }
    y += 48;
    doc.save(`Queue_Receipt_${queueNumber}.pdf`);
  };

  return (
    <div className="min-h-screen bg-luxury-ivory flex items-center justify-center p-4">
      <div className="bg-white max-w-md w-full text-center p-8" id="queue-receipt">
        <h1 className="font-serif text-3xl text-luxury-charcoal mb-4">Queue Joined</h1>
        <p className="text-luxury-gold text-lg mb-2">Queue Number: <span className="font-bold">{queueNumber}</span></p>
        <div className="mb-4">
          <QRCodeCanvas value={`QUEUE:${queueNumber}`} size={120} />
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

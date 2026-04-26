import { useState } from 'react';
import { Phone, User, Users, Ticket, CheckCircle, Download } from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import { projectId, publicAnonKey } from '/utils/supabase/info';
import { toast } from 'sonner';
import QRCodeDisplay from './QRCodeDisplay';
import Navigation from './Navigation';
import Footer from './Footer';

export default function QueuePage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    guestCount: '2'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [queueResult, setQueueResult] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-ce9c7d1f/queue/join`,
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
        throw new Error(data.error || 'Failed to join queue');
      }

      setQueueResult(data);
      toast.success('Successfully joined the queue!');
    } catch (error: any) {
      console.error('Queue join error:', error);
      toast.error(error.message || 'Failed to join queue');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (queueResult) {
    return (
      <>
        <Navigation />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 max-w-2xl w-full text-center">
          <div className="w-20 h-20 bg-green/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green" />
          </div>
          <h1 className="text-3xl font-bold text-green mb-4">You're in the Queue!</h1>
          <p className="text-gray-600 mb-8">Your virtual ticket has been generated.</p>

          <div className="bg-gradient-to-br from-gold to-gold/80 text-white rounded-2xl p-8 mb-8 shadow-xl">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Ticket className="w-6 h-6" />
              <p className="text-sm uppercase tracking-wide opacity-90">Your Ticket Number</p>
            </div>
            <p className="text-6xl font-bold mb-4">#{queueResult.ticketNumber}</p>
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="bg-white/20 rounded-lg p-3">
                <p className="text-xs opacity-90 mb-1">Position</p>
                <p className="text-2xl font-bold">{queueResult.position}</p>
              </div>
              <div className="bg-white/20 rounded-lg p-3">
                <p className="text-xs opacity-90 mb-1">Est. Wait</p>
                <p className="text-2xl font-bold">{queueResult.estimatedWait} min</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 mb-8 shadow-lg">
            <h3 className="font-bold text-green mb-4 text-center">Your Digital Ticket</h3>
            <QRCodeDisplay value={`QUEUE:${queueResult.ticketNumber}`} size={200} />
            <p className="text-sm text-gray-600 text-center mt-4">Show this QR code when your number is called</p>
          </div>

          <div className="bg-green/5 rounded-lg p-4 mb-8 text-sm text-gray-600 text-left">
            <p className="font-semibold mb-2">Important Information:</p>
            <ul className="space-y-1 list-disc list-inside">
              <li>Keep this ticket number safe</li>
              <li>You'll receive a notification when your turn is near</li>
              <li>Please arrive within 5 minutes when called</li>
              <li>Track your position in real-time on the status page</li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/" className="flex-1 px-6 py-3 bg-gray-100 text-green rounded-lg font-semibold hover:bg-gray-200 transition-all">
              Back to Home
            </Link>
            <button
              onClick={() => navigate('/queue/status')}
              className="flex-1 px-6 py-3 bg-gold text-white rounded-lg font-semibold hover:bg-gold/90 transition-all shadow-lg"
            >
              Track Queue Status
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
        <div className="relative bg-gradient-to-r from-gold to-gold/80 text-white py-20 overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="https://images.pexels.com/photos/67468/pexels-photo-67468.jpeg?auto=compress&cs=tinysrgb&w=1920"
              alt="Queue System"
              className="w-full h-full object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-gold/90 to-gold/70"></div>
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">Join Virtual Queue</h1>
            <p className="text-2xl text-white/90">Skip the physical line and dine stress-free</p>
          </div>
        </div>

      {/* Benefits */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-xl p-6 shadow-md">
            <div className="w-12 h-12 bg-gold/10 rounded-lg flex items-center justify-center mb-4">
              <Ticket className="w-6 h-6 text-gold" />
            </div>
            <h3 className="font-bold text-green mb-2">Instant Ticket</h3>
            <p className="text-gray-600 text-sm">Get your queue number immediately</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-md">
            <div className="w-12 h-12 bg-gold/10 rounded-lg flex items-center justify-center mb-4">
              <CheckCircle className="w-6 h-6 text-gold" />
            </div>
            <h3 className="font-bold text-green mb-2">Real-Time Updates</h3>
            <p className="text-gray-600 text-sm">Track your position live</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-md">
            <div className="w-12 h-12 bg-gold/10 rounded-lg flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-gold" />
            </div>
            <h3 className="font-bold text-green mb-2">No Physical Wait</h3>
            <p className="text-gray-600 text-sm">Relax while you wait</p>
          </div>
        </div>

        {/* Queue Form */}
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-green mb-6">Get Your Queue Number</h2>

            <div className="space-y-6">
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
                <p className="text-xs text-gray-500 mt-1">We'll notify you when your turn is near</p>
              </div>

              {/* Guest Count */}
              <div>
                <label className="flex items-center gap-2 text-green font-semibold mb-2">
                  <Users className="w-4 h-4" />
                  Number of Guests *
                </label>
                <div className="grid grid-cols-4 gap-3">
                  {[1, 2, 3, 4].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setFormData({ ...formData, guestCount: num.toString() })}
                      className={`py-3 rounded-lg font-semibold transition-all ${
                        formData.guestCount === num.toString()
                          ? 'bg-gold text-white'
                          : 'bg-gray-100 text-green hover:bg-gray-200'
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
                <input
                  type="number"
                  min="1"
                  max="20"
                  value={formData.guestCount}
                  onChange={(e) => setFormData({ ...formData, guestCount: e.target.value })}
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gold mt-3"
                  placeholder="Or enter custom number"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-8 px-6 py-4 bg-gold hover:bg-gold/90 disabled:bg-gray-300 text-white rounded-lg font-semibold text-lg transition-all shadow-lg hover:shadow-xl"
            >
              {isSubmitting ? 'Joining Queue...' : 'Join Queue Now'}
            </button>

            <p className="text-center text-sm text-gray-500 mt-4">
              Prefer to book in advance? <Link to="/booking" className="text-gold hover:underline">Make a reservation</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
}

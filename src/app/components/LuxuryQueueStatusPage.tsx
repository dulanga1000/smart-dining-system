import { useState, useEffect } from 'react';
import { Users, Ticket, Activity, Clock, RefreshCw } from 'lucide-react';
import { Link } from 'react-router';
import { motion } from 'motion/react';
import { projectId, publicAnonKey } from '/utils/supabase/info';
import { toast } from 'sonner';
import LuxuryNav from './LuxuryNav';
import LuxuryFooter from './LuxuryFooter';

export default function LuxuryQueueStatusPage() {
  const [queueState, setQueueState] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchQueueStatus = async () => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-ce9c7d1f/queue`,
        { headers: { 'Authorization': `Bearer ${publicAnonKey}` } }
      );
      const data = await response.json();
      setQueueState(data);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch queue status:', error);
      toast.error('Failed to load queue status');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQueueStatus();
    const interval = setInterval(fetchQueueStatus, 3000);
    return () => clearInterval(interval);
  }, []);

  const waitingQueue = queueState?.queue?.filter((q: any) => q.status === 'waiting') || [];
  const servingQueue = queueState?.queue?.filter((q: any) => q.status === 'serving') || [];

  if (loading) {
    return (
      <div className="min-h-screen bg-luxury-ivory flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-16 h-16 text-luxury-gold animate-spin mx-auto mb-4" />
          <p className="text-luxury-charcoal font-light">Loading queue status...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-luxury-ivory">
      <LuxuryNav />

      <section className="relative h-[40vh] flex items-center justify-center overflow-hidden mt-20">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1556740758-90de374c12ad?w=1920"
            alt="Queue Status"
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
            <p className="text-luxury-gold text-sm tracking-[0.3em] uppercase mb-4">Live Updates</p>
            <h1 className="font-serif text-6xl md:text-7xl text-white mb-6">Queue Status</h1>
            <p className="text-white/80 text-lg font-light">Real-time queue information</p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-16 max-w-5xl mx-auto">
            {[
              { icon: Users, label: 'In Queue', value: waitingQueue.length },
              { icon: Ticket, label: 'Now Serving', value: `#${queueState?.currentServing || 0}` },
              { icon: Clock, label: 'Avg Wait Time', value: `${waitingQueue.length * 5} min` }
            ].map((stat, idx) => (
              <div key={idx} className="bg-luxury-cream p-8 text-center">
                <stat.icon className="w-12 h-12 mx-auto mb-4 text-luxury-gold" strokeWidth={1} />
                <p className="text-sm tracking-wide text-luxury-charcoal/60 mb-2 uppercase">{stat.label}</p>
                <p className="text-4xl font-serif text-luxury-charcoal">{stat.value}</p>
              </div>
            ))}
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="bg-luxury-charcoal text-white p-12 mb-12 text-center">
              <div className="flex items-center justify-center gap-3 mb-6">
                <Activity className="w-8 h-8 text-luxury-gold animate-pulse" />
                <h2 className="font-serif text-3xl">Now Serving</h2>
              </div>
              <p className="text-8xl font-serif mb-6">#{queueState?.currentServing || 0}</p>
              {servingQueue.length > 0 && (
                <div className="bg-luxury-charcoal p-6 inline-block">
                  <p className="text-xl font-light">{servingQueue[0]?.name}</p>
                  <p className="text-luxury-gold/70 text-sm mt-2">Party of {servingQueue[0]?.guestCount}</p>
                </div>
              )}
            </div>

            <div className="bg-luxury-cream p-12">
              <h3 className="font-serif text-2xl text-luxury-charcoal mb-8 flex items-center gap-3">
                <Ticket className="w-6 h-6 text-luxury-gold" />
                Waiting Queue ({waitingQueue.length})
              </h3>
              
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {waitingQueue.map((customer: any, index: number) => (
                  <div key={customer.ticketNumber} className="flex items-center justify-between p-6 bg-white border border-luxury-gold/20">
                    <div className="flex items-center gap-6">
                      <div className="w-16 h-16 bg-luxury-gold text-luxury-charcoal flex items-center justify-center font-serif text-xl">
                        #{customer.ticketNumber}
                      </div>
                      <div>
                        <p className="font-serif text-lg text-luxury-charcoal">{customer.name}</p>
                        <p className="text-sm text-luxury-charcoal/60 font-light">
                          {customer.phone} • {customer.guestCount} guests
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="px-4 py-2 bg-luxury-gold/10 text-luxury-gold text-sm tracking-wide">
                        Position: {index + 1}
                      </span>
                    </div>
                  </div>
                ))}
                {waitingQueue.length === 0 && (
                  <p className="text-center text-luxury-charcoal/60 py-12 font-light">No customers waiting</p>
                )}
              </div>
            </div>

            <div className="text-center mt-12">
              <Link
                to="/queue"
                className="inline-flex items-center gap-3 px-12 py-5 bg-luxury-gold text-luxury-charcoal hover:bg-luxury-gold-light transition-all duration-500"
              >
                <span className="tracking-wide">Join Queue Now</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <LuxuryFooter />
    </div>
  );
}

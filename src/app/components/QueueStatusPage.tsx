import LuxuryNav from './LuxuryNav';
import LuxuryFooter from './LuxuryFooter';
import { useState, useEffect } from 'react';
import { Activity, Clock, Users, Ticket, Bell, TrendingDown } from 'lucide-react';
import { Link } from 'react-router';
import { toast } from 'sonner';
import Navigation from './Navigation';
import Footer from './Footer';

import { projectId, publicAnonKey } from '../../../utils/supabase/info';

export default function QueueStatusPage() {
  const [queueState, setQueueState] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  const fetchQueueStatus = async () => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-ce9c7d1f/queue`,
        {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`
          }
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch queue status');
      }

      const data = await response.json();
      setQueueState(data);
      setLastUpdate(new Date());
      setLoading(false);
    } catch (error: any) {
      console.error('Queue fetch error:', error);
      toast.error('Failed to fetch queue status');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQueueStatus();
    const interval = setInterval(fetchQueueStatus, 3000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading queue status...</p>
        </div>
      </div>
    );
  }

  const waitingQueue = queueState?.queue?.filter((q: any) => q.status === 'waiting') || [];
  const servingQueue = queueState?.queue?.filter((q: any) => q.status === 'serving') || [];

  return (
    <>
      <LuxuryNav />
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="relative bg-gradient-to-r from-green to-green/90 text-white py-16 overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1556740758-90de374c12ad?w=1920"
              alt="Live Queue Monitoring"
              className="w-full h-full object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-green/90 to-green/80"></div>
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h1 className="text-5xl md:text-6xl font-bold mb-4">Live Queue Status</h1>
                <div className="flex items-center gap-2 text-white/90">
                  <Activity className="w-5 h-5 animate-pulse" />
                  <p className="text-lg">Auto-refreshing every 3 seconds</p>
                </div>
              </div>
              <div className="text-right bg-white/10 backdrop-blur-sm rounded-xl px-6 py-4">
                <p className="text-sm text-white/80">Last Updated</p>
                <p className="font-bold text-xl">{lastUpdate.toLocaleTimeString()}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Current Serving Display */}
        <div className="bg-gold text-white py-12">
          <div className="container mx-auto px-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Bell className="w-6 h-6 animate-bounce" />
              <p className="text-lg uppercase tracking-wide">Now Serving</p>
            </div>
            <div className="text-8xl font-bold mb-4">
              #{queueState?.currentServing || 0}
            </div>
            {servingQueue.length > 0 && (
              <p className="text-xl opacity-90">
                {servingQueue[0]?.name} - Party of {servingQueue[0]?.guestCount}
              </p>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="container mx-auto px-4 -mt-8 relative z-10">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm mb-1">People Waiting</p>
                  <p className="text-3xl font-bold text-green">{waitingQueue.length}</p>
                </div>
                <div className="w-12 h-12 bg-green/10 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-green" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm mb-1">Avg. Wait Time</p>
                  <p className="text-3xl font-bold text-green">{waitingQueue.length * 5} min</p>
                </div>
                <div className="w-12 h-12 bg-gold/10 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-gold" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm mb-1">Status</p>
                  <p className="text-xl font-bold text-green">
                    {waitingQueue.length > 10 ? 'Busy' : waitingQueue.length > 5 ? 'Moderate' : 'Available'}
                  </p>
                </div>
                <div className="w-12 h-12 bg-gold/10 rounded-lg flex items-center justify-center">
                  <TrendingDown className="w-6 h-6 text-gold" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Queue List */}
        <div className="container mx-auto px-4 py-12">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-green mb-6 flex items-center gap-2">
              <Ticket className="w-6 h-6" />
              Queue Details
            </h2>

            {waitingQueue.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-10 h-10 text-green" />
                </div>
                <h3 className="text-xl font-bold text-green mb-2">No One Waiting</h3>
                <p className="text-gray-600 mb-6">Perfect time to join the queue!</p>
                <Link to="/queue" className="inline-block px-6 py-3 bg-gold text-white rounded-lg font-semibold hover:bg-gold/90 transition-all">
                  Join Queue Now
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {waitingQueue.map((customer: any, index: number) => {
                  const estimatedTime = (index + 1) * 5;
                  return (
                    <div
                      key={customer.ticketNumber}
                      className="flex items-center justify-between p-4 rounded-lg border-2 hover:border-gold transition-all"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gold/10 rounded-lg flex items-center justify-center">
                          <span className="font-bold text-gold text-lg">#{customer.ticketNumber}</span>
                        </div>
                        <div>
                          <p className="font-semibold text-green">{customer.name}</p>
                          <p className="text-sm text-gray-500">Party of {customer.guestCount}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="inline-block px-3 py-1 bg-gold/10 rounded-full mb-1">
                          <span className="text-sm font-semibold text-gold">Position: {index + 1}</span>
                        </div>
                        <p className="text-xs text-gray-500">~{estimatedTime} min wait</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Next Customers Preview */}
          {waitingQueue.length > 0 && (
            <div className="mt-8 bg-gradient-to-r from-green/10 to-gold/10 rounded-xl p-6">
              <h3 className="font-bold text-green mb-4 flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Up Next
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                {waitingQueue.slice(0, 3).map((customer: any, index: number) => (
                  <div key={customer.ticketNumber} className="bg-white rounded-lg p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gold rounded-lg flex items-center justify-center text-white font-bold">
                        #{customer.ticketNumber}
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-sm text-green">{customer.name}</p>
                        <p className="text-xs text-gray-500">{(index + 1) * 5} min</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-br from-green to-green/90 text-white py-16 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold rounded-full blur-3xl"></div>
          </div>
          <div className="container mx-auto px-4 text-center relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Want to Skip the Queue?</h2>
            <p className="text-xl mb-8 text-white/90">Book a table in advance for guaranteed seating</p>
            <Link to="/booking" className="inline-block px-10 py-5 bg-gold hover:bg-gold/90 text-white rounded-xl font-bold text-lg transition-all shadow-2xl hover:shadow-gold/50">
              Reserve Table Now
            </Link>
          </div>
        </div>
      </div>
      <LuxuryFooter />
    </>
  );
}

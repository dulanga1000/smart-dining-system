import { useState, useEffect } from 'react';
import { Users, Ticket, Calendar, TrendingUp, Bell, CheckCircle, XCircle, Clock, Activity } from 'lucide-react';
import { Link } from 'react-router';
import { projectId, publicAnonKey } from '/utils/supabase/info';
import { toast } from 'sonner';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Navigation from './Navigation';
import Footer from './Footer';

export default function AdminDashboard() {
  const [queueState, setQueueState] = useState<any>(null);
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalInQueue: 0,
    totalBookings: 0,
    avgWaitTime: 0,
    currentStatus: 'Free'
  });

  const fetchData = async () => {
    try {
      const [queueRes, bookingsRes, statusRes] = await Promise.all([
        fetch(`https://${projectId}.supabase.co/functions/v1/make-server-ce9c7d1f/queue`, {
          headers: { 'Authorization': `Bearer ${publicAnonKey}` }
        }),
        fetch(`https://${projectId}.supabase.co/functions/v1/make-server-ce9c7d1f/bookings`, {
          headers: { 'Authorization': `Bearer ${publicAnonKey}` }
        }),
        fetch(`https://${projectId}.supabase.co/functions/v1/make-server-ce9c7d1f/status`, {
          headers: { 'Authorization': `Bearer ${publicAnonKey}` }
        })
      ]);

      const queueData = await queueRes.json();
      const bookingsData = await bookingsRes.json();
      const statusData = await statusRes.json();

      setQueueState(queueData);
      setBookings(bookingsData);

      const waitingQueue = queueData?.queue?.filter((q: any) => q.status === 'waiting') || [];
      setStats({
        totalInQueue: waitingQueue.length,
        totalBookings: bookingsData.length,
        avgWaitTime: waitingQueue.length * 5,
        currentStatus: statusData.status
      });

      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
      toast.error('Failed to load dashboard data');
      setLoading(false);
    }
  };

  const handleNextCustomer = async () => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-ce9c7d1f/queue/next`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`
          }
        }
      );

      if (!response.ok) throw new Error('Failed to advance queue');

      toast.success('Queue advanced to next customer');
      fetchData();
    } catch (error: any) {
      console.error('Error advancing queue:', error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  const waitingQueue = queueState?.queue?.filter((q: any) => q.status === 'waiting') || [];
  const servingQueue = queueState?.queue?.filter((q: any) => q.status === 'serving') || [];

  // Analytics Data
  const hourlyData = [
    { hour: '7AM', customers: 12 },
    { hour: '8AM', customers: 25 },
    { hour: '9AM', customers: 18 },
    { hour: '10AM', customers: 8 },
    { hour: '12PM', customers: 35 },
    { hour: '1PM', customers: 42 },
    { hour: '2PM', customers: 28 },
    { hour: '7PM', customers: 45 },
    { hour: '8PM', customers: 38 },
    { hour: '9PM', customers: 22 }
  ];

  const statusData = [
    { name: 'Waiting', value: waitingQueue.length, color: '#C9A227' },
    { name: 'Serving', value: servingQueue.length, color: '#1F3B2C' },
    { name: 'Completed', value: queueState?.queue?.filter((q: any) => q.status === 'completed').length || 0, color: '#10b981' }
  ];

  const bookingsByTime = [
    { time: 'Breakfast', count: bookings.filter(b => ['7:00 AM', '8:00 AM', '9:00 AM', '10:00 AM'].includes(b.time)).length },
    { time: 'Lunch', count: bookings.filter(b => ['12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM'].includes(b.time)).length },
    { time: 'Dinner', count: bookings.filter(b => ['7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM', '9:00 PM'].includes(b.time)).length }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="relative bg-gradient-to-r from-green to-green/90 text-white py-16 overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1920"
              alt="Dashboard Analytics"
              className="w-full h-full object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-green/90 to-green/80"></div>
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h1 className="text-5xl md:text-6xl font-bold mb-4">Admin Dashboard</h1>
                <p className="text-xl text-white/90">Restaurant Management Console</p>
              </div>
              <Link to="/" className="px-8 py-4 bg-white text-green rounded-xl font-bold hover:bg-gray-50 transition-all shadow-lg">
                Back to Site
              </Link>
            </div>
          </div>
        </div>

      {/* Stats Grid */}
      <div className="container mx-auto px-4 -mt-8">
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm mb-1">In Queue</p>
                <p className="text-3xl font-bold text-green">{stats.totalInQueue}</p>
              </div>
              <div className="w-12 h-12 bg-gold/10 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-gold" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm mb-1">Total Bookings</p>
                <p className="text-3xl font-bold text-green">{stats.totalBookings}</p>
              </div>
              <div className="w-12 h-12 bg-gold/10 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-gold" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm mb-1">Avg Wait Time</p>
                <p className="text-3xl font-bold text-green">{stats.avgWaitTime} min</p>
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
                <p className="text-2xl font-bold text-green">{stats.currentStatus}</p>
              </div>
              <div className="w-12 h-12 bg-gold/10 rounded-lg flex items-center justify-center">
                <Activity className="w-6 h-6 text-gold" />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Queue Management */}
          <div className="lg:col-span-2 space-y-6">
            {/* Current Serving */}
            <div className="bg-gradient-to-r from-gold to-gold/80 text-white rounded-2xl p-8 shadow-xl">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Now Serving</h2>
                <Bell className="w-6 h-6 animate-bounce" />
              </div>
              <div className="text-center">
                <p className="text-7xl font-bold mb-4">#{queueState?.currentServing || 0}</p>
                {servingQueue.length > 0 && (
                  <div className="bg-white/20 rounded-lg p-4">
                    <p className="text-xl font-semibold">{servingQueue[0]?.name}</p>
                    <p className="opacity-90">Party of {servingQueue[0]?.guestCount}</p>
                  </div>
                )}
              </div>
              <button
                onClick={handleNextCustomer}
                className="w-full mt-6 px-6 py-4 bg-white text-gold rounded-lg font-bold text-lg hover:bg-gray-50 transition-all shadow-lg"
              >
                Call Next Customer
              </button>
            </div>

            {/* Queue List */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-green mb-4 flex items-center gap-2">
                <Ticket className="w-5 h-5" />
                Waiting Queue ({waitingQueue.length})
              </h3>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {waitingQueue.map((customer: any, index: number) => (
                  <div key={customer.ticketNumber} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gold rounded-lg flex items-center justify-center text-white font-bold">
                        #{customer.ticketNumber}
                      </div>
                      <div>
                        <p className="font-semibold text-green">{customer.name}</p>
                        <p className="text-sm text-gray-500">{customer.phone} • {customer.guestCount} guests</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="px-3 py-1 bg-gold/10 text-gold rounded-full text-sm font-semibold">
                        Pos: {index + 1}
                      </span>
                    </div>
                  </div>
                ))}
                {waitingQueue.length === 0 && (
                  <p className="text-center text-gray-500 py-8">No customers waiting</p>
                )}
              </div>
            </div>

            {/* Analytics Charts */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-green mb-6 flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Customer Traffic Today
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={hourlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="hour" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="customers" stroke="#C9A227" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Queue Status Distribution */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-green mb-4">Queue Distribution</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie data={statusData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                      {statusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-green mb-4">Bookings by Meal</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={bookingsByTime}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#1F3B2C" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Right Column - Bookings */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-4">
              <h3 className="text-xl font-bold text-green mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Today's Bookings ({bookings.length})
              </h3>
              <div className="space-y-3 max-h-[800px] overflow-y-auto">
                {bookings.slice(0, 20).map((booking: any) => (
                  <div key={booking.bookingId} className="p-4 bg-gradient-to-br from-green/5 to-gold/5 rounded-lg border border-green/20">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-green text-sm">{booking.bookingId}</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        booking.status === 'confirmed' ? 'bg-green/10 text-green' : 'bg-gray-100 text-gray-600'
                      }`}>
                        {booking.status}
                      </span>
                    </div>
                    <p className="font-semibold text-green mb-1">{booking.name}</p>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p>📞 {booking.phone}</p>
                      <p>🕒 {booking.date} at {booking.time}</p>
                      <p>👥 {booking.guestCount} guests • {booking.tablePreference}</p>
                      {booking.specialRequests && (
                        <p className="text-xs italic mt-2">Note: {booking.specialRequests}</p>
                      )}
                    </div>
                  </div>
                ))}
                {bookings.length === 0 && (
                  <p className="text-center text-gray-500 py-8">No bookings today</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
}

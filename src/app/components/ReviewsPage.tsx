import LuxuryNav from './LuxuryNav';
import LuxuryFooter from './LuxuryFooter';
import { useState, useEffect } from 'react';
import { Star, Send, ThumbsUp, MessageCircle } from 'lucide-react';
import { Link } from 'react-router';
import { projectId, publicAnonKey } from '/utils/supabase/info';
import { toast } from 'sonner';
import Navigation from './Navigation';
import Footer from './Footer';

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    rating: 5,
    title: '',
    comment: '',
    visitDate: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hoveredRating, setHoveredRating] = useState(0);

  const fetchReviews = async () => {
    try {
      const reviewsData = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-ce9c7d1f/reviews`,
        {
          headers: { 'Authorization': `Bearer ${publicAnonKey}` }
        }
      );
      const data = await reviewsData.json();
      setReviews(data);
    } catch (error) {
      console.error('Failed to fetch reviews:', error);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-ce9c7d1f/reviews`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`
          },
          body: JSON.stringify(formData)
        }
      );

      if (!response.ok) {
        throw new Error('Failed to submit review');
      }

      toast.success('Thank you for your review!');
      setFormData({
        name: '',
        email: '',
        rating: 5,
        title: '',
        comment: '',
        visitDate: ''
      });
      fetchReviews();
    } catch (error: any) {
      console.error('Review submission error:', error);
      toast.error(error.message || 'Failed to submit review');
    } finally {
      setIsSubmitting(false);
    }
  };

  const avgRating = reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : '5.0';

  const ratingDistribution = [5, 4, 3, 2, 1].map(rating => ({
    rating,
    count: reviews.filter(r => r.rating === rating).length,
    percentage: reviews.length > 0 ? (reviews.filter(r => r.rating === rating).length / reviews.length) * 100 : 0
  }));

  return (
    <div className="min-h-screen bg-white">
      <LuxuryNav />

      {/* Header */}
      <div className="relative bg-gradient-to-r from-gold to-gold/80 text-white py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920"
            alt="Dining Experience"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gold/90 to-gold/70"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 flex items-center gap-4">
            <MessageCircle className="w-12 h-12" />
            Guest Reviews
          </h1>
          <p className="text-2xl text-white/90">Share your dining experience with us</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Stats & Review Form */}
          <div className="lg:col-span-1 space-y-6">
            {/* Rating Summary */}
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
              <div className="text-6xl font-bold text-green mb-2">{avgRating}</div>
              <div className="flex justify-center mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-6 h-6 text-gold fill-gold" />
                ))}
              </div>
              <p className="text-gray-600">Based on {reviews.length} reviews</p>

              <div className="mt-6 space-y-2">
                {ratingDistribution.map(({ rating, count, percentage }) => (
                  <div key={rating} className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-green w-8">{rating} ★</span>
                    <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-gold h-full transition-all"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600 w-8">{count}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Review Form */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-green mb-6">Write a Review</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-green font-semibold mb-2">Your Rating *</label>
                  <div className="flex gap-2 justify-center py-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setFormData({ ...formData, rating: star })}
                        onMouseEnter={() => setHoveredRating(star)}
                        onMouseLeave={() => setHoveredRating(0)}
                        className="transition-all"
                      >
                        <Star
                          className={`w-10 h-10 ${
                            star <= (hoveredRating || formData.rating)
                              ? 'text-gold fill-gold'
                              : 'text-gray-300'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-green font-semibold mb-2">Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gold"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label className="block text-green font-semibold mb-2">Email *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gold"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="block text-green font-semibold mb-2">Visit Date</label>
                  <input
                    type="date"
                    value={formData.visitDate}
                    onChange={(e) => setFormData({ ...formData, visitDate: e.target.value })}
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gold"
                  />
                </div>

                <div>
                  <label className="block text-green font-semibold mb-2">Review Title *</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gold"
                    placeholder="Sum up your experience"
                  />
                </div>

                <div>
                  <label className="block text-green font-semibold mb-2">Your Review *</label>
                  <textarea
                    required
                    value={formData.comment}
                    onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gold"
                    placeholder="Share your experience..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-6 py-4 bg-gold hover:bg-gold/90 disabled:bg-gray-300 text-white rounded-lg font-semibold transition-all shadow-lg flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  {isSubmitting ? 'Submitting...' : 'Submit Review'}
                </button>
              </form>
            </div>
          </div>

          {/* Right Column - Reviews List */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-green mb-6">Guest Experiences</h2>
            <div className="space-y-6">
              {reviews.length === 0 && (
                <div className="bg-white rounded-xl p-12 text-center shadow-lg">
                  <MessageCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg">No reviews yet. Be the first to share your experience!</p>
                </div>
              )}

              {reviews.map((review: any) => (
                <div key={review.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center">
                          <span className="text-gold font-bold text-lg">
                            {review.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <p className="font-bold text-green">{review.name}</p>
                          <p className="text-sm text-gray-500">
                            {review.visitDate ? new Date(review.visitDate).toLocaleDateString() : 'Recently'}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-5 h-5 ${
                            star <= review.rating ? 'text-gold fill-gold' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  <h3 className="font-bold text-green text-lg mb-2">{review.title}</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">{review.comment}</p>

                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <button className="flex items-center gap-1 hover:text-gold transition-colors">
                      <ThumbsUp className="w-4 h-4" />
                      Helpful ({review.helpful || 0})
                    </button>
                    <span>Verified Guest</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <LuxuryFooter />
    </div>
  );
}

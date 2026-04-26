import { useState, useEffect } from 'react';
import { Star, ThumbsUp, Calendar, User } from 'lucide-react';
import { Link } from 'react-router';
import { motion } from 'motion/react';
import { toast } from 'sonner';
import LuxuryNav from './LuxuryNav';
import LuxuryFooter from './LuxuryFooter';

import { projectId, publicAnonKey } from '../../../utils/supabase/info';

export default function LuxuryReviewsPage() {
  const [reviews, setReviews] = useState<any[]>([]);
  const [newReview, setNewReview] = useState({ name: '', rating: 5, comment: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-ce9c7d1f/reviews`,
        { headers: { 'Authorization': `Bearer ${publicAnonKey}` } }
      );
      const data = await response.json();
      setReviews(data);
    } catch (error) {
      console.error('Failed to fetch reviews:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-ce9c7d1f/reviews`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${publicAnonKey}` },
          body: JSON.stringify(newReview)
        }
      );
      if (!response.ok) throw new Error('Failed to submit review');
      toast.success('Review submitted successfully!');
      setNewReview({ name: '', rating: 5, comment: '' });
      fetchReviews();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const avgRating = reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : '0.0';

  return (
    <div className="min-h-screen bg-luxury-ivory">
      <LuxuryNav />

      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden mt-20">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1920"
            alt="Reviews"
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
            <p className="text-luxury-gold text-sm tracking-[0.3em] uppercase mb-4">Testimonials</p>
            <h1 className="font-serif text-6xl md:text-7xl text-white mb-6">Guest Reviews</h1>
            <p className="text-white/80 text-lg max-w-2xl mx-auto font-light">
              Hear from our valued guests
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-8">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <div className="inline-block bg-luxury-cream p-12 mb-8">
              <div className="text-7xl font-serif text-luxury-charcoal mb-4">{avgRating}</div>
              <div className="flex justify-center mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-6 h-6 ${i < Math.round(parseFloat(avgRating)) ? 'text-luxury-gold fill-luxury-gold' : 'text-luxury-charcoal/20'}`}
                  />
                ))}
              </div>
              <p className="text-luxury-charcoal/60 font-light">Based on {reviews.length} reviews</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-16">
            {reviews.map((review, index) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-luxury-cream p-8"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-luxury-gold/20 flex items-center justify-center">
                      <User className="w-6 h-6 text-luxury-gold" strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="font-serif text-lg text-luxury-charcoal">{review.name}</p>
                      <p className="text-xs text-luxury-charcoal/60 font-light">
                        {new Date(review.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < review.rating ? 'text-luxury-gold fill-luxury-gold' : 'text-luxury-charcoal/20'}`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-luxury-charcoal font-light leading-relaxed italic">"{review.comment}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-luxury-cream">
        <div className="container mx-auto px-8">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-luxury-gold text-sm tracking-[0.3em] uppercase mb-4">Share Your Experience</p>
              <h2 className="font-serif text-4xl text-luxury-charcoal">Leave a Review</h2>
            </div>

            <form onSubmit={handleSubmit} className="bg-white p-12">
              <div className="space-y-8">
                <div>
                  <label className="flex items-center gap-2 text-luxury-charcoal mb-3 text-sm tracking-wide">
                    <User className="w-4 h-4 text-luxury-gold" strokeWidth={1.5} />
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={newReview.name}
                    onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                    className="w-full px-4 py-3 border border-luxury-charcoal/10 focus:outline-none focus:border-luxury-gold transition-all bg-white text-luxury-charcoal font-light"
                    placeholder="Enter your name"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-luxury-charcoal mb-3 text-sm tracking-wide">
                    <Star className="w-4 h-4 text-luxury-gold" strokeWidth={1.5} />
                    Rating
                  </label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <button
                        key={rating}
                        type="button"
                        onClick={() => setNewReview({ ...newReview, rating })}
                        className="transition-all"
                      >
                        <Star
                          className={`w-8 h-8 ${rating <= newReview.rating ? 'text-luxury-gold fill-luxury-gold' : 'text-luxury-charcoal/20'}`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-luxury-charcoal mb-3 text-sm tracking-wide block">
                    Your Review
                  </label>
                  <textarea
                    required
                    value={newReview.comment}
                    onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                    rows={5}
                    className="w-full px-4 py-3 border border-luxury-charcoal/10 focus:outline-none focus:border-luxury-gold transition-all bg-white text-luxury-charcoal font-light"
                    placeholder="Share your dining experience..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-8 py-4 bg-luxury-gold text-luxury-charcoal hover:bg-luxury-gold-light disabled:bg-luxury-charcoal/30 transition-all duration-500 text-sm tracking-wide"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Review'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      <LuxuryFooter />
    </div>
  );
}

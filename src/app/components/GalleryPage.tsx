import LuxuryNav from './LuxuryNav';
import LuxuryFooter from './LuxuryFooter';
import { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router';
import { motion } from 'motion/react';
import Luxury_Buffet_Spread from '../../assets/Luxury Buffet Spread.jpg';
import Elegant_Buffet_Table from '../../assets/Elegant Buffet Table.jpg';
import Premium_Food_Selection from '../../assets/Authentic_Rice_&_Curry.jpg';
import International_Cuisine from '../../assets/International Cuisine.jpg';
import Elegant_Dining_Area from '../../assets/Elegant Dining Area.jpg';
import Modern_Interior from '../../assets/Modern Interior.jpg';
import Dining_by_the_Ocean from '../../assets/Dining by the Ocean.jpg';
import Fine_Dining_Experience from '../../assets/Fine Dining Experience.jpg';
import Authentic_Curry_Selection from '../../assets/Authentic Curry Selection.jpg';
import Traditional_Kottu_Roti from '../../assets/Dolphin_Kottu_Roti.jpg';
import Sri_Lankan_Feast from '../../assets/Sri Lankan Feast.jpg';
import Local_Delicacies from '../../assets/Local Delicacies.jpg';

const galleryImages = [
  {
    url: Luxury_Buffet_Spread,
    title: 'Luxury Buffet Spread',
    category: 'Buffet'
  },
  {
    url: Elegant_Buffet_Table,
    title: 'Elegant Buffet Table',
    category: 'Buffet'
  },
  {
    url: Premium_Food_Selection,
    title: 'Premium Food Selection',
    category: 'Buffet'
  },
  {
    url: International_Cuisine,
    title: 'International Cuisine',
    category: 'Buffet'
  },
  {
    url: Elegant_Dining_Area,
    title: 'Elegant Dining Area',
    category: 'Restaurant'
  },
  {
    url: Modern_Interior,
    title: 'Modern Interior',
    category: 'Restaurant'
  },
  {
    url: Dining_by_the_Ocean,
    title: 'Dining by the Ocean',
    category: 'Restaurant'
  },
  {
    url: Fine_Dining_Experience,
    title: 'Fine Dining Experience',
    category: 'Restaurant'
  },
  {
    url: Authentic_Curry_Selection,
    title: 'Authentic Curry Selection',
    category: 'Food'
  },
  {
    url: Traditional_Kottu_Roti,
    title: 'Traditional Kottu Roti',
    category: 'Food'
  },
  {
    url: Sri_Lankan_Feast,
    title: 'Sri Lankan Feast',
    category: 'Food'
  },
  {
    url: Local_Delicacies,
    title: 'Local Delicacies',
    category: 'Food'
  }
];

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const categories = ['All', 'Buffet', 'Restaurant', 'Food'];

  const filteredImages = selectedCategory === 'All'
    ? galleryImages
    : galleryImages.filter(img => img.category === selectedCategory);

  const openLightbox = (index: number) => {
    setSelectedImageIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const nextImage = () => {
    setSelectedImageIndex((prev) => (prev + 1) % filteredImages.length);
  };

  const prevImage = () => {
    setSelectedImageIndex((prev) => (prev - 1 + filteredImages.length) % filteredImages.length);
  };

  return (
    <div className="min-h-screen bg-luxury-ivory">
      <LuxuryNav />

      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden mt-20">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=1920&q=80"
            alt="Gallery"
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
            <p className="text-luxury-gold text-sm tracking-[0.3em] uppercase mb-4">Visual Journey</p>
            <h1 className="font-serif text-6xl md:text-7xl text-white mb-6">Photo Gallery</h1>
            <p className="text-white/80 text-lg max-w-2xl mx-auto font-light">
              Experience the luxury and elegance of Queen Nature Resort
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <div className="sticky top-[88px] z-40 bg-white border-b border-luxury-charcoal/10">
        <div className="container mx-auto px-8 py-8">
          <div className="flex gap-8 overflow-x-auto border-b border-luxury-charcoal/10">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`pb-4 text-sm tracking-wide whitespace-nowrap transition-all duration-300 ${
                  selectedCategory === category
                    ? 'border-b-2 border-luxury-gold text-luxury-gold'
                    : 'text-luxury-charcoal hover:text-luxury-gold'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="container mx-auto px-8 py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          {filteredImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onClick={() => openLightbox(index)}
              className="group relative aspect-square overflow-hidden cursor-pointer"
            >
              <img
                src={image.url}
                alt={image.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-500">
                <div className="absolute bottom-0 left-0 right-0 p-8 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                  <p className="text-white font-light text-lg mb-2">{image.title}</p>
                  <span className="inline-block px-3 py-1.5 border border-luxury-gold text-luxury-gold text-xs tracking-wider uppercase">
                    {image.category}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredImages.length === 0 && (
          <div className="text-center py-20">
            <p className="text-luxury-charcoal/60 text-lg font-light">No images found in this category.</p>
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">
          <button
            onClick={closeLightbox}
            className="absolute top-8 right-8 w-12 h-12 bg-luxury-ivory/10 hover:bg-luxury-ivory/20 flex items-center justify-center text-white transition-all"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            onClick={prevImage}
            className="absolute left-8 w-12 h-12 bg-luxury-ivory/10 hover:bg-luxury-ivory/20 flex items-center justify-center text-white transition-all"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={nextImage}
            className="absolute right-8 w-12 h-12 bg-luxury-ivory/10 hover:bg-luxury-ivory/20 flex items-center justify-center text-white transition-all"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div className="max-w-6xl max-h-[90vh] mx-4">
            <img
              src={filteredImages[selectedImageIndex]?.url}
              alt={filteredImages[selectedImageIndex]?.title}
              className="max-w-full max-h-[90vh] object-contain"
            />
            <div className="text-center mt-8">
              <p className="text-white text-xl font-light mb-3">
                {filteredImages[selectedImageIndex]?.title}
              </p>
              <span className="inline-block px-4 py-2 border border-luxury-gold text-luxury-gold text-xs tracking-wider uppercase">
                {filteredImages[selectedImageIndex]?.category}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* CTA Section */}
      <section className="py-32 bg-luxury-charcoal text-white">
        <div className="container mx-auto px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <p className="text-luxury-gold text-sm tracking-[0.3em] uppercase mb-4">Reserve Now</p>
            <h2 className="font-serif text-5xl mb-8">Ready to Experience This?</h2>
            <p className="text-white/70 text-lg mb-12 font-light max-w-2xl mx-auto">
              Book your table or join the virtual queue now
            </p>
            <div className="flex flex-wrap gap-6 justify-center">
              <Link
                to="/booking"
                className="px-10 py-4 bg-luxury-gold text-luxury-charcoal hover:bg-luxury-gold-light transition-all duration-500 text-sm tracking-wide"
              >
                Book a Table
              </Link>
              <Link
                to="/queue"
                className="px-10 py-4 border border-luxury-ivory text-white hover:bg-luxury-ivory hover:text-luxury-charcoal transition-all duration-500 text-sm tracking-wide"
              >
                Join Queue
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <LuxuryFooter />
    </div>
  );
}

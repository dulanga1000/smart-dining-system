import { useState } from 'react';
import { Search, Heart, Share2, X, Leaf, Star, Clock, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router';
import { motion } from 'motion/react';
import { toast } from 'sonner';
import { useCart } from '../contexts/CartContext';
import LuxuryNav from './LuxuryNav';
import LuxuryFooter from './LuxuryFooter';
import Vegetable_Kottu_Roti from '../../assets/Vegetable_Kottu_Roti.jpg';
import Chicken_Kottu from '../../assets/Chicken_Kottu.jpg';
import Cheese_Kottu from '../../assets/Cheese_Kottu_Roti.jpg';
import Seafood_Kottu from '../../assets/Seafood_Kottu_Roti.jpg';
import Dolphin_Kottu from '../../assets/Dolphin_Kottu_Roti.jpg';
import Mutton_Kottu from '../../assets/Mutton_Kottu_Roti.jpg';
import Lamprais from '../../assets/Lamprais.jpg';
import Authentic_Rice_and_Curry from '../../assets/Authentic_Rice_&_Curry.jpg';
import String_Hoppers_with_Curry from '../../assets/String_Hoppers_with_Curry.jpeg';
import Continental_Breakfast_Buffet from '../../assets/Continental_Breakfast_Buffet.jpg';
import Grilled_Prawns from '../../assets/Grilled_Prawns.jpg';
import Ceylon_Seafood_Platter from '../../assets/Ceylon_Seafood_Platter.jpg'
import Egg_Hoppers from '../../assets/Egg_Hoppers.jpg';
import Devilled_Chicken from '../../assets/Devilled_Chicken.jpg';
import Fish_Ambul_Thiyal from '../../assets/Fish_Ambul_Thiyal.jpg';
import Watalappan from '../../assets/Watalappan.jpg';

const menuItems = [
  {
    id: 1,
    name: "Traditional Vegetable Kottu Roti",
    description: "Rhythmically chopped flatbread with vegetables",
    longDescription: "Our signature kottu prepared at our live theatre station, where skilled chefs create a symphony of flavors.",
    category: "dinner",
    isVeg: true,
    popular: true,
    price: 850,
    allergens: ["Gluten"],
    image: Vegetable_Kottu_Roti,
    prepTime: "15 min",
    calories: 420,
    protein: 12,
    carbs: 62,
    fat: 14,
    rating: 4.8,
    reviews: 156,
    chefNote: "Best enjoyed fresh from the griddle",
    ingredients: ["Roti", "Vegetables", "Curry spices", "Fresh herbs"],
    spiceLevel: "Medium"
  },
  {
    id: 2,
    name: "Chicken Kottu Roti",
    description: "Classic kottu with tender chicken pieces",
    longDescription: "Succulent chicken pieces tossed with chopped roti, eggs, and aromatic spices in our theatrical live cooking station.",
    category: "dinner",
    isVeg: false,
    popular: true,
    price: 1200,
    allergens: ["Gluten", "Eggs"],
    image: Chicken_Kottu,
    prepTime: "18 min",
    calories: 520,
    protein: 28,
    carbs: 58,
    fat: 18,
    rating: 4.9,
    reviews: 234,
    chefNote: "Our most requested kottu variation",
    ingredients: ["Roti", "Chicken", "Eggs", "Curry spices", "Onions"],
    spiceLevel: "Medium"
  },
  {
    id: 3,
    name: "Cheese Kottu Roti",
    description: "Indulgent kottu with melted cheese",
    longDescription: "A fusion masterpiece blending traditional kottu with premium melted cheese for an unforgettable taste experience.",
    category: "dinner",
    isVeg: true,
    popular: true,
    price: 1350,
    allergens: ["Gluten", "Dairy", "Eggs"],
    image: Cheese_Kottu,
    prepTime: "16 min",
    calories: 580,
    protein: 18,
    carbs: 60,
    fat: 26,
    rating: 4.7,
    reviews: 178,
    chefNote: "Perfect for cheese lovers",
    ingredients: ["Roti", "Mozzarella cheese", "Cheddar cheese", "Eggs", "Vegetables"],
    spiceLevel: "Mild to Medium"
  },
  {
    id: 4,
    name: "Seafood Kottu Roti",
    description: "Ocean treasures in traditional kottu style",
    longDescription: "Fresh prawns, squid, and fish combined with chopped roti in a spectacular display of culinary artistry.",
    category: "dinner",
    isVeg: false,
    popular: true,
    price: 1650,
    allergens: ["Gluten", "Shellfish", "Fish", "Eggs"],
    image: Seafood_Kottu,
    prepTime: "20 min",
    calories: 480,
    protein: 32,
    carbs: 54,
    fat: 16,
    rating: 4.9,
    reviews: 192,
    chefNote: "Daily fresh seafood selection",
    ingredients: ["Roti", "Prawns", "Squid", "Fish", "Curry leaves", "Eggs"],
    spiceLevel: "Medium to Hot"
  },
  {
    id: 5,
    name: "Dolphin Kottu Roti",
    description: "Premium fish kottu with dolphin fish",
    longDescription: "Featuring succulent dolphin fish (mahi-mahi) prepared with traditional spices and fresh ingredients.",
    category: "dinner",
    price: 1450,
    isVeg: false,
    popular: false,
    allergens: ["Gluten", "Fish", "Eggs"],
    image: Dolphin_Kottu,
    prepTime: "22 min",
    calories: 460,
    protein: 30,
    carbs: 56,
    fat: 14,
    rating: 4.8,
    reviews: 145,
    chefNote: "Sustainably sourced dolphin fish",
    ingredients: ["Roti", "Dolphin fish", "Curry spices", "Eggs", "Vegetables"],
    spiceLevel: "Medium"
  },
  {
    id: 6,
    name: "Mutton Kottu Roti",
    description: "Rich and hearty kottu with tender mutton",
    longDescription: "Slow-cooked mutton pieces combined with chopped roti and aromatic spices for a robust, satisfying meal.",
    category: "dinner",
    isVeg: false,
    popular: false,
    price: 1550,
    allergens: ["Gluten", "Eggs"],
    image: Mutton_Kottu,
    prepTime: "25 min",
    calories: 620,
    protein: 34,
    carbs: 58,
    fat: 24,
    rating: 4.6,
    reviews: 98,
    chefNote: "Traditionally spiced and slow-cooked",
    ingredients: ["Roti", "Mutton", "Curry spices", "Eggs", "Onions", "Tomatoes"],
    spiceLevel: "Hot"
  },
  {
    id: 7,
    name: "Ceylon Seafood Platter",
    description: "Fresh catch with coastal spices",
    longDescription: "A celebration of Sri Lankan coastal cuisine featuring the finest daily catch.",
    category: "dinner",
    isVeg: false,
    popular: true,
    price: 2850,
    allergens: ["Shellfish", "Fish"],
    image: Ceylon_Seafood_Platter,
    prepTime: "20 min",
    calories: 380,
    protein: 42,
    carbs: 8,
    fat: 18,
    rating: 4.9,
    reviews: 203,
    chefNote: "Sourced daily from local fishermen",
    ingredients: ["Fresh fish", "Prawns", "Squid", "Coastal spices"],
    spiceLevel: "Mild"
  },
  {
    id: 8,
    name: "Grilled Prawns",
    description: "Tiger prawns with garlic butter",
    longDescription: "Jumbo tiger prawns marinated and grilled to perfection, served with aromatic garlic butter sauce.",
    category: "dinner",
    isVeg: false,
    popular: true,
    price: 2250,
    allergens: ["Shellfish", "Dairy"],
    image: Grilled_Prawns,
    prepTime: "18 min",
    calories: 320,
    protein: 38,
    carbs: 4,
    fat: 16,
    rating: 4.8,
    reviews: 167,
    chefNote: "Recommended with steamed rice",
    ingredients: ["Tiger prawns", "Garlic", "Butter", "Lemon", "Fresh herbs"],
    spiceLevel: "Mild"
  },
  {
    id: 9,
    name: "Lamprais",
    description: "Dutch-Burgher delicacy wrapped in banana leaf",
    longDescription: "A colonial-era treasure featuring fragrant rice, meat curry, seeni sambol, and accompaniments baked in banana leaf.",
    category: "lunch",
    isVeg: false,
    popular: true,
    price: 1450,
    allergens: [],
    image: Lamprais,
    prepTime: "30 min",
    calories: 680,
    protein: 28,
    carbs: 82,
    fat: 24,
    rating: 4.9,
    reviews: 215,
    chefNote: "A Sunday special tradition",
    ingredients: ["Rice", "Meat curry", "Seeni sambol", "Ash plantain", "Frikkadels"],
    spiceLevel: "Medium"
  },
  {
    id: 10,
    name: "Authentic Rice & Curry",
    description: "Traditional Sri Lankan lunch",
    longDescription: "An authentic feast with fragrant rice and selection of curries.",
    category: "lunch",
    isVeg: true,
    popular: true,
    price: 1150,
    allergens: [],
    image: Authentic_Rice_and_Curry,
    prepTime: "25 min",
    calories: 480,
    protein: 15,
    carbs: 78,
    fat: 12,
    rating: 4.8,
    reviews: 142,
    chefNote: "Recipes passed down through generations",
    ingredients: ["Basmati rice", "Dhal", "Vegetable curries", "Sambols"],
    spiceLevel: "Medium to Hot"
  },
  {
    id: 11,
    name: "String Hoppers with Curry",
    description: "Delicate rice noodles with coconut sambol",
    longDescription: "Traditional steamed rice noodles served with aromatic curry and fresh coconut sambol.",
    category: "breakfast",
    isVeg: true,
    popular: true,
    price: 650,
    allergens: [],
    image: String_Hoppers_with_Curry,
    prepTime: "20 min",
    calories: 380,
    protein: 12,
    carbs: 72,
    fat: 8,
    rating: 4.7,
    reviews: 124,
    chefNote: "Authentic Sri Lankan breakfast",
    ingredients: ["Rice flour", "Coconut", "Curry", "Sambol"],
    spiceLevel: "Medium"
  },
  {
    id: 12,
    name: "Continental Breakfast Buffet",
    description: "International morning selection",
    longDescription: "Expansive spread featuring artisanal breads, premium cheeses, and fresh fruits.",
    category: "breakfast",
    isVeg: true,
    popular: true,
    price: 1850,
    allergens: ["Gluten", "Dairy"],
    image: Continental_Breakfast_Buffet,
    prepTime: "Self-service",
    calories: 520,
    protein: 18,
    carbs: 68,
    fat: 20,
    rating: 4.7,
    reviews: 89,
    chefNote: "Freshly prepared each morning",
    ingredients: ["Pastries", "Fruits", "Cheeses", "Yogurt"],
    spiceLevel: "None"
  },
  {
    id: 13,
    name: "Egg Hoppers",
    description: "Bowl-shaped pancakes with egg center",
    longDescription: "Crispy edges with soft center, topped with a perfectly cooked egg and served with spicy sambol.",
    category: "breakfast",
    isVeg: false,
    popular: true,
    price: 450,
    allergens: ["Eggs"],
    image: Egg_Hoppers,
    prepTime: "15 min",
    calories: 280,
    protein: 14,
    carbs: 38,
    fat: 8,
    rating: 4.9,
    reviews: 198,
    chefNote: "Must try Sri Lankan breakfast",
    ingredients: ["Rice flour", "Coconut milk", "Eggs", "Sambol"],
    spiceLevel: "Medium"
  },
  {
    id: 14,
    name: "Devilled Chicken",
    description: "Fiery stir-fried chicken with peppers",
    longDescription: "Tender chicken pieces wok-tossed with bell peppers, onions, and signature devilled sauce.",
    category: "dinner",
    isVeg: false,
    popular: true,
    price: 1350,
    allergens: [],
    image: Devilled_Chicken,
    prepTime: "22 min",
    calories: 420,
    protein: 36,
    carbs: 18,
    fat: 22,
    rating: 4.8,
    reviews: 176,
    chefNote: "Sri Lankan-Chinese fusion classic",
    ingredients: ["Chicken", "Bell peppers", "Onions", "Devilled sauce", "Chili"],
    spiceLevel: "Hot"
  },
  {
    id: 15,
    name: "Fish Ambul Thiyal",
    description: "Dry fish curry with goraka",
    longDescription: "Traditional sour fish curry slow-cooked with dried goraka fruit, a delicacy from southern Sri Lanka.",
    category: "lunch",
    isVeg: false,
    popular: false,
    price: 1250,
    allergens: ["Fish"],
    image: Fish_Ambul_Thiyal,
    prepTime: "35 min",
    calories: 340,
    protein: 32,
    carbs: 12,
    fat: 18,
    rating: 4.7,
    reviews: 87,
    chefNote: "Ancient recipe from the south",
    ingredients: ["Tuna", "Goraka", "Curry spices", "Curry leaves"],
    spiceLevel: "Medium"
  },
  {
    id: 16,
    name: "Watalappan",
    description: "Coconut custard with jaggery",
    longDescription: "Luxurious steamed pudding made with coconut milk, jaggery, and fragrant spices.",
    category: "dinner",
    isVeg: true,
    popular: true,
    price: 550,
    allergens: ["Eggs", "Dairy"],
    image: Watalappan,
    prepTime: "45 min",
    calories: 320,
    protein: 8,
    carbs: 52,
    fat: 12,
    rating: 4.9,
    reviews: 156,
    chefNote: "Traditional celebration dessert",
    ingredients: ["Coconut milk", "Jaggery", "Eggs", "Cardamom", "Nutmeg"],
    spiceLevel: "None"
  }
];

export default function LuxuryMenuPage() {
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [favorites, setFavorites] = useState<number[]>([]);

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'breakfast', label: 'Breakfast' },
    { id: 'lunch', label: 'Lunch' },
    { id: 'dinner', label: 'Dinner' }
  ];

  const filteredItems = menuItems.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleFavorite = (id: number) => {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
    toast.success(favorites.includes(id) ? 'Removed from favorites' : 'Added to favorites');
  };

  return (
    <div className="min-h-screen bg-luxury-ivory">
      <LuxuryNav />

      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden mt-20">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&q=90"
            alt="Menu"
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
            <p className="text-luxury-gold text-sm tracking-[0.3em] uppercase mb-4">Culinary Excellence</p>
            <h1 className="font-serif text-6xl md:text-7xl text-white mb-6">Our Menu</h1>
            <p className="text-white/80 text-lg max-w-2xl mx-auto font-light">
              A curated selection of authentic Sri Lankan and international cuisine
            </p>
          </motion.div>
        </div>
      </section>

      <div className="sticky top-[88px] z-40 bg-white border-b border-luxury-charcoal/10">
        <div className="container mx-auto px-8 py-8">
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-luxury-charcoal/40" />
              <input
                type="text"
                placeholder="Search dishes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-luxury-charcoal/10 focus:outline-none focus:border-luxury-gold transition-all bg-white text-luxury-charcoal font-light"
              />
            </div>
          </div>

          <div className="flex gap-8 mt-6 border-b border-luxury-charcoal/10">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`pb-4 text-sm tracking-wide transition-all duration-300 ${
                  selectedCategory === cat.id
                    ? 'border-b-2 border-luxury-gold text-luxury-gold'
                    : 'text-luxury-charcoal hover:text-luxury-gold'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group cursor-pointer"
              onClick={() => setSelectedItem(item)}
            >
              <div className="relative h-80 mb-6 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {item.popular && (
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1.5 bg-luxury-gold text-luxury-charcoal text-xs tracking-wider uppercase">
                      Popular
                    </span>
                  </div>
                )}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(item.id);
                  }}
                  className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-all"
                >
                  <Heart
                    className={`w-5 h-5 transition-all ${
                      favorites.includes(item.id) ? 'fill-luxury-gold text-luxury-gold' : 'text-luxury-charcoal'
                    }`}
                  />
                </button>
              </div>

              <div>
                {item.isVeg && (
                  <div className="flex items-center gap-2 mb-2">
                    <Leaf className="w-4 h-4 text-green-600" />
                    <span className="text-xs text-luxury-charcoal/60 tracking-wide">Vegetarian</span>
                  </div>
                )}
                <h3 className="font-serif text-2xl text-luxury-charcoal mb-2 group-hover:text-luxury-gold transition-colors duration-300">
                  {item.name}
                </h3>
                <p className="text-luxury-charcoal/70 font-light mb-3 leading-relaxed">
                  {item.description}
                </p>
                <p className="text-luxury-gold text-xl font-light mb-4">LKR {item.price}</p>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-luxury-gold fill-luxury-gold" />
                    <span className="text-sm text-luxury-charcoal">{item.rating}</span>
                    <span className="text-xs text-luxury-charcoal/40">({item.reviews})</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-luxury-charcoal/60">
                    <Clock className="w-3 h-3" />
                    <span>{item.prepTime}</span>
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart({ id: item.id, name: item.name, description: item.description, image: item.image, category: item.category, price: item.price });
                    toast.success(`${item.name} added to cart`);
                  }}
                  className="w-full px-6 py-3 border border-luxury-gold text-luxury-gold hover:bg-luxury-gold hover:text-luxury-charcoal transition-all duration-500 text-sm tracking-wide flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="w-4 h-4" strokeWidth={1.5} />
                  Add to Cart
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="relative h-96">
              <img
                src={selectedItem.image}
                alt={selectedItem.name}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-6 right-6 w-12 h-12 bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-all"
              >
                <X className="w-6 h-6 text-luxury-charcoal" />
              </button>
            </div>

            <div className="p-12">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="font-serif text-4xl text-luxury-charcoal mb-2">{selectedItem.name}</h2>
                  <div className="flex items-center gap-4">
                    {selectedItem.isVeg && (
                      <div className="flex items-center gap-2">
                        <Leaf className="w-4 h-4 text-green-600" />
                        <span className="text-xs text-luxury-charcoal/60 tracking-wide uppercase">Vegetarian</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-luxury-gold fill-luxury-gold" />
                      <span className="text-sm text-luxury-charcoal">{selectedItem.rating}</span>
                      <span className="text-xs text-luxury-charcoal/40">({selectedItem.reviews} reviews)</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-luxury-gold text-3xl font-light">LKR {selectedItem.price}</p>
                  <div className="flex items-center gap-2 mt-2 text-luxury-charcoal/60">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">{selectedItem.prepTime}</span>
                  </div>
                </div>
              </div>

              <p className="text-luxury-charcoal text-lg font-light leading-relaxed mb-8">
                {selectedItem.longDescription}
              </p>

              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <p className="text-sm tracking-wide text-luxury-charcoal/60 mb-3 uppercase">Ingredients</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedItem.ingredients.map((ingredient: string, idx: number) => (
                      <span key={idx} className="px-3 py-1.5 bg-luxury-cream text-luxury-charcoal text-xs">
                        {ingredient}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-sm tracking-wide text-luxury-charcoal/60 mb-3 uppercase">Nutritional Information</p>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-luxury-cream p-3">
                      <p className="text-xs text-luxury-charcoal/60">Calories</p>
                      <p className="text-luxury-charcoal font-light">{selectedItem.calories} kcal</p>
                    </div>
                    <div className="bg-luxury-cream p-3">
                      <p className="text-xs text-luxury-charcoal/60">Protein</p>
                      <p className="text-luxury-charcoal font-light">{selectedItem.protein}g</p>
                    </div>
                    <div className="bg-luxury-cream p-3">
                      <p className="text-xs text-luxury-charcoal/60">Carbs</p>
                      <p className="text-luxury-charcoal font-light">{selectedItem.carbs}g</p>
                    </div>
                    <div className="bg-luxury-cream p-3">
                      <p className="text-xs text-luxury-charcoal/60">Fat</p>
                      <p className="text-luxury-charcoal font-light">{selectedItem.fat}g</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div>
                  <p className="text-sm tracking-wide text-luxury-charcoal/60 mb-2 uppercase">Spice Level</p>
                  <p className="text-luxury-charcoal font-light">{selectedItem.spiceLevel}</p>
                </div>
                {selectedItem.allergens.length > 0 && (
                  <div>
                    <p className="text-sm tracking-wide text-luxury-charcoal/60 mb-2 uppercase">Allergens</p>
                    <p className="text-luxury-charcoal font-light">{selectedItem.allergens.join(', ')}</p>
                  </div>
                )}
              </div>

              {selectedItem.chefNote && (
                <div className="bg-luxury-charcoal text-white p-6 mb-8">
                  <p className="text-sm tracking-wide text-luxury-gold mb-2 uppercase">Chef's Note</p>
                  <p className="font-light italic">"{selectedItem.chefNote}"</p>
                </div>
              )}

              <div className="flex gap-4">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart({ id: selectedItem.id, name: selectedItem.name, description: selectedItem.description, image: selectedItem.image, category: selectedItem.category, price: selectedItem.price });
                    toast.success(`${selectedItem.name} added to cart`);
                  }}
                  className="flex-1 px-8 py-4 bg-luxury-gold text-luxury-charcoal text-center hover:bg-luxury-gold-light transition-all duration-500 text-sm tracking-wide flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="w-4 h-4" strokeWidth={1.5} />
                  Add to Cart - LKR {selectedItem.price}
                </button>
                <button
                  onClick={() => setSelectedItem(null)}
                  className="px-8 py-4 border border-luxury-charcoal text-luxury-charcoal text-center hover:bg-luxury-charcoal hover:text-white transition-all duration-500 text-sm tracking-wide"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      <LuxuryFooter />
    </div>
  );
}

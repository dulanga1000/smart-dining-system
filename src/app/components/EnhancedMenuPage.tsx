import { useState } from 'react';
import { Coffee, Flame, Leaf, Search, Star, Utensils, AlertCircle, Filter, Heart, Share2, Clock, Users, TrendingUp, X, ChefHat, Info } from 'lucide-react';
import { Link } from 'react-router';
import Navigation from './Navigation';
import Footer from './Footer';
import { toast } from 'sonner';

const enhancedMenuData = {
  breakfast: {
    title: "Breakfast Buffet",
    time: "6:30 AM - 10:30 AM",
    color: "from-orange-400 to-red-500",
    items: [
      {
        id: 1,
        name: "String Hoppers",
        description: "Traditional rice noodles with sambol",
        longDescription: "Authentic Sri Lankan string hoppers made fresh daily. Served with our signature coconut sambol, lunu miris, and dal curry. A breakfast favorite that's both healthy and delicious.",
        category: "Traditional",
        isVeg: true,
        popular: true,
        allergens: ["Gluten-Free"],
        dietary: ["Vegan", "Low-Fat"],
        image: "https://images.unsplash.com/photo-1588594907301-823478af8be5?w=800",
        prepTime: "15 min",
        servingSize: "2-3 hoppers",
        calories: 180,
        protein: "4g",
        carbs: "38g",
        fat: "2g",
        rating: 4.8,
        reviews: 156,
        chefNote: "Best enjoyed with coconut sambol and curry",
        ingredients: ["Rice flour", "Water", "Salt", "Coconut sambol", "Lunu miris"],
        spiceLevel: 2
      },
      {
        id: 2,
        name: "Egg Hoppers",
        description: "Crispy bowl-shaped pancakes with egg",
        longDescription: "Classic Sri Lankan egg hoppers - crispy on the edges, soft in the center, with a perfectly cooked egg. A protein-packed breakfast option that's both filling and delicious.",
        category: "Traditional",
        isVeg: false,
        popular: true,
        allergens: ["Eggs"],
        dietary: [],
        image: "https://images.unsplash.com/photo-1738986588756-a08fe3af8741?w=800",
        prepTime: "10 min",
        servingSize: "2 hoppers",
        calories: 220,
        protein: "12g",
        carbs: "28g",
        fat: "8g",
        rating: 4.9,
        reviews: 203,
        chefNote: "Our signature dish - don't miss it!",
        ingredients: ["Rice flour", "Coconut milk", "Eggs", "Sugar", "Salt"],
        spiceLevel: 1
      },
      {
        id: 3,
        name: "Custom Omelette",
        description: "Made to order with your choice of fillings",
        longDescription: "Choose from a variety of fresh ingredients including cheese, vegetables, ham, mushrooms, and herbs. Our chefs prepare your perfect omelette right in front of you at our live egg station.",
        category: "Live Station",
        isVeg: false,
        popular: true,
        allergens: ["Eggs", "Dairy"],
        dietary: ["High-Protein"],
        image: "https://images.unsplash.com/photo-1623773005285-ba3fd22521a8?w=800",
        prepTime: "8 min",
        servingSize: "3-egg omelette",
        calories: 280,
        protein: "22g",
        carbs: "4g",
        fat: "20g",
        rating: 4.7,
        reviews: 189,
        chefNote: "Tell our chef your preferred fillings",
        ingredients: ["Farm eggs", "Cheese", "Vegetables", "Herbs", "Butter"],
        spiceLevel: 0
      },
      {
        id: 4,
        name: "Croissants & Pastries",
        description: "Fresh baked pastries",
        longDescription: "Freshly baked every morning - flaky croissants, pain au chocolat, danish pastries, and more. Perfectly golden and buttery, served warm from our bakery.",
        category: "Bakery",
        isVeg: true,
        popular: false,
        allergens: ["Gluten", "Dairy", "Eggs"],
        dietary: [],
        image: "https://images.unsplash.com/photo-1751151856149-5ebf1d21586a?w=800",
        prepTime: "Ready",
        servingSize: "2 pieces",
        calories: 310,
        protein: "6g",
        carbs: "38g",
        fat: "15g",
        rating: 4.6,
        reviews: 142,
        chefNote: "Best with butter and jam",
        ingredients: ["Flour", "Butter", "Yeast", "Milk", "Sugar"],
        spiceLevel: 0
      },
      {
        id: 5,
        name: "Tropical Fruits",
        description: "Fresh seasonal selection",
        longDescription: "A vibrant selection of tropical fruits including pineapple, papaya, watermelon, dragon fruit, and seasonal specialties. All freshly cut and beautifully presented.",
        category: "Fruits",
        isVeg: true,
        popular: true,
        allergens: [],
        dietary: ["Vegan", "Gluten-Free", "Raw"],
        image: "https://images.unsplash.com/photo-1773915950207-2d485a8e2aa2?w=800",
        prepTime: "Ready",
        servingSize: "250g",
        calories: 95,
        protein: "2g",
        carbs: "24g",
        fat: "0g",
        rating: 4.8,
        reviews: 167,
        chefNote: "Locally sourced, daily fresh",
        ingredients: ["Pineapple", "Papaya", "Watermelon", "Dragon fruit", "Seasonal fruits"],
        spiceLevel: 0
      }
    ]
  },
  lunch: {
    title: "Lunch Buffet",
    time: "12:30 PM - 3:00 PM",
    color: "from-green-400 to-emerald-600",
    items: [
      {
        id: 6,
        name: "Rice & Curry Varieties",
        description: "Multiple authentic Sri Lankan curries",
        longDescription: "Traditional Sri Lankan rice and curry spread featuring multiple curries, sambols, and accompaniments. Choose from chicken, fish, vegetable, and dal curries, all made with authentic spices.",
        category: "Main",
        isVeg: false,
        popular: true,
        allergens: [],
        dietary: ["Authentic"],
        image: "https://images.unsplash.com/photo-1743525700011-afac212694d7?w=800",
        prepTime: "Ready",
        servingSize: "1 plate",
        calories: 520,
        protein: "28g",
        carbs: "72g",
        fat: "14g",
        rating: 4.9,
        reviews: 298,
        chefNote: "Our most popular lunch option",
        ingredients: ["Basmati rice", "Chicken curry", "Fish curry", "Veg curries", "Papadum"],
        spiceLevel: 3
      },
      {
        id: 7,
        name: "Pasta Station",
        description: "Various sauces and toppings",
        longDescription: "Choose your pasta type and sauce - from creamy Alfredo to tangy marinara, or our special Sri Lankan fusion pasta. Topped with fresh parmesan and herbs.",
        category: "International",
        isVeg: false,
        popular: false,
        allergens: ["Gluten", "Dairy"],
        dietary: [],
        image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800",
        prepTime: "10 min",
        servingSize: "1 bowl",
        calories: 450,
        protein: "18g",
        carbs: "62g",
        fat: "16g",
        rating: 4.5,
        reviews: 134,
        chefNote: "Try our fusion curry pasta",
        ingredients: ["Pasta", "Sauce", "Cheese", "Vegetables", "Herbs"],
        spiceLevel: 1
      },
      {
        id: 8,
        name: "Salad Bar",
        description: "Fresh greens and dressings",
        longDescription: "Build your perfect salad from our extensive salad bar. Fresh lettuce, vegetables, fruits, nuts, seeds, and multiple dressing options. Healthy and refreshing!",
        category: "Healthy",
        isVeg: true,
        popular: false,
        allergens: ["Nuts"],
        dietary: ["Vegan", "Gluten-Free", "Low-Calorie"],
        image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800",
        prepTime: "Ready",
        servingSize: "1 bowl",
        calories: 180,
        protein: "6g",
        carbs: "22g",
        fat: "8g",
        rating: 4.4,
        reviews: 98,
        chefNote: "All organic vegetables",
        ingredients: ["Mixed greens", "Vegetables", "Fruits", "Nuts", "Dressings"],
        spiceLevel: 0
      },
      {
        id: 9,
        name: "Ice Cream Bar",
        description: "Multiple flavors and toppings",
        longDescription: "Premium ice cream selection with classic and exotic flavors. Create your perfect sundae with fresh fruits, nuts, sauces, and whipped cream.",
        category: "Desserts",
        isVeg: true,
        popular: true,
        allergens: ["Dairy", "Nuts"],
        dietary: [],
        image: "https://images.unsplash.com/photo-1687162274238-417d6cbae5ba?w=800",
        prepTime: "Ready",
        servingSize: "2 scoops",
        calories: 280,
        protein: "5g",
        carbs: "38g",
        fat: "12g",
        rating: 4.9,
        reviews: 245,
        chefNote: "Try our local flavors",
        ingredients: ["Ice cream", "Toppings", "Fruits", "Sauces", "Nuts"],
        spiceLevel: 0
      }
    ]
  },
  dinner: {
    title: "Dinner Buffet",
    time: "7:00 PM - 10:30 PM",
    color: "from-purple-400 to-pink-500",
    items: [
      {
        id: 10,
        name: "Live Kottu Station",
        description: "Fresh made to order",
        longDescription: "Experience the rhythm of authentic Sri Lankan kottu preparation! Watch our chefs chop and mix flatbread with vegetables, eggs, and your choice of protein on our hot griddle.",
        category: "Live Station",
        isVeg: false,
        popular: true,
        allergens: ["Gluten", "Eggs"],
        dietary: [],
        image: "/src/assets/chicken-kottu.png",
        prepTime: "12 min",
        servingSize: "1 portion",
        calories: 480,
        protein: "24g",
        carbs: "54g",
        fat: "18g",
        rating: 5.0,
        reviews: 342,
        chefNote: "Our signature dinner show!",
        ingredients: ["Flatbread", "Vegetables", "Eggs", "Chicken/Beef", "Spices"],
        spiceLevel: 4
      },
      {
        id: 11,
        name: "Seafood Curries",
        description: "Fresh catch prepared multiple ways",
        longDescription: "Daily fresh seafood prepared with traditional spices. Options include prawn curry, fish curry, squid curry, and more. Rich, flavorful, and authentically Sri Lankan.",
        category: "Curries",
        isVeg: false,
        popular: true,
        allergens: ["Shellfish", "Fish"],
        dietary: ["High-Protein"],
        image: "https://images.unsplash.com/photo-1761314036779-84078bec535c?w=800",
        prepTime: "Ready",
        servingSize: "1 portion",
        calories: 380,
        protein: "32g",
        carbs: "18g",
        fat: "20g",
        rating: 4.8,
        reviews: 216,
        chefNote: "Catch of the day special",
        ingredients: ["Fresh seafood", "Coconut milk", "Spices", "Curry leaves", "Tamarind"],
        spiceLevel: 3
      },
      {
        id: 12,
        name: "Roast Chicken",
        description: "Herb roasted whole chicken",
        longDescription: "Succulent whole chicken roasted to perfection with herbs and spices. Crispy golden skin, tender juicy meat. Served with roasted vegetables and gravy.",
        category: "International",
        isVeg: false,
        popular: false,
        allergens: [],
        dietary: ["High-Protein", "Keto-Friendly"],
        image: "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=800",
        prepTime: "Ready",
        servingSize: "200g",
        calories: 420,
        protein: "45g",
        carbs: "2g",
        fat: "24g",
        rating: 4.7,
        reviews: 178,
        chefNote: "Perfect with our house gravy",
        ingredients: ["Whole chicken", "Herbs", "Garlic", "Lemon", "Spices"],
        spiceLevel: 1
      },
      {
        id: 13,
        name: "Dessert Bar",
        description: "Cakes, puddings, and sweets",
        longDescription: "An extensive dessert selection including cakes, watalappam (Sri Lankan pudding), mousse, tarts, and traditional sweets. Perfect ending to your dinner.",
        category: "Desserts",
        isVeg: true,
        popular: true,
        allergens: ["Gluten", "Dairy", "Eggs", "Nuts"],
        dietary: [],
        image: "https://images.unsplash.com/photo-1767071157341-2d0d2df5a811?w=800",
        prepTime: "Ready",
        servingSize: "Variety",
        calories: 350,
        protein: "6g",
        carbs: "52g",
        fat: "14g",
        rating: 4.9,
        reviews: 267,
        chefNote: "Try our signature watalappam",
        ingredients: ["Various cakes", "Puddings", "Sweets", "Fresh cream", "Fruits"],
        spiceLevel: 0
      }
    ]
  }
};

export default function EnhancedMenuPage() {
  const [selectedMeal, setSelectedMeal] = useState<'breakfast' | 'lunch' | 'dinner'>('breakfast');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterVeg, setFilterVeg] = useState(false);
  const [filterVegan, setFilterVegan] = useState(false);
  const [filterGlutenFree, setFilterGlutenFree] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [sortBy, setSortBy] = useState<'popular' | 'rating' | 'calories'>('popular');

  const currentMenu = enhancedMenuData[selectedMeal];

  let filteredItems = currentMenu.items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesVeg = !filterVeg || item.isVeg;
    const matchesVegan = !filterVegan || (item.dietary && item.dietary.includes("Vegan"));
    const matchesGlutenFree = !filterGlutenFree || (item.allergens && item.allergens.includes("Gluten-Free"));
    return matchesSearch && matchesVeg && matchesVegan && matchesGlutenFree;
  });

  // Sort items
  filteredItems = [...filteredItems].sort((a, b) => {
    if (sortBy === 'popular') return (b.reviews || 0) - (a.reviews || 0);
    if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
    if (sortBy === 'calories') return (a.calories || 0) - (b.calories || 0);
    return 0;
  });

  const toggleFavorite = (id: number) => {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(fav => fav !== id) : [...prev, id]
    );
    toast.success(favorites.includes(id) ? 'Removed from favorites' : 'Added to favorites');
  };

  const shareItem = (item: any) => {
    toast.success('Share link copied to clipboard!');
  };

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-white">
        {/* Header */}
        <div className={`relative bg-gradient-to-r ${currentMenu.color} text-white py-20 overflow-hidden`}>
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1920"
              alt="Buffet Menu"
              className="w-full h-full object-cover opacity-20"
            />
            <div className={`absolute inset-0 bg-gradient-to-r ${currentMenu.color.replace('to', 'via')}/90`}></div>
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">Buffet Menu</h1>
            <p className="text-2xl text-white/90 mb-6">Unlimited dining experience with premium quality</p>
            <div className="flex items-center gap-4 text-white/90">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 fill-white" />
                <span>4.8 Average Rating</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                <span>1,500+ Reviews</span>
              </div>
            </div>
          </div>
        </div>

        {/* Meal Selection */}
        <div className="sticky top-16 bg-white shadow-md z-30">
          <div className="container mx-auto px-4">
            <div className="flex gap-2 py-4 overflow-x-auto">
              {(['breakfast', 'lunch', 'dinner'] as const).map((meal) => (
                <button
                  key={meal}
                  onClick={() => setSelectedMeal(meal)}
                  className={`px-6 py-3 rounded-xl font-bold whitespace-nowrap transition-all ${
                    selectedMeal === meal
                      ? 'bg-gold text-white shadow-lg scale-105'
                      : 'bg-gray-100 text-green hover:bg-gray-200'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {meal === 'breakfast' && <Coffee className="w-4 h-4" />}
                    {meal === 'lunch' && <Utensils className="w-4 h-4" />}
                    {meal === 'dinner' && <Flame className="w-4 h-4" />}
                    {enhancedMenuData[meal].title}
                  </div>
                  <div className="text-xs opacity-75 mt-1">{enhancedMenuData[meal].time}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="bg-gray-50 border-b sticky top-32 z-20">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search menu items..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold text-lg"
                  />
                </div>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="px-6 py-4 border-2 rounded-xl font-semibold text-green focus:outline-none focus:ring-2 focus:ring-gold"
                >
                  <option value="popular">Most Popular</option>
                  <option value="rating">Highest Rated</option>
                  <option value="calories">Lowest Calories</option>
                </select>

                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="px-6 py-4 rounded-xl font-semibold flex items-center gap-2 bg-green text-white hover:bg-green/90 transition-all"
                >
                  <Filter className="w-5 h-5" />
                  Filters
                  {(filterVeg || filterVegan || filterGlutenFree) && (
                    <span className="px-2 py-0.5 bg-gold text-white rounded-full text-sm">
                      {[filterVeg, filterVegan, filterGlutenFree].filter(Boolean).length}
                    </span>
                  )}
                </button>
              </div>

              {showFilters && (
                <div className="flex flex-wrap gap-3 p-6 bg-white rounded-xl shadow-md animate-in slide-in-from-top">
                  <button
                    onClick={() => setFilterVeg(!filterVeg)}
                    className={`px-5 py-3 rounded-xl font-semibold flex items-center gap-2 transition-all ${
                      filterVeg ? 'bg-green text-white shadow-lg' : 'bg-gray-100 text-green border-2 hover:bg-gray-50'
                    }`}
                  >
                    <Leaf className="w-4 h-4" />
                    Vegetarian
                  </button>
                  <button
                    onClick={() => setFilterVegan(!filterVegan)}
                    className={`px-5 py-3 rounded-xl font-semibold flex items-center gap-2 transition-all ${
                      filterVegan ? 'bg-green text-white shadow-lg' : 'bg-gray-100 text-green border-2 hover:bg-gray-50'
                    }`}
                  >
                    <Leaf className="w-4 h-4" />
                    Vegan
                  </button>
                  <button
                    onClick={() => setFilterGlutenFree(!filterGlutenFree)}
                    className={`px-5 py-3 rounded-xl font-semibold flex items-center gap-2 transition-all ${
                      filterGlutenFree ? 'bg-green text-white shadow-lg' : 'bg-gray-100 text-green border-2 hover:bg-gray-50'
                    }`}
                  >
                    <AlertCircle className="w-4 h-4" />
                    Gluten-Free
                  </button>
                  {(filterVeg || filterVegan || filterGlutenFree) && (
                    <button
                      onClick={() => {
                        setFilterVeg(false);
                        setFilterVegan(false);
                        setFilterGlutenFree(false);
                      }}
                      className="px-5 py-3 rounded-xl font-semibold text-gray-600 hover:text-green transition-all"
                    >
                      Clear All
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Menu Items Grid */}
        <div className="container mx-auto px-4 py-12">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-green mb-2">{currentMenu.title}</h2>
            <p className="text-gray-600">{currentMenu.time} • {filteredItems.length} items</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedItem(item)}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2"
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {item.popular && (
                      <span className="px-3 py-1 bg-gold text-white rounded-full text-xs font-bold flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" />
                        Popular
                      </span>
                    )}
                    {item.isVeg && (
                      <span className="px-3 py-1 bg-green text-white rounded-full text-xs font-bold flex items-center gap-1">
                        <Leaf className="w-3 h-3" />
                        Veg
                      </span>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="absolute top-4 right-4 flex gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(item.id);
                      }}
                      className={`w-10 h-10 rounded-full backdrop-blur-md flex items-center justify-center transition-all ${
                        favorites.includes(item.id)
                          ? 'bg-red-500 text-white'
                          : 'bg-white/20 text-white hover:bg-white/30'
                      }`}
                    >
                      <Heart className={`w-5 h-5 ${favorites.includes(item.id) ? 'fill-white' : ''}`} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        shareItem(item);
                      }}
                      className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all"
                    >
                      <Share2 className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Rating */}
                  <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full">
                    <Star className="w-4 h-4 text-gold fill-gold" />
                    <span className="font-bold text-green">{item.rating}</span>
                    <span className="text-xs text-gray-600">({item.reviews})</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-bold text-green group-hover:text-gold transition-colors">
                      {item.name}
                    </h3>
                    {item.spiceLevel > 0 && (
                      <div className="flex gap-0.5">
                        {[...Array(item.spiceLevel)].map((_, i) => (
                          <Flame key={i} className="w-4 h-4 text-red-500 fill-red-500" />
                        ))}
                      </div>
                    )}
                  </div>

                  <p className="text-gray-600 mb-4 line-clamp-2">{item.description}</p>

                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {item.prepTime}
                    </div>
                    <div className="flex items-center gap-1">
                      <Info className="w-4 h-4" />
                      {item.calories} cal
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-gold/10 text-gold rounded-full text-xs font-semibold">
                      {item.category}
                    </span>
                    {item.dietary?.slice(0, 2).map((diet, idx) => (
                      <span key={idx} className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold">
                        {diet}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">No items found matching your search.</p>
            </div>
          )}
        </div>

        {/* Item Detail Modal */}
        {selectedItem && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              {/* Header Image */}
              <div className="relative h-80">
                <img
                  src={selectedItem.image}
                  alt={selectedItem.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

                <button
                  onClick={() => setSelectedItem(null)}
                  className="absolute top-6 right-6 w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all"
                >
                  <X className="w-6 h-6" />
                </button>

                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex items-center gap-3 mb-4">
                    {selectedItem.popular && (
                      <span className="px-4 py-2 bg-gold text-white rounded-full text-sm font-bold">
                        Popular Choice
                      </span>
                    )}
                    {selectedItem.isVeg && (
                      <span className="px-4 py-2 bg-green text-white rounded-full text-sm font-bold">
                        Vegetarian
                      </span>
                    )}
                  </div>
                  <h2 className="text-4xl font-bold text-white mb-2">{selectedItem.name}</h2>
                  <div className="flex items-center gap-4 text-white/90">
                    <div className="flex items-center gap-2">
                      <Star className="w-5 h-5 fill-gold text-gold" />
                      <span className="font-bold">{selectedItem.rating}</span>
                      <span>({selectedItem.reviews} reviews)</span>
                    </div>
                    {selectedItem.spiceLevel > 0 && (
                      <div className="flex items-center gap-2">
                        <Flame className="w-5 h-5 text-red-400" />
                        <span>Spice Level: {selectedItem.spiceLevel}/5</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                <div className="grid md:grid-cols-3 gap-8 mb-8">
                  <div className="md:col-span-2">
                    <h3 className="text-2xl font-bold text-green mb-4">Description</h3>
                    <p className="text-gray-700 leading-relaxed mb-6">{selectedItem.longDescription}</p>

                    {selectedItem.chefNote && (
                      <div className="bg-gold/10 border-l-4 border-gold p-4 rounded-lg mb-6">
                        <div className="flex items-start gap-3">
                          <ChefHat className="w-6 h-6 text-gold flex-shrink-0 mt-1" />
                          <div>
                            <p className="font-bold text-green mb-1">Chef's Note</p>
                            <p className="text-gray-700">{selectedItem.chefNote}</p>
                          </div>
                        </div>
                      </div>
                    )}

                    <h3 className="text-xl font-bold text-green mb-3">Ingredients</h3>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {selectedItem.ingredients.map((ingredient: string, idx: number) => (
                        <span key={idx} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm">
                          {ingredient}
                        </span>
                      ))}
                    </div>

                    {selectedItem.allergens.length > 0 && (
                      <>
                        <h3 className="text-xl font-bold text-green mb-3">Allergen Information</h3>
                        <div className="flex flex-wrap gap-2">
                          {selectedItem.allergens.map((allergen: string, idx: number) => (
                            <span key={idx} className="px-3 py-1 bg-red-50 text-red-700 rounded-lg text-sm font-semibold flex items-center gap-1">
                              <AlertCircle className="w-4 h-4" />
                              {allergen}
                            </span>
                          ))}
                        </div>
                      </>
                    )}
                  </div>

                  <div>
                    <div className="bg-gradient-to-br from-green/5 to-gold/5 rounded-2xl p-6 sticky top-4">
                      <h3 className="text-xl font-bold text-green mb-4">Nutrition Facts</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center pb-3 border-b">
                          <span className="text-gray-600">Serving Size</span>
                          <span className="font-bold text-green">{selectedItem.servingSize}</span>
                        </div>
                        <div className="flex justify-between items-center pb-3 border-b">
                          <span className="text-gray-600">Calories</span>
                          <span className="font-bold text-green">{selectedItem.calories}</span>
                        </div>
                        <div className="flex justify-between items-center pb-3 border-b">
                          <span className="text-gray-600">Protein</span>
                          <span className="font-bold text-green">{selectedItem.protein}</span>
                        </div>
                        <div className="flex justify-between items-center pb-3 border-b">
                          <span className="text-gray-600">Carbs</span>
                          <span className="font-bold text-green">{selectedItem.carbs}</span>
                        </div>
                        <div className="flex justify-between items-center pb-3 border-b">
                          <span className="text-gray-600">Fat</span>
                          <span className="font-bold text-green">{selectedItem.fat}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Prep Time</span>
                          <span className="font-bold text-green">{selectedItem.prepTime}</span>
                        </div>
                      </div>

                      {selectedItem.dietary.length > 0 && (
                        <div className="mt-6 pt-6 border-t">
                          <h4 className="font-bold text-green mb-3">Dietary</h4>
                          <div className="flex flex-wrap gap-2">
                            {selectedItem.dietary.map((diet: string, idx: number) => (
                              <span key={idx} className="px-3 py-1 bg-purple-100 text-purple-700 rounded-lg text-xs font-semibold">
                                {diet}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-4">
                  <button
                    onClick={() => {
                      toggleFavorite(selectedItem.id);
                    }}
                    className={`flex-1 px-6 py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${
                      favorites.includes(selectedItem.id)
                        ? 'bg-red-500 hover:bg-red-600 text-white'
                        : 'bg-gray-100 hover:bg-gray-200 text-green'
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${favorites.includes(selectedItem.id) ? 'fill-white' : ''}`} />
                    {favorites.includes(selectedItem.id) ? 'Remove from Favorites' : 'Add to Favorites'}
                  </button>
                  <button
                    onClick={() => shareItem(selectedItem)}
                    className="flex-1 px-6 py-4 bg-gold hover:bg-gold/90 text-white rounded-xl font-bold transition-all flex items-center justify-center gap-2"
                  >
                    <Share2 className="w-5 h-5" />
                    Share This Item
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CTA Section */}
        <div className="bg-gradient-to-br from-green to-green/90 text-white py-20 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold rounded-full blur-3xl"></div>
          </div>
          <div className="container mx-auto px-4 text-center relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Dine?</h2>
            <p className="text-2xl mb-10 text-white/90">Skip the wait with our smart queue system</p>
            <div className="flex flex-wrap gap-6 justify-center">
              <Link to="/booking" className="px-10 py-5 bg-gold hover:bg-gold/90 text-white rounded-xl font-bold text-lg transition-all shadow-2xl hover:shadow-gold/50">
                Book a Table
              </Link>
              <Link to="/queue" className="px-10 py-5 bg-white hover:bg-gray-50 text-green rounded-xl font-bold text-lg transition-all shadow-2xl">
                Join Queue
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

import { useState } from 'react';
import { Coffee, Flame, Leaf, Search, Star, Utensils, AlertCircle, Filter } from 'lucide-react';
import { Link } from 'react-router';
import Navigation from './Navigation';
import Footer from './Footer';

const menuData = {
  breakfast: {
    title: "Breakfast Buffet",
    time: "6:30 AM - 10:30 AM",
    color: "from-orange-400 to-red-500",
    items: [
      { name: "String Hoppers", description: "Traditional rice noodles with sambol", category: "Traditional", isVeg: true, popular: true, allergens: ["Gluten-Free"], dietary: ["Vegan"] },
      { name: "Hoppers / Egg Hoppers", description: "Crispy bowl-shaped pancakes", category: "Traditional", isVeg: false, popular: true, allergens: ["Eggs"], dietary: [] },
      { name: "Kiribath & Lunu Miris", description: "Milk rice with spicy onion relish", category: "Traditional", isVeg: true, allergens: ["Dairy"], dietary: ["Spicy"] },
      { name: "Dhal Curry", description: "Creamy lentil curry", category: "Curries", isVeg: true },
      { name: "Fish Curry", description: "Fresh catch of the day", category: "Curries", isVeg: false },
      { name: "Custom Omelette", description: "Made to order with your choice of fillings", category: "Live Station", isVeg: false, popular: true },
      { name: "Fried / Scrambled Eggs", description: "Cooked to perfection", category: "Live Station", isVeg: false },
      { name: "Boiled Eggs", description: "Soft or hard boiled", category: "Live Station", isVeg: false },
      { name: "Croissants", description: "Fresh baked pastries", category: "Bakery", isVeg: true },
      { name: "Toast & Spreads", description: "Various breads with butter, jam, honey", category: "Bakery", isVeg: true },
      { name: "Tropical Fruits", description: "Fresh seasonal selection", category: "Fruits", isVeg: true },
      { name: "Tea / Coffee / Juice", description: "Unlimited beverages", category: "Drinks", isVeg: true }
    ]
  },
  lunch: {
    title: "Lunch Buffet",
    time: "12:30 PM - 3:00 PM",
    color: "from-green-400 to-emerald-600",
    items: [
      { name: "Rice & Curry Varieties", description: "Multiple authentic Sri Lankan curries", category: "Main", isVeg: false, popular: true },
      { name: "Chicken Curry", description: "Traditional spiced chicken", category: "Curries", isVeg: false, popular: true },
      { name: "Fish Curry", description: "Coastal style preparation", category: "Curries", isVeg: false },
      { name: "Vegetable Curries", description: "Selection of fresh vegetable preparations", category: "Curries", isVeg: true },
      { name: "Fried Rice", description: "Aromatic mixed fried rice", category: "Main", isVeg: false },
      { name: "Noodles", description: "Stir-fried noodles", category: "Main", isVeg: false },
      { name: "Pasta Station", description: "Various sauces and toppings", category: "International", isVeg: false },
      { name: "Salad Bar", description: "Fresh greens and dressings", category: "Healthy", isVeg: true },
      { name: "Soup of the Day", description: "Chef's special creation", category: "Appetizers", isVeg: false },
      { name: "Watalappam", description: "Traditional coconut pudding", category: "Desserts", isVeg: true },
      { name: "Ice Cream", description: "Multiple flavors", category: "Desserts", isVeg: true, popular: true }
    ]
  },
  dinner: {
    title: "Dinner Buffet",
    time: "7:00 PM - 10:30 PM",
    color: "from-purple-400 to-pink-500",
    items: [
      { name: "Live Kottu Station", description: "Fresh made to order", category: "Live Station", isVeg: false, popular: true },
      { name: "Seafood Curries", description: "Fresh catch prepared multiple ways", category: "Curries", isVeg: false, popular: true },
      { name: "Roast Chicken", description: "Herb roasted whole chicken", category: "International", isVeg: false },
      { name: "Roast Beef", description: "Tender slow roasted", category: "International", isVeg: false },
      { name: "Pizza Selection", description: "Various toppings", category: "International", isVeg: false },
      { name: "Chinese Section", description: "Stir fries, fried rice, noodles", category: "Asian", isVeg: false },
      { name: "Soup & Starters", description: "Appetizer selection", category: "Appetizers", isVeg: false },
      { name: "Dessert Bar", description: "Cakes, puddings, and sweets", category: "Desserts", isVeg: true, popular: true },
      { name: "Fresh Fruit Platter", description: "Seasonal tropical fruits", category: "Desserts", isVeg: true }
    ]
  }
};

export default function MenuPage() {
  const [selectedMeal, setSelectedMeal] = useState<'breakfast' | 'lunch' | 'dinner'>('breakfast');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterVeg, setFilterVeg] = useState(false);
  const [filterVegan, setFilterVegan] = useState(false);
  const [filterGlutenFree, setFilterGlutenFree] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const currentMenu = menuData[selectedMeal];
  const filteredItems = currentMenu.items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesVeg = !filterVeg || item.isVeg;
    const matchesVegan = !filterVegan || (item.dietary && item.dietary.includes("Vegan"));
    const matchesGlutenFree = !filterGlutenFree || (item.allergens && item.allergens.includes("Gluten-Free"));
    return matchesSearch && matchesVeg && matchesVegan && matchesGlutenFree;
  });

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Header */}
      <div className={`bg-gradient-to-r ${currentMenu.color} text-white py-20 relative overflow-hidden`}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Buffet Menu</h1>
          <p className="text-2xl text-white/90">Unlimited dining experience with premium quality</p>
        </div>
      </div>

      {/* Meal Selection */}
      <div className="sticky top-0 bg-white shadow-md z-30">
        <div className="container mx-auto px-4">
          <div className="flex gap-2 py-4 overflow-x-auto">
            {(['breakfast', 'lunch', 'dinner'] as const).map((meal) => (
              <button
                key={meal}
                onClick={() => setSelectedMeal(meal)}
                className={`px-6 py-3 rounded-lg font-semibold whitespace-nowrap transition-all ${
                  selectedMeal === meal
                    ? 'bg-gold text-white shadow-lg'
                    : 'bg-gray-100 text-green hover:bg-gray-200'
                }`}
              >
                <div className="flex items-center gap-2">
                  {meal === 'breakfast' && <Coffee className="w-4 h-4" />}
                  {meal === 'lunch' && <Utensils className="w-4 h-4" />}
                  {meal === 'dinner' && <Flame className="w-4 h-4" />}
                  {menuData[meal].title}
                </div>
                <div className="text-xs opacity-75 mt-1">{menuData[meal].time}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search menu items..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gold"
                />
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="px-6 py-3 rounded-lg font-semibold flex items-center gap-2 bg-gray-100 text-green hover:bg-gray-200 transition-all"
              >
                <Filter className="w-4 h-4" />
                Dietary Filters
                {(filterVeg || filterVegan || filterGlutenFree) && (
                  <span className="px-2 py-0.5 bg-gold text-white rounded-full text-xs">
                    {[filterVeg, filterVegan, filterGlutenFree].filter(Boolean).length}
                  </span>
                )}
              </button>
            </div>

            {showFilters && (
              <div className="flex flex-wrap gap-3 p-4 bg-gray-50 rounded-lg">
                <button
                  onClick={() => setFilterVeg(!filterVeg)}
                  className={`px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition-all ${
                    filterVeg ? 'bg-green text-white' : 'bg-white text-green border hover:bg-gray-50'
                  }`}
                >
                  <Leaf className="w-4 h-4" />
                  Vegetarian
                </button>
                <button
                  onClick={() => setFilterVegan(!filterVegan)}
                  className={`px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition-all ${
                    filterVegan ? 'bg-green text-white' : 'bg-white text-green border hover:bg-gray-50'
                  }`}
                >
                  <Leaf className="w-4 h-4" />
                  Vegan
                </button>
                <button
                  onClick={() => setFilterGlutenFree(!filterGlutenFree)}
                  className={`px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition-all ${
                    filterGlutenFree ? 'bg-green text-white' : 'bg-white text-green border hover:bg-gray-50'
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
                    className="px-4 py-2 rounded-lg font-semibold text-gray-600 hover:text-green transition-all"
                  >
                    Clear All
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-green mb-2">{currentMenu.title}</h2>
          <p className="text-gray-600">{currentMenu.time}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all p-6">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-bold text-green">{item.name}</h3>
                    {item.popular && <Star className="w-4 h-4 text-gold fill-gold" />}
                  </div>
                  <p className="text-gray-600 text-sm mb-3">{item.description}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-3 py-1 bg-gold/10 text-gold rounded-full text-xs font-semibold">
                  {item.category}
                </span>
                {item.isVeg && (
                  <span className="px-3 py-1 bg-green/10 text-green rounded-full text-xs font-semibold flex items-center gap-1">
                    <Leaf className="w-3 h-3" />
                    Veg
                  </span>
                )}
                {item.dietary && item.dietary.map((diet, idx) => (
                  <span key={idx} className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold">
                    {diet}
                  </span>
                ))}
                {item.allergens && item.allergens.length > 0 && (
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {item.allergens.join(', ')}
                  </span>
                )}
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

      <Footer />
    </div>
  );
}

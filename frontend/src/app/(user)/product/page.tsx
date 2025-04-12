'use client'
import { useState } from 'react'
import { Search, Filter, Heart, ShoppingCart } from 'lucide-react'
import Image from 'next/image'

export default function Product() {
  const [products] = useState([
    {
      id: 1,
      name: 'Paracetamol 500mg',
      price: '₹99',
      category: 'Pain Relief',
      description: 'Fever and pain relief medication',
      image: '/UserProduct/paracetamol.jpeg',
      inStock: true
    },
    {
      id: 2,
      name: 'Vitamin C 1000mg',
      price: '₹199',
      category: 'Vitamins',
      description: 'Immunity booster supplement',
      image: '/userproduct/vitamin-c.jpeg',
      inStock: true
    },
    {
      id: 3,
      name: 'Vitamin C 1000mg',
      price: '₹199',
      category: 'Vitamins',
      description: 'Immunity booster supplement',
      image: '/userproduct/vitamin-c.jpeg',
      inStock: true
    },
    {
      id: 4,
      name: 'Vitamin C 1000mg',
      price: '₹199',
      category: 'Vitamins',
      description: 'Immunity booster supplement',
      image: '/userproduct/vitamin-c.jpeg',
      inStock: true
    },
    {
      id: 5,
      name: 'Paracetamol 500mg',
      price: '₹99',
      category: 'Pain Relief',
      description: 'Fever and pain relief medication',
      image: '/UserProduct/paracetamol.jpeg',
      inStock: true
    },
      // Items will be added dynamically here
  ])

  const categories = ['All', 'Pain Relief', 'Vitamins', 'First Aid', 'Antibiotics', 'Skincare']
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="container mx-auto px-4 py-8 bg-cyan-50">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Our Products</h1>
        <p className="text-gray-600">Browse through our wide range of pharmaceutical products</p>
      </div>

      {/* Search and Filter Section */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          <Filter size={20} className="text-gray-500" />
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative h-48 bg-gray-200">
              {/*  to be replace with actual Image component */}
              <Image
                src={product.image}
                alt={product.name}
                layout="fill" 
                objectFit="cover" 
              />
              <div className="absolute top-2 right-2">
                <button className="p-2 rounded-full bg-white text-gray-600 hover:text-red-500">
                  <Heart size={20} />
                </button>
              </div>
            </div>
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium text-gray-800">{product.name}</h3>
                <span className="text-blue-600 font-bold">{product.price}</span>
              </div>
              <p className="text-sm text-gray-500 mb-4">{product.description}</p>
              <div className="flex items-center justify-between">
                <span className={`text-sm ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
                  {product.inStock ? 'In Stock' : 'Out of Stock'}
                </span>
                <button
                  className={`flex items-center gap-2 px-4 py-2 rounded ${
                    product.inStock
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                  disabled={!product.inStock}
                >
                  <ShoppingCart size={18} />
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
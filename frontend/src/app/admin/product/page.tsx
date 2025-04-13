'use client'
import { useState } from 'react'
import {
  Package,
  Search,
  Plus,
  Edit,
  Trash2,
  Filter,
  Image as ImageIcon
} from 'lucide-react'
import Image from 'next/image'

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterCategory, setFilterCategory] = useState('all')

  const [products] = useState([
    {
      id: 1,
      name: 'Paracetamol 500mg',
      category: 'Pain Relief',
      price: '₹99',
      description: 'Effective pain relief medication',
      image: '/admin/products/paracetamol.jpeg',
      isPublished: true,
      requiresPrescription: false
    },
    {
      id: 2,
      name: 'Vitamin C 1000mg',
      category: 'Vitamins',
      price: '₹199',
      description: 'Immunity booster supplement',
      image: '/admin/products/vitamin-c.jpeg',
      isPublished: true,
      requiresPrescription: false
    }
  ])

  const categories = ['all', 'Pain Relief', 'Vitamins', 'Antibiotics', 'First Aid', 'Skincare']

  return (
    <div className="p-6 bg-blue-100 min-h-screen">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <Package size={24} />
          Products Management
        </h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700">
          <Plus size={20} />
          Add New Product
        </button>
      </div>

      {/* Search and Filter */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-800"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter size={20} className="text-gray-500" />
            <select
              className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 text-gray-800"
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="relative h-48 bg-gray-100">
              {product.image ? (
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <ImageIcon size={48} className="text-gray-300" />
                </div>
              )}
            </div>
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium text-gray-800">{product.name}</h3>
                <span className="text-blue-600 font-bold">{product.price}</span>
              </div>
              <p className="text-sm text-gray-500 mb-4">{product.description}</p>
              <div className="flex items-center justify-between">
                <span className={`text-sm px-2 py-1 rounded-full ${
                  product.isPublished ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {product.isPublished ? 'Published' : 'Draft'}
                </span>
                <div className="flex gap-2">
                  <button className="p-2 text-blue-600 hover:bg-blue-50 rounded">
                    <Edit size={18} />
                  </button>
                  <button className="p-2 text-red-600 hover:bg-red-50 rounded">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
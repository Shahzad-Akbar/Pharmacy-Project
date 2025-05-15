'use client'
import { useState, useEffect } from 'react'
import { Search, Filter, ShoppingCart, Heart } from 'lucide-react'
import Image from 'next/image'
import axios from 'axios'
import toast from 'react-hot-toast'
import Link from 'next/link'

interface Product {
  _id: string
  name: string
  price: number
  description: string
  category: string
  image: string
  requiresPrescription: boolean
  stock: number
}

export default function ProductPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [filterCategory, setFilterCategory] = useState('all')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [wishlistItems, setWishlistItems] = useState<string[]>([])
  const [loadingCartItems, setLoadingCartItems] = useState<string[]>([])

  const categories = ['all', 'Pain Relief', 'Vitamins', 'Antibiotics', 'First Aid', 'Skincare']

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products/get-products')
        setProducts(response.data)
        setLoading(false)
      } catch (err) {
        setError('Failed to fetch products')
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = filterCategory === 'all' || product.category === filterCategory
    return matchesSearch && matchesCategory
  })

  const addToCart = async (productId: string) => {
    try {
      const token = localStorage.getItem('token')
      if (!token) {
        toast.error('Please login to add items to cart')
        return
      }

      setLoadingCartItems(prev => [...prev, productId])

      await axios.post('http://localhost:5000/api/cart/add', 
        { productId, quantity: 1 },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      
      toast.success('Product added to cart successfully')
    } catch (error) {
      toast.error('Failed to add product to cart')
      console.error('Failed to add to cart:', error)
    } finally {
      setLoadingCartItems(prev => prev.filter(id => id !== productId))
    }
  }

  const toggleWishlist = async (productId: string) => {
    try {
      const token = localStorage.getItem('token')
      if (!token) {
        alert('Please login to add items to wishlist')
        setError('Please login to add items to wishlist')
        return
      }

      if (wishlistItems.includes(productId)) {
        // Fixed DELETE request configuration
        await axios.delete(`http://localhost:5000/api/users/wishlist/${productId}`, {
          headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        })
        setWishlistItems(wishlistItems.filter(id => id !== productId))
      } else {
        await axios.post(
          `http://localhost:5000/api/users/wishlist/${productId}`,
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        )
        setWishlistItems([...wishlistItems, productId])
      }
    } catch (error) {
      console.error('Failed to update wishlist:', error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-cyan-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading products...</p>
        </div>
      </div>
    )
  }

  if (error) {
    alert(error)
    return (
      <div className="min-h-screen bg-cyan-50 flex items-center justify-center">
        <div className="text-center text-red-600">
          <p>{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-cyan-50 p-6">
      <div className="max-w-7xl mx-auto">
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
          {filteredProducts.map((product) => (
            <div key={product._id} className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="relative h-48">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-medium text-gray-800 mb-2">{product.name}</h3>
                <p className="text-sm text-gray-500 mb-2">{product.description}</p>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-blue-600 font-bold">₹{product.price}</span>
                  {product.requiresPrescription && (
                    <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                      Prescription Required
                    </span>
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => addToCart(product._id)}
                    disabled={product.stock === 0 || loadingCartItems.includes(product._id)}
                    className={`flex-1 py-2 rounded-lg flex items-center justify-center gap-2 ${
                      product.stock > 0
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    <ShoppingCart size={18} className={loadingCartItems.includes(product._id) ? 'animate-spin' : ''} />
                    {loadingCartItems.includes(product._id) 
                      ? 'Adding...' 
                      : product.stock > 0 
                        ? 'Add to Cart' 
                        : 'Out of Stock'
                    }
                  </button>
                  <button
                    onClick={() => toggleWishlist(product._id)}
                    className={`p-2 rounded-lg ${
                      wishlistItems.includes(product._id)
                        ? 'text-red-600 bg-red-50'
                        : 'text-gray-400 hover:text-red-600 hover:bg-red-50'
                    }`}
                  >
                    <Heart
                      size={18}
                      fill={wishlistItems.includes(product._id) ? 'currentColor' : 'none'}
                    />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No products found</p>
          </div>
        )}
        <div className='bottom-0 right-1'>
        <Link 
          href="/cart"
          className=" flex items-center gap-2 bg-gradient-to-r from-cyan-600 to-blue-400 hover:from-blue-400 hover:to-cyan-500
                     text-white px-6 py-3 rounded-lg shadow-lg hover:shadow-xl  sm:m-[50px]  sm:px-8 sm:py-2 md:mx-50 md:my:20 md:px-12 
                     md:py-3 lg:ml-240 lg:mr-5 lg:mt-5 lg:py-4"
        >
          <ShoppingCart size={24} className="sm:w-5 md:w-6" />
          <span className="font-medium sm:text-sm md:text-base">View Cart</span>
        </Link>

        </div>
      </div>
    </div>
  )
}

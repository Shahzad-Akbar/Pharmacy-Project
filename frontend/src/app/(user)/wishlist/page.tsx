'use client'
import { useState, useEffect } from 'react'
import { Heart, Trash2, ShoppingCart, ShoppingBag } from 'lucide-react'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

interface WishlistItem {
  _id: string
  name: string
  price: number
  image: string
  stock: number
  description: string
  category: string
}

export default function WishlistPage() {
  const router = useRouter()
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([])
  const [loading, setLoading] = useState(true)
  const [loadingCartItems, setLoadingCartItems] = useState<string[]>([])

  useEffect(() => {
    fetchWishlist()
  }, [])

  const fetchWishlist = async () => {
    try {
      const token = localStorage.getItem('token')
      if (!token) {
        toast.error('Please login to view your wishlist')
        return
      }

      const response = await axios.get('http://localhost:5000/api/users/wishlist', {
        headers: { Authorization: `Bearer ${token}` }
      })
      setWishlistItems(response.data.wishlist)
      console.log('Wishlist fetched:', response.data)
    } catch (error) {
      toast.error('Failed to fetch wishlist')
      console.error('Error fetching wishlist:', error)
    } finally {
      setLoading(false)
    }
  }

  const removeFromWishlist = async (productId: string) => {
    try {
      const token = localStorage.getItem('token')
      if (!token) return

      await axios.delete(`http://localhost:5000/api/users/wishlist/${productId}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setWishlistItems(prev => prev.filter(item => item._id !== productId))      
      toast.success('Item removed from wishlist')
    } catch (error) {
      toast.error('Failed to remove item from wishlist')
      console.error('Error removing from wishlist:', error)
    }
  }

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

  const viewCart = () => {
    router.push('/cart')
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 bg-cyan-100 min-h-screen">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold mb-6 flex items-center gap-2 text-gray-800">
            <Heart className="text-red-500" size={24} />
            Loading Wishlist...
          </h1>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-cyan-100 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold flex items-center gap-2 text-gray-800">
            <Heart className="text-red-500" size={24} />
            My Wishlist
          </h1>
          <button
            onClick={viewCart}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <ShoppingBag size={20} />
            View Cart
          </button>
        </div>

        {wishlistItems.length === 0 ? (
          <div className="bg-white rounded-lg p-8 text-center">
            <p className="text-gray-600">Your wishlist is empty</p>
          </div>
        ) : (
          <div className="space-y-4">
            {wishlistItems.map((item) => (
              <div key={item._id} className="bg-white rounded-lg p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 bg-gray-100 rounded-md overflow-hidden">
                    {item.image && (
                      <Image 
                        src={item.image.trim()}
                        alt={item.name}
                        width={80}
                        height={80}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800">{item.name}</h3>
                    <p className="text-blue-600 font-bold">₹{item.price}</p>
                    <p className={`text-sm ${item.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {item.stock > 0 ? 'In Stock' : 'Out of Stock'}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button 
                    className={`p-2 rounded ${item.stock > 0 ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-200 text-gray-400'}`}
                    disabled={item.stock === 0 || loadingCartItems.includes(item._id)}
                    onClick={() => addToCart(item._id)}
                  >
                    <ShoppingCart size={20} />
                  </button>
                  <button 
                    className="p-2 rounded bg-red-100 text-red-600 hover:bg-red-200"
                    onClick={() => removeFromWishlist(item._id)}
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
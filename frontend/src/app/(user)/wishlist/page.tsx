'use client'
import { useState } from 'react'
import { Heart, Trash2, ShoppingCart } from 'lucide-react'

export default function WishlistPage() {
  const [wishlistItems] = useState([
    {
      id: 1,
      name: 'Paracetamol 500mg',
      price: '₹99',
      image: '/medicines/paracetamol.jpg',
      stock: 'In Stock'
    },
    {
      id: 2,
      name: 'Vitamin C 1000mg',
      price: '₹199',
      image: '/medicines/vitamin-c.jpg',
      stock: 'Out of Stock'
    }
  ])

  return (
    <div className="container mx-auto px-4 py-8 bg-cyan-100">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 flex items-center gap-2 text-gray-800">
          <Heart className="text-red-500" size={24} />
          My Wishlist
        </h1>

        <div className="space-y-4">
          {wishlistItems.map((item) => (
            <div key={item.id} className="bg-white rounded-lg p-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 bg-gray-100 rounded-md"></div>
                <div>
                  <h3 className="font-medium text-gray-800">{item.name}</h3>
                  <p className="text-blue-600 font-bold">{item.price}</p>
                  <p className={`text-sm ${item.stock === 'In Stock' ? 'text-green-600' : 'text-red-600'}`}>
                    {item.stock}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <button 
                  className={`p-2 rounded ${item.stock === 'In Stock' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-400'}`}
                  disabled={item.stock !== 'In Stock'}
                >
                  <ShoppingCart size={20} />
                </button>
                <button className="p-2 rounded bg-red-100 text-red-600">
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
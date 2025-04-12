'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react'
import Image from 'next/image'

export default function CartPage() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Paracetamol 500mg',
      price: 99,
      quantity: 2,
      img: '/cart/paracetamol.jpeg',
      maxQuantity: 5
    },
    {
      id: 2,
      name: 'Vitamin C 1000mg',
      price: 199,
      quantity: 1,
      img: '/cart/vitamin-c.jpeg',
      maxQuantity: 3
    }
  ])

  const updateQuantity = (id: number, newQuantity: number) => {
    setCartItems(cartItems.map(item => 
      item.id === id && newQuantity > 0 && newQuantity <= item.maxQuantity
        ? { ...item, quantity: newQuantity }
        : item
    ))
  }

  const removeItem = (id: number) => {
    setCartItems(cartItems.filter(item => item.id !== id))
  }

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const deliveryCharge = 40
  const total = subtotal + deliveryCharge

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center bg-cyan-50">
        <ShoppingBag size={64} className="mx-auto text-gray-300 mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Your cart is empty</h2>
        <p className="text-gray-600 mb-8">Looks like you haven&apos;t added any items to your cart yet.</p>
        <Link 
          href="/product" 
          className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
        >
          Continue Shopping
          <ArrowRight size={20} />
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-cyan-50">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-8 flex items-center gap-2 text-gray-800">
          <ShoppingBag className="text-blue-600" size={24} />
          Shopping Cart ({cartItems.length} items)
        </h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="flex-grow space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="bg-white rounded-lg p-4 flex items-center gap-4">
                <div className="w-20 h-20 bg-gray-100 rounded-md">
                  <Image
                    src={item.img}
                    alt={item.name}    
                    height={200}
                    width={200}        
                    className="w-full h-full object-cover rounded-md"
                  />
                </div>
                <div className="flex-grow">
                  <h3 className="font-medium text-gray-800">{item.name}</h3>
                  <p className="text-blue-600 font-bold">₹{item.price}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="p-1 rounded bg-gray-100 text-gray-600 hover:bg-gray-200"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="p-1 rounded bg-gray-100 text-gray-600 hover:bg-gray-200"
                    disabled={item.quantity >= item.maxQuantity}
                  >
                    <Plus size={16} />
                  </button>
                </div>
                <button
                  onClick={() => removeItem(item.id)}
                  className="p-2 rounded text-red-600 hover:bg-red-50"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:w-80">
            <div className="bg-white rounded-lg p-6">
              <h2 className="text-lg font-bold mb-4 text-gray-800">Order Summary</h2>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className='text-gray-800'>₹{subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Delivery Charge</span>
                  <span className='text-gray-800'>₹{deliveryCharge}</span>
                </div>
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between font-bold">
                    <span className='text-gray-800'>Total</span>
                    <span className='text-gray-800'>₹{total}</span>
                  </div>
                </div>
              </div>
              <button className="w-full mt-6 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
                Proceed to Checkout
              </button>
              <Link 
                href="/product" 
                className="w-full mt-2 text-center text-blue-600 text-sm hover:underline block"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
'use client'
import { useState } from 'react'
import Image from 'next/image'
import { Phone, MapPin, Clock, CreditCard, ImageUp } from 'lucide-react'

export default function CheckoutPage() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    deliveryTime: 'morning',
    paymentScreenshot: null
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle order submission
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-cyan-50">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-8 text-gray-800">Checkout</h1>

        {/* Progress Steps */}
        <div className="flex justify-between mb-8">
          <div className={`flex-1 text-center ${step >= 1 ? 'text-blue-600' : 'text-gray-400'}`}>
            <div className="w-8 h-8 rounded-full border-2 mx-auto flex items-center justify-center mb-2">1</div>
            Details
          </div>
          <div className={`flex-1 text-center ${step >= 2 ? 'text-blue-600' : 'text-gray-400'}`}>
            <div className="w-8 h-8 rounded-full border-2 mx-auto flex items-center justify-center mb-2">2</div>
            Payment
          </div>
          <div className={`flex-1 text-center ${step === 3 ? 'text-blue-600' : 'text-gray-400'}`}>
            <div className="w-8 h-8 rounded-full border-2 mx-auto flex items-center justify-center mb-2">3</div>
            Confirmation
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Step 1: Delivery Details */}
          {step === 1 && (
            <div className="bg-white rounded-lg p-6 shadow-md text-gray-800">
              <h2 className="text-xl font-semibold mb-4">Delivery Details</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Phone Number</label>
                  <div className="flex items-center">
                    <Phone size={20} className="text-gray-400 mr-2" />
                    <input
                      type="tel"
                      required
                      className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Delivery Address</label>
                  <div className="flex items-start">
                    <MapPin size={20} className="text-gray-400 mr-2 mt-2" />
                    <textarea
                      required
                      className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                      rows={3}
                      value={formData.address}
                      onChange={(e) => setFormData({...formData, address: e.target.value})}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Preferred Delivery Time</label>
                  <div className="flex items-center">
                    <Clock size={20} className="text-gray-400 mr-2" />
                    <select
                      className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                      value={formData.deliveryTime}
                      onChange={(e) => setFormData({...formData, deliveryTime: e.target.value})}
                    >
                      <option value="morning">Morning (9 AM - 12 PM)</option>
                      <option value="afternoon">Afternoon (12 PM - 4 PM)</option>
                      <option value="evening">Evening (4 PM - 8 PM)</option>
                    </select>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                >
                  Continue to Payment
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Payment */}
          {step === 2 && (
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Payment Details</h2>
              <div className="space-y-4">
                <div className="text-center">
                  <p className="text-gray-600 mb-4">Scan the QR code to make payment</p>
                  <div className="max-w-xs mx-auto mb-4">
                    <Image
                      src="/qr/payment-qr.jpg"
                      alt="Payment QR Code"
                      width={250}
                      height={250}
                      className="rounded-lg"
                    />
                  </div>
                  <p className="text-sm text-gray-500 mb-4">
                    After payment, please upload the screenshot for verification
                  </p>
                  <div className="relative">
                    <div className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500">
                      <ImageUp size={20} />
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) {
                          setFormData({...formData, paymentScreenshot: file})
                        }
                      }}
                      className="w-full pl-10 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-800"
                    />
                  </div>
                </div>
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="flex-1 bg-gray-100 text-gray-600 py-2 rounded-lg hover:bg-gray-200"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                  >
                    Confirm Payment
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Confirmation */}
          {step === 3 && (
            <div className="bg-white rounded-lg p-6 shadow-md text-center">
              <div className="mb-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CreditCard size={32} className="text-green-600" />
                </div>
                <h2 className="text-xl font-semibold mb-2 text-green-400">Order Placed Successfully!</h2>
                <p className="text-gray-600">
                  Thank you for your order. We will verify your payment and process your order soon.
                </p>
              </div>
              <div className="space-y-4">
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                >
                  View Order Details
                </button>
                <button
                  type="button"
                  onClick={() => window.location.href = '/product'}
                  className="w-full bg-gray-100 text-gray-600 py-2 rounded-lg hover:bg-gray-200"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  )
}

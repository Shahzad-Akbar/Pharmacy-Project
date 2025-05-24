'use client'
import { useState, useEffect } from 'react'
import axios from 'axios'
import {
  Settings,
  User,
  Store,
  CreditCard,
  Truck,
  Database,
  ChevronRight,
  Save
} from 'lucide-react'

interface StoreSettings {
  name: string
  email: string
  phone: string
  address: string
  taxRate: number
  currency: string
  deliverySettings: {
    enableDelivery: boolean
    deliveryRadius: number
    minimumOrder: number
    deliveryFee: number
    freeDeliveryAbove: number
  }
  paymentSettings: {
    enableCashOnDelivery: boolean
    enableOnlinePayment: boolean
    merchantId: string
    apiKey: string
  }
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [storeSettings, setStoreSettings] = useState<StoreSettings>({
    name: '',
    email: '',
    phone: '',
    address: '',
    taxRate: 0,
    currency: 'INR',
    deliverySettings: {
      enableDelivery: true,
      deliveryRadius: 0,
      minimumOrder: 0,
      deliveryFee: 0,
      freeDeliveryAbove: 0
    },
    paymentSettings: {
      enableCashOnDelivery: true,
      enableOnlinePayment: true,
      merchantId: '',
      apiKey: ''
    }
  })

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    const token = localStorage.getItem('token')
    try {
      setLoading(true)
      const response = await axios.get('http://localhost:5000/api/store-settings', {
        headers: { Authorization: `Bearer ${token}` }
      })
      setStoreSettings(response.data)
      setError('')
    } catch (err) {
      setError('Failed to fetch settings')
      console.error('Error fetching settings:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleSaveSettings = async () => {
    const token = localStorage.getItem('token')
    try {
      setLoading(true)
      await axios.put('http://localhost:5000/api/store-settings',
        storeSettings,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )
      setError('')
    } catch (err) {
      setError('Failed to save settings')
      console.error('Error saving settings:', err)
    } finally {
      setLoading(false)
    }
  }

  const tabs = [
    { id: 'profile', label: 'Profile Settings', icon: User },
    { id: 'store', label: 'Store Settings', icon: Store },
    { id: 'payment', label: 'Payment Settings', icon: CreditCard },
    { id: 'delivery', label: 'Delivery Settings', icon: Truck },
    { id: 'system', label: 'System Settings', icon: Database }
  ]

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>
  }

  return (
    <div className="p-6 bg-blue-100 min-h-screen">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <Settings size={24} />
          Settings
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-4">
          <nav className="space-y-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`w-full flex items-center justify-between p-3 rounded-lg text-left ${
                  activeTab === tab.id
                    ? 'bg-blue-50 text-blue-600'
                    : 'hover:bg-gray-50 text-gray-600'
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                <div className="flex items-center gap-3">
                  <tab.icon size={20} />
                  <span>{tab.label}</span>
                </div>
                <ChevronRight size={16} />
              </button>
            ))}
          </nav>
        </div>

        <div className="md:col-span-3 bg-white rounded-lg shadow-sm p-6">
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-800">Profile Settings</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    className="text-black w-full p-2 border rounded-lg"
                    value={storeSettings.name}
                    onChange={(e) => setStoreSettings({...storeSettings, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    className="text-black w-full p-2 border rounded-lg"
                    value={storeSettings.email}
                    onChange={(e) => setStoreSettings({...storeSettings, email: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    className="text-black w-full p-2 border rounded-lg"
                    value={storeSettings.phone}
                    onChange={(e) => setStoreSettings({...storeSettings, phone: e.target.value})}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address
                  </label>
                  <textarea
                    className="text-black w-full p-2 border rounded-lg"
                    rows={3}
                    value={storeSettings.address}
                    onChange={(e) => setStoreSettings({...storeSettings, address: e.target.value})}
                  />
                </div>
              </div>
            </div>
          )}
          {activeTab === 'store' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-800">Store Settings</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Store Name
                  </label>
                  <input
                    type="text"
                    className="text-black w-full p-2 border rounded-lg"
                    value={storeSettings.name}
                    onChange={(e) => setStoreSettings({...storeSettings, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    className="text-black w-full p-2 border rounded-lg"
                    value={storeSettings.email}
                    onChange={(e) => setStoreSettings({...storeSettings, email: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    className="text-black w-full p-2 border rounded-lg"
                    value={storeSettings.phone}
                    onChange={(e) => setStoreSettings({...storeSettings, phone: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tax Rate (%)
                  </label>
                  <input
                    type="number"
                    className="text-black w-full p-2 border rounded-lg"
                    value={storeSettings.taxRate}
                    onChange={(e) => setStoreSettings({...storeSettings, taxRate: Number(e.target.value)})}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address
                  </label>
                  <textarea
                    className="text-black w-full p-2 border rounded-lg"
                    rows={3}
                    value={storeSettings.address}
                    onChange={(e) => setStoreSettings({...storeSettings, address: e.target.value})}
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'delivery' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-800">Delivery Settings</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={storeSettings.deliverySettings.enableDelivery}
                      onChange={(e) => setStoreSettings({
                        ...storeSettings,
                        deliverySettings: {
                          ...storeSettings.deliverySettings,
                          enableDelivery: e.target.checked
                        }
                      })}
                      className="form-checkbox h-5 w-5 text-blue-600"
                    />
                    <span>Enable Delivery</span>
                  </label>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Delivery Radius (km)
                  </label>
                  <input
                    type="number"
                    className="text-black w-full p-2 border rounded-lg"
                    value={storeSettings.deliverySettings.deliveryRadius}
                    onChange={(e) => setStoreSettings({
                      ...storeSettings,
                      deliverySettings: {
                        ...storeSettings.deliverySettings,
                        deliveryRadius: Number(e.target.value)
                      }
                    })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Minimum Order
                  </label>
                  <input
                    type="number"
                    className="text-black w-full p-2 border rounded-lg"
                    value={storeSettings.deliverySettings.minimumOrder}
                    onChange={(e) => setStoreSettings({
                      ...storeSettings,
                      deliverySettings: {
                        ...storeSettings.deliverySettings,
                        minimumOrder: Number(e.target.value)
                      }
                    })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Delivery Fee
                  </label>
                  <input
                    type="number"
                    className="text-black w-full p-2 border rounded-lg"
                    value={storeSettings.deliverySettings.deliveryFee}
                    onChange={(e) => setStoreSettings({
                      ...storeSettings,
                      deliverySettings: {
                        ...storeSettings.deliverySettings,
                        deliveryFee: Number(e.target.value)
                      }
                    })}
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'payment' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-800">Payment Settings</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={storeSettings.paymentSettings.enableCashOnDelivery}
                      onChange={(e) => setStoreSettings({
                        ...storeSettings,
                        paymentSettings: {
                          ...storeSettings.paymentSettings,
                          enableCashOnDelivery: e.target.checked
                        }
                      })}
                      className="form-checkbox h-5 w-5 text-blue-600"
                    />
                    <span>Enable Cash on Delivery</span>
                  </label>
                </div>
                <div>
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={storeSettings.paymentSettings.enableOnlinePayment}
                      onChange={(e) => setStoreSettings({
                        ...storeSettings,
                        paymentSettings: {
                          ...storeSettings.paymentSettings,
                          enableOnlinePayment: e.target.checked
                        }
                      })}
                      className="form-checkbox h-5 w-5 text-blue-600"
                    />
                    <span>Enable Online Payment</span>
                  </label>
                </div>
                {storeSettings.paymentSettings.enableOnlinePayment && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Merchant ID
                      </label>
                      <input
                        type="text"
                        className="w-full p-2 border rounded-lg"
                        value={storeSettings.paymentSettings.merchantId}
                        onChange={(e) => setStoreSettings({
                          ...storeSettings,
                          paymentSettings: {
                            ...storeSettings.paymentSettings,
                            merchantId: e.target.value
                          }
                        })}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        API Key
                      </label>
                      <input
                        type="password"
                        className="w-full p-2 border rounded-lg"
                        value={storeSettings.paymentSettings.apiKey}
                        onChange={(e) => setStoreSettings({
                          ...storeSettings,
                          paymentSettings: {
                            ...storeSettings.paymentSettings,
                            apiKey: e.target.value
                          }
                        })}
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

          <div className="mt-6 flex justify-end">
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700"
              onClick={handleSaveSettings}
              disabled={loading}
            >
              <Save size={20} />
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
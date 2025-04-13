'use client'
import { useState } from 'react'
import {
  Settings,
  User,
  Store,
  CreditCard,
  Bell,
  Users,
  Truck,
  Database,
  ChevronRight,
  Save
} from 'lucide-react'

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile')
  const [storeSettings, setStoreSettings] = useState({
    name: 'MyPharmacy',
    email: 'contact@mypharmacy.com',
    phone: '+91 98765 43210',
    address: '123 Health Street, Medical District',
    taxRate: '18',
    currency: 'INR'
  })

  const [notificationSettings, setNotificationSettings] = useState({
    lowStockAlert: true,
    newOrderAlert: true,
    expiryAlert: true,
    emailNotifications: true,
    smsNotifications: false
  })

  const tabs = [
    { id: 'profile', label: 'Profile Settings', icon: User },
    { id: 'store', label: 'Store Settings', icon: Store },
    { id: 'payment', label: 'Payment Settings', icon: CreditCard },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'users', label: 'User Management', icon: Users },
    { id: 'delivery', label: 'Delivery Settings', icon: Truck },
    { id: 'system', label: 'System Settings', icon: Database }
  ]

  return (
    <div className="p-6 bg-blue-100 min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <Settings size={24} />
          Settings
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Settings Navigation */}
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

        {/* Settings Content */}
        <div className="md:col-span-3 bg-white rounded-lg shadow-sm p-6">
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
                    className="w-full p-2 border rounded-lg"
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
                    className="w-full p-2 border rounded-lg"
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
                    className="w-full p-2 border rounded-lg"
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
                    className="w-full p-2 border rounded-lg"
                    value={storeSettings.taxRate}
                    onChange={(e) => setStoreSettings({...storeSettings, taxRate: e.target.value})}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address
                  </label>
                  <textarea
                    className="w-full p-2 border rounded-lg"
                    rows={3}
                    value={storeSettings.address}
                    onChange={(e) => setStoreSettings({...storeSettings, address: e.target.value})}
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-800">Notification Settings</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-800">Low Stock Alerts</h3>
                    <p className="text-sm text-gray-500">Get notified when products are running low</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={notificationSettings.lowStockAlert}
                      onChange={(e) => setNotificationSettings({
                        ...notificationSettings,
                        lowStockAlert: e.target.checked
                      })}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                {/* Add more notification settings similarly */}
              </div>
            </div>
          )}

          {/* Add other tab contents similarly */}

          <div className="mt-6 flex justify-end">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700">
              <Save size={20} />
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
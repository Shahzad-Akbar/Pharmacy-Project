'use client'
import { useState } from 'react'
import Link from 'next/link'
import {
  ShoppingBag,
  Package,
  Clock,
  Heart,
  Pill,
  Bell,
  Calendar,
  AlertCircle,
} from 'lucide-react'

export default function UserDashboard() {
  const [notifications] = useState([
    { id: 1, message: 'Your order #123 has been shipped', time: '2 hours ago' },
    { id: 2, message: 'New products available in store', time: '5 hours ago' },
  ])

  const [recentOrders] = useState([
    { id: '#123', date: '2024-02-20', status: 'Delivered', amount: '₹299' },
    { id: '#124', date: '2024-02-18', status: 'Processing', amount: '₹599' },
  ])

  const quickActions = [
    { icon: ShoppingBag, label: 'New Order', href: '/product' },
    { icon: Heart, label: 'Wishlist', href: '/wishlist' },
    { icon: Package, label: 'Track Order', href: '/orders' },
    { icon: Pill, label: 'Prescriptions', href: '/prescriptions' },
  ]

  const stats = [
    { icon: Package, label: 'Total Orders', value: '12' },
    { icon: Clock, label: 'Pending Orders', value: '2' },
    { icon: Calendar, label: 'Last Order', value: '2 days ago' },
    { icon: AlertCircle, label: 'Active Prescriptions', value: '3' },
  ]

  return (
    <div className="container mx-auto px-4 py-8 bg-cyan-200">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-blue-500 to-cyan-400 rounded-lg p-6 text-white">
          <h1 className="text-2xl font-bold">Welcome back, Shahzad!</h1>
          <p className="mt-2 opacity-90">Here&apos;s what&apos;s happening with your pharmacy account.</p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickActions.map((action) => (
            <Link
              key={action.label}
              href={action.href}
              className="bg-white rounded-lg p-4 text-center hover:shadow-md transition-shadow flex flex-col items-center gap-2"
            >
              <action.icon size={24} className="text-blue-600" />
              <span className="text-gray-600">{action.label}</span>
            </Link>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-white rounded-lg p-4 flex flex-col items-center gap-2"
            >
              <stat.icon size={24} className="text-blue-600" />
              <span className="text-gray-600">{stat.label}</span>
              <span className="text-xl font-bold text-gray-900">{stat.value}</span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Recent Orders */}
          <div className="bg-white rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold flex items-center gap-2 text-gray-800">
                <Package size={20} className="text-blue-600" />
                Recent Orders
              </h2>
              <Link href="/orders" className="text-blue-600 hover:underline text-sm">
                View All
              </Link>
            </div>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                  <div>
                    <span className="font-medium text-gray-800">{order.id}</span>
                    <p className="text-sm text-gray-500">{order.date}</p>
                  </div>
                  <div className="text-right">
                    <span className="font-medium text-gray-800">{order.amount}</span>
                    <p className="text-sm text-gray-500">{order.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Notifications */}
          <div className="bg-white rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold flex items-center gap-2 text-gray-800">
                <Bell size={20} className="text-blue-600" />
                Notifications
              </h2>
              <Link href="/notifications" className="text-blue-600 hover:underline text-sm">
                View All
              </Link>
            </div>
            <div className="space-y-4">
              {notifications.map((notification) => (
                <div key={notification.id} className="p-3 bg-gray-50 rounded">
                  <p className="text-gray-800">{notification.message}</p>
                  <p className="text-sm text-gray-500 mt-1">{notification.time}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="bg-white rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Quick Links</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link href="/profile" className="text-blue-600 hover:underline">My Profile</Link>
            <Link href="/orders" className="text-blue-600 hover:underline">Order History</Link>
            <Link href="/prescriptions" className="text-blue-600 hover:underline">My Prescriptions</Link>
            <Link href="/support" className="text-blue-600 hover:underline">Help & Support</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
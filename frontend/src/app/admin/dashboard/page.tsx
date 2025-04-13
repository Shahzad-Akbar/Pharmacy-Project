'use client'
import { useState } from 'react'
import {
  Package,
  PackageCheck,
  Boxes,
  Users,
  FileText,
  Settings,
  Bell,
  TrendingUp,
  AlertCircle,
  ShoppingCart,
} from 'lucide-react'

export default function AdminDashboard() {
  const [stats] = useState({
    totalSales: '₹45,678',
    totalOrders: '156',
    pendingOrders: '23',
    lowStock: '8'
  })

  const [recentOrders] = useState([
    { id: '#123', customer: 'John Doe', status: 'Processing', amount: '₹299' },
    { id: '#124', customer: 'Jane Smith', status: 'Delivered', amount: '₹599' },
    { id: '#125', customer: 'Mike Johnson', status: 'Pending', amount: '₹199' }
  ])

  const [lowStockItems] = useState([
    { name: 'Paracetamol 500mg', stock: '10', reorderPoint: '20' },
    { name: 'Vitamin C 1000mg', stock: '5', reorderPoint: '15' },
    { name: 'Aspirin 300mg', stock: '8', reorderPoint: '25' }
  ])

  return (
    <div className="p-6 bg-blue-100 min-h-screen">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Sales</p>
              <h3 className="text-2xl font-bold text-gray-800">{stats.totalSales}</h3>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <TrendingUp className="text-blue-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Orders</p>
              <h3 className="text-2xl font-bold text-gray-800">{stats.totalOrders}</h3>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <ShoppingCart className="text-green-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Pending Orders</p>
              <h3 className="text-2xl font-bold text-gray-800">{stats.pendingOrders}</h3>
            </div>
            <div className="bg-yellow-100 p-3 rounded-full">
              <Bell className="text-yellow-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Low Stock Items</p>
              <h3 className="text-2xl font-bold text-gray-800">{stats.lowStock}</h3>
            </div>
            <div className="bg-red-100 p-3 rounded-full">
              <AlertCircle className="text-red-600" size={24} />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold text-gray-800">Recent Orders</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-800">{order.customer}</p>
                    <p className="text-sm text-gray-500">{order.id}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-800">{order.amount}</p>
                    <p className={`text-sm ${
                      order.status === 'Delivered' ? 'text-green-600' :
                      order.status === 'Processing' ? 'text-blue-600' : 'text-yellow-600'
                    }`}>{order.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Low Stock Alert */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold text-gray-800">Low Stock Alert</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {lowStockItems.map((item) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-800">{item.name}</p>
                    <p className="text-sm text-gray-500">Reorder Point: {item.reorderPoint}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-red-600">{item.stock} left</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        <button 
        onClick={() => {window.location.href = '/admin/inventory';}}
        className="p-4 bg-white rounded-lg shadow-sm hover:shadow-xl transition-shadow">
          <Package className="mx-auto mb-2 text-blue-600" size={24} />
          <p className="text-sm text-center text-gray-800">Inventory</p>
        </button>
        <button 
        onClick={() =>{window.location.href = '/admin/users'}}
        className="p-4 bg-white rounded-lg shadow-sm hover:shadow-xl transition-shadow">
          <Users className="mx-auto mb-2 text-green-600" size={24} />
          <p className="text-sm text-center text-gray-800">Customers</p>
        </button>
        <button 
        onClick={()=>{window.location.href='/admin/orders';}}
        className="p-4 bg-white rounded-lg shadow-sm hover:shadow-xl transition-shadow">
          <PackageCheck className="mx-auto mb-2 text-green-600" size={24} />
          <p className="text-sm text-center text-gray-800">Orders</p>
        </button>
        <button 
        onClick={() => {window.location.href = '/admin/product';}}
        className="p-4 bg-white rounded-lg shadow-sm hover:shadow-xl transition-shadow">
          <Boxes className="mx-auto mb-2 text-cyan-600" size={24} />
          <p className="text-sm text-center text-gray-800">Products</p>
        </button>
        <button 
        onClick={() => {window.location.href = '/admin/report';}}
        className="p-4 bg-white rounded-lg shadow-sm hover:shadow-xl transition-shadow">
          <FileText className="mx-auto mb-2 text-yellow-600" size={24} />
          <p className="text-sm text-center text-gray-800">Reports</p>
        </button>
        <button 
        onClick={() => {window.location.href = '/admin/settings';}}
        className="p-4 bg-white rounded-lg shadow-sm hover:shadow-xl transition-shadow">
          <Settings className="mx-auto mb-2 text-gray-600" size={24} />
          <p className="text-sm text-center text-gray-800">Settings</p>
        </button>
       
      </div>
    </div>
  )
}
'use client'
import { useState } from 'react'
import { 
  ShoppingBag, 
  Search, 
  Filter, 
  Eye,
  CheckCircle,
  XCircle,
//   Clock,
  TruckIcon
} from 'lucide-react'

export default function OrdersPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')

  const [orders] = useState([
    {
      id: '#ORD001',
      customer: 'John Doe',
      date: '2024-03-10',
      items: [
        { name: 'Paracetamol 500mg', quantity: 2, price: '₹99' },
        { name: 'Vitamin C 1000mg', quantity: 1, price: '₹199' }
      ],
      total: '₹397',
      status: 'pending',
      payment: 'completed',
      address: '123 Main St, City'
    },
    {
      id: '#ORD002',
      customer: 'Jane Smith',
      date: '2024-03-09',
      items: [
        { name: 'Aspirin 300mg', quantity: 1, price: '₹149' }
      ],
      total: '₹149',
      status: 'delivered',
      payment: 'completed',
      address: '456 Park Ave, City'
    }
  ])

  const handleStatusChange = (orderId: string, newStatus: string) => {
    // Will be implemented with backend
    console.log(`Changing order ${orderId} status to ${newStatus}`)
  }

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesStatus = filterStatus === 'all' || order.status === filterStatus
    
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'processing': return 'bg-blue-100 text-blue-800'
      case 'delivered': return 'bg-green-100 text-green-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="p-6 bg-blue-100 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <ShoppingBag size={24} />
          Orders Management
        </h1>
      </div>

      {/* Search and Filter */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search orders..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-800"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter size={20} className="text-gray-500" />
            <select
              className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 text-gray-800"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All Orders</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.map((order) => (
          <div key={order.id} className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex flex-col md:flex-row justify-between gap-4">
              {/* Order Header */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-semibold text-lg text-gray-800">{order.id}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </div>
                <p className="text-gray-600">{order.customer}</p>
                <p className="text-sm text-gray-500">{order.date}</p>
              </div>

              {/* Order Actions */}
              <div className="flex items-center gap-2">
                <button className="p-2 text-blue-600 hover:bg-blue-50 rounded">
                  <Eye size={20} />
                </button>
                {order.status === 'pending' && (
                  <>
                    <button 
                      onClick={() => handleStatusChange(order.id, 'processing')}
                      className="p-2 text-green-600 hover:bg-green-50 rounded"
                    >
                      <CheckCircle size={20} />
                    </button>
                    <button 
                      onClick={() => handleStatusChange(order.id, 'cancelled')}
                      className="p-2 text-red-600 hover:bg-red-50 rounded"
                    >
                      <XCircle size={20} />
                    </button>
                  </>
                )}
                {order.status === 'processing' && (
                  <button 
                    onClick={() => handleStatusChange(order.id, 'delivered')}
                    className="p-2 text-green-600 hover:bg-green-50 rounded"
                  >
                    <TruckIcon size={20} />
                  </button>
                )}
              </div>
            </div>

            {/* Order Details */}
            <div className="mt-4 border-t pt-4">
              <div className="space-y-2">
                {order.items.map((item, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span className="text-gray-600">
                      {item.name} x {item.quantity}
                    </span>
                    <span className="font-medium text-gray-800">{item.price}</span>
                  </div>
                ))}
                <div className="flex justify-between font-semibold pt-2 border-t text-gray-800">
                  <span>Total</span>
                  <span>{order.total}</span>
                </div>
              </div>
            </div>
          </div>
        ))}

        {filteredOrders.length === 0 && (
          <div className="text-center py-8 bg-white rounded-lg">
            <p className="text-gray-500">No orders found</p>
          </div>
        )}
      </div>
    </div>
  )
}
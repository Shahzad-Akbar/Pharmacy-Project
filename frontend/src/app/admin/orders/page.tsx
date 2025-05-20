'use client'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { 
  ShoppingBag, 
  Search, 
  Filter, 
  Eye,
  CheckCircle,
  CreditCard,
  X
} from 'lucide-react'
import toast from 'react-hot-toast'

interface OrderItem {
  product: {
    _id: string
    name: string
    price: number
  } | null
  quantity: number
  price: number
  prescriptionRequired: boolean
}

interface Order {
  _id: string
  user: {
    _id: string
    email: string
  }
  items: OrderItem[]
  total: number
  status: 'pending' | 'processing' | 'in-transit' | 'delivered' | 'cancelled'
  paymentStatus: 'pending' | 'processing' | 'completed' | 'failed' | 'refunded'
  paymentMethod: 'COD' | 'card' | 'bank-transfer' | 'QR'
  shippingAddress: {
    name: string
    phone: string
    address: string
    city: string
    state: string
    pincode: string
  }
  createdAt: string
  tracking?: string
  deliveryCharge: number
  notes?: string
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [showDetailsModal, setShowDetailsModal] = useState(false)
  const [showStatusModal, setShowStatusModal] = useState(false)
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [trackingInfo, setTrackingInfo] = useState('')
  const [newStatus, setNewStatus] = useState('')
  const [newPaymentStatus, setNewPaymentStatus] = useState('')

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.get('http://localhost:5000/api/orders/admin/all', {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
      setOrders(response.data)
    } catch (error) {
      console.error('Error fetching orders:', error)
      toast.error('Failed to fetch orders')
    } finally {
      setLoading(false)
    }
  }

  const handleStatusChange = async (orderId: string, status: string) => {
    try {
      if (status === selectedOrder?.status) {
        toast.error('Order is already in this status')
        return
      }

      if (status === 'in-transit' && !trackingInfo.trim()) {
        toast.error('Tracking information is required for in-transit status')
        return
      }

      const token = localStorage.getItem('token')
      await axios.put(`http://localhost:5000/api/orders/${orderId}/status`, 
        { 
          status,
          tracking: status === 'in-transit' ? trackingInfo : undefined
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      )
      toast.success(`Order status updated to ${status}`)
      await fetchOrders()
      setShowStatusModal(false)
      setTrackingInfo('')
      setNewStatus('')
    } catch (error) {
      console.error('Error updating order status:', error)
      toast.error('Failed to update order status')
    }
  }

  const handlePaymentStatusUpdate = async (orderId: string, status: string) => {
    try {
      if (status === selectedOrder?.paymentStatus) {
        toast.error('Payment is already in this status')
        return
      }

      const token = localStorage.getItem('token')
      await axios.put(`http://localhost:5000/api/orders/${orderId}/payment`, 
        { paymentStatus: status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      )
      toast.success(`Payment status updated to ${status}`)
      await fetchOrders()
      setShowPaymentModal(false)
      setNewPaymentStatus('')
    } catch (error) {
      console.error('Error updating payment status:', error)
      toast.error('Failed to update payment status')
    }
  }

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order._id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.shippingAddress.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.user.email.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesStatus = filterStatus === 'all' || order.status === filterStatus
    
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'processing': return 'bg-blue-100 text-blue-800'
      case 'in-transit': return 'bg-purple-100 text-purple-800'
      case 'delivered': return 'bg-green-100 text-green-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getPaymentStatusColor = (status: string) => {
    switch(status) {
      case 'completed': return 'bg-green-100 text-green-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'failed': return 'bg-red-100 text-red-800'
      case 'processing': return 'bg-blue-100 text-blue-800'
      case 'refunded': return 'bg-purple-100 text-purple-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  if (loading) {
    return (
      <div className="p-6 flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
      </div>
    )
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
              <option value="in-transit">In Transit</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.map((order) => (
          <div key={order._id} className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex flex-col md:flex-row justify-between gap-4">
              {/* Order Header */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-semibold text-lg text-gray-800">{order._id}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPaymentStatusColor(order.paymentStatus)}`}>
                    {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
                  </span>
                </div>
                <p className="text-gray-600">{order.shippingAddress.name}</p>
                <p className="text-sm text-gray-500">
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>

              {/* Order Actions */}
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => {
                    setSelectedOrder(order)
                    setShowDetailsModal(true)
                  }}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                >
                  <Eye size={20} />
                </button>
                <button 
                  onClick={() => {
                    setSelectedOrder(order)
                    setNewStatus(order.status)
                    setShowStatusModal(true)
                  }}
                  className="p-2 text-green-600 hover:bg-green-50 rounded"
                >
                  <CheckCircle size={20} />
                </button>
                <button 
                  onClick={() => {
                    setSelectedOrder(order)
                    setNewPaymentStatus(order.paymentStatus)
                    setShowPaymentModal(true)
                  }}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                >
                  <CreditCard size={20} />
                </button>
              </div>
            </div>

            {/* Order Details */}
            <div className="mt-4 border-t pt-4">
              <div className="space-y-2">
                {order.items.map((item, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span className="text-gray-600">
                      {item.product ? `${item.product.name} x ${item.quantity}` : `Unknown Product x ${item.quantity}`}
                    </span>
                    <span className="font-medium text-gray-800">₹{item.price}</span>
                  </div>
                ))}
                <div className="flex justify-between font-medium text-gray-800 pt-2 border-t">
                  <span>Total (including ₹{order.deliveryCharge} delivery)</span>
                  <span>₹{order.total}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Order Details Modal */}
      {showDetailsModal && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-black text-xl font-semibold">Order Details</h2>
              <button 
                onClick={() => setShowDetailsModal(false)}
                className="text-red-500 p-2 hover:bg-gray-100 rounded"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-indigo-300 font-medium">Shipping Address</h3>
                <p className='text-black'>{selectedOrder.shippingAddress.name}</p>
                <p className='text-black'>{selectedOrder.shippingAddress.phone}</p>
                <p className='text-black'>{selectedOrder.shippingAddress.address}</p>
                <p className='text-black'>{selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state} {selectedOrder.shippingAddress.pincode}</p>
              </div>

              {selectedOrder.notes && (
                <div>
                  <h3 className="text-indigo-300 font-medium">Notes</h3>
                  <p className='text-black'>{selectedOrder.notes}</p>
                </div>
              )}

              {selectedOrder.tracking && (
                <div>
                  <h3 className="text-indigo-300 font-medium">Tracking Information</h3>
                  <p className='text-black'>{selectedOrder.tracking}</p>
                </div>
              )}

              <div className="flex justify-end gap-2 mt-4 pt-4 border-t">
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="text-black px-4 py-2 border rounded hover:bg-gray-50"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Status Update Modal */}
      {showStatusModal && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-black text-xl font-semibold">Update Order Status</h2>
              <button 
                onClick={() => setShowStatusModal(false)}
                className="text-red-500 p-2 hover:bg-gray-100 rounded"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-indigo-400 mb-1">
                  New Status
                </label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  className="text-black w-full border rounded-lg px-3 py-2"
                >
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="in-transit">In Transit</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              {newStatus === 'in-transit' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tracking Information
                  </label>
                  <input
                    type="text"
                    value={trackingInfo}
                    onChange={(e) => setTrackingInfo(e.target.value)}
                    className="w-full border rounded-lg px-3 py-2"
                    placeholder="Enter tracking information"
                  />
                </div>
              )}

              <div className="flex justify-end gap-2 pt-4">
                <button
                  onClick={() => setShowStatusModal(false)}
                  className="text-black px-4 py-2 border rounded hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleStatusChange(selectedOrder._id, newStatus)}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  disabled={newStatus === selectedOrder.status || (newStatus === 'in-transit' && !trackingInfo.trim())}
                >
                  Update Status
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Payment Status Update Modal */}
      {showPaymentModal && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-black text-xl font-semibold">Update Payment Status</h2>
              <button 
                onClick={() => setShowPaymentModal(false)}
                className="text-red-500 p-2 hover:bg-gray-100 rounded"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-indigo-400 mb-1">
                  New Payment Status
                </label>
                <select
                  value={newPaymentStatus}
                  onChange={(e) => setNewPaymentStatus(e.target.value)}
                  className="text-black w-full border rounded-lg px-3 py-2"
                >
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="completed">Completed</option>
                  <option value="failed">Failed</option>
                  <option value="refunded">Refunded</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <button
                  onClick={() => setShowPaymentModal(false)}
                  className="text-black px-4 py-2 border rounded hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handlePaymentStatusUpdate(selectedOrder._id, newPaymentStatus)}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  disabled={newPaymentStatus === selectedOrder.paymentStatus}
                >
                  Update Payment Status
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
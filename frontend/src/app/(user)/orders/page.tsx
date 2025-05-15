'use client'
import { useState, useEffect } from 'react'
import { Package, Truck, CheckCircle, Clock, AlertCircle, ArrowLeft, Edit, Trash2, X } from 'lucide-react'
import axios from 'axios'
import { useRouter } from 'next/navigation'

interface OrderItem {
  product: {
    _id: string
    name: string
    price: number
  }
  quantity: number
  price: number
}

interface Order {
  _id: string
  createdAt: string
  status: string
  items: OrderItem[]
  total: number
  tracking: string
  estimatedDeliveryDate: string
  shippingAddress: {
    name: string
    phone: string
    address: string
    city: string
    state: string
    pincode: string
  }
  paymentMethod: string
}

interface ShippingAddressForm {
  name: string
  phone: string
  address: string
  city: string
  state: string
  pincode: string
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showUpdateModal, setShowUpdateModal] = useState(false)
  const [showCancelModal, setShowCancelModal] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [updatedAddress, setUpdatedAddress] = useState<ShippingAddressForm>({name: '', phone: '', address: '', city: '', state: '', pincode: ''})
  const [updateLoading, setUpdateLoading] = useState(false)
  const [cancelLoading, setCancelLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    const token = localStorage.getItem('token')
    if (!token) {
      console.error('No token found')
      return
    }
    try {
      setLoading(true)
      const response = await axios.get('http://localhost:5000/api/orders/user', {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
      
      // Add estimated delivery date if not present
      const processedOrders = response.data.map((order: Order) => {
        if (!order.estimatedDeliveryDate) {
          const orderDate = new Date(order.createdAt)
          const estimatedDate = new Date(orderDate)
          estimatedDate.setDate(orderDate.getDate() + 7) // Add 7 days
          order.estimatedDeliveryDate = estimatedDate.toISOString()
        }
        return order
      })
      
      setOrders(processedOrders)
      setError('')
    } catch (err) {
      console.error('Error fetching orders:', err)
      setError('Failed to load orders. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle className="text-green-500" size={20} />
      case 'in-transit':
        return <Truck className="text-blue-500" size={20} />
      case 'processing':
        return <Clock className="text-yellow-500" size={20} />
      case 'cancelled':
        return <AlertCircle className="text-red-500" size={20} />
      default:
        return <Clock className="text-yellow-500" size={20} />
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const getItemsText = (items: OrderItem[]) => {
    const count = items.length
    return count === 1 ? '1 item' : `${count} items`
  }

  const getTrackingText = (order: Order) => {
    if (order.tracking) return order.tracking
    
    switch (order.status) {
      case 'delivered':
        return `Delivered on ${formatDate(order.createdAt)}`
      case 'in-transit':
        return 'Package is on the way'
      case 'processing':
        return 'Order is being processed'
      case 'cancelled':
        return 'Order has been cancelled'
      default:
        return 'Order received'
    }
  }

  const handleBackToDashboard = () => {
    router.push('/dashboard')
  }

  const handleUpdateClick = (order: Order) => {
    setSelectedOrder(order)
    setUpdatedAddress({
      name: order.shippingAddress.name,
      phone: order.shippingAddress.phone,
      address: order.shippingAddress.address,
      city: order.shippingAddress.city,
      state: order.shippingAddress.state,
      pincode: order.shippingAddress.pincode
    })
    setShowUpdateModal(true)
  }

  const handleCancelClick = (order: Order) => {
    setSelectedOrder(order)
    setShowCancelModal(true)
  }

  const handleUpdateSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedOrder) return

    try {
      setUpdateLoading(true)
      await axios.put(`http://localhost:5000/api/orders/${selectedOrder._id}`, {
        shippingAddress: updatedAddress
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      })

      // Refresh orders list
      await fetchOrders()
      setShowUpdateModal(false)
      setSelectedOrder(null)
    } catch (err) {
      console.error('Error updating order:', err)
      setError('Failed to update order. Please try again.')
    } finally {
      setUpdateLoading(false)
    }
  }

  const handleCancelOrder = async () => {
    if (!selectedOrder) return

    try {
      setCancelLoading(true)
      await axios.put(`http://localhost:5000/api/orders/${selectedOrder._id}/cancel`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      })

      // Refresh orders list
      await fetchOrders()
      setShowCancelModal(false)
      setSelectedOrder(null)
    } catch (err) {
      console.error('Error cancelling order:', err)
      setError('Failed to cancel order. Please try again.')
    } finally {
      setCancelLoading(false)
    }
  }

  const canUpdateOrder = (order: Order) => {
    return order.status === 'pending' || order.status === 'processing'
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-cyan-100">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold flex items-center gap-2 text-gray-800">
            <Package className="text-blue-600" size={24} />
            Track Orders
          </h1>
          <button
            onClick={handleBackToDashboard}
            className="flex items-center gap-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Dashboard
          </button>
        </div>

        {loading ? (
          <div className="text-center py-8">
            <p>Loading your orders...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 text-red-600 p-4 rounded-lg text-center">
            {error}
          </div>
        ) : orders.length === 0 ? (
          <div className="bg-white rounded-lg p-8 text-center">
            <p className="text-gray-600">You haven&apos;t placed any orders yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order._id} className="bg-white rounded-lg p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-medium text-gray-800">Order #{order._id.substring(0, 6)}</h3>
                    <p className="text-sm text-gray-500">Placed on {formatDate(order.createdAt)}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(order.status)}
                    <span className="text-sm font-medium text-gray-800">
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </div>
                </div>
                
                {/* Product list */}
                <div className="mb-3 bg-gray-50 p-3 rounded-md">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Products:</h4>
                  <ul className="space-y-1">
                    {order.items.map((item, index) => (
                      <li key={index} className="text-sm text-gray-600 flex justify-between">
                        <span>{item.product.name} × {item.quantity}</span>
                        <span>₹{item.price * item.quantity}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="flex justify-between text-sm text-gray-600">
                  <p>{getItemsText(order.items)}</p>
                  <p className="font-medium">₹{order.total}</p>
                </div>
                
                <div className="mt-4 pt-4 border-t space-y-2">
                  <p className="text-sm text-gray-600">{getTrackingText(order)}</p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Expected delivery:</span> {formatDate(order.estimatedDeliveryDate)}
                  </p>
                </div>

                {/* Action buttons */}
                {canUpdateOrder(order) && (
                  <div className="mt-4 pt-4 border-t flex gap-2">
                    <button
                      onClick={() => handleUpdateClick(order)}
                      className="flex items-center gap-1 bg-blue-100 text-blue-700 px-3 py-1.5 rounded hover:bg-blue-200 transition-colors text-sm"
                    >
                      <Edit size={14} />
                      Update Address
                    </button>
                    <button
                      onClick={() => handleCancelClick(order)}
                      className="flex items-center gap-1 bg-red-100 text-red-700 px-3 py-1.5 rounded hover:bg-red-200 transition-colors text-sm"
                    >
                      <Trash2 size={14} />
                      Cancel Order
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Update Order Modal */}
      {showUpdateModal && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Update Shipping Address</h3>
              <button 
                onClick={() => setShowUpdateModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleUpdateSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={updatedAddress.name}
                    onChange={(e) => setUpdatedAddress({...updatedAddress, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input
                    type="text"
                    value={updatedAddress.phone}
                    onChange={(e) => setUpdatedAddress({...updatedAddress, phone: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <input
                    type="text"
                    value={updatedAddress.address}
                    onChange={(e) => setUpdatedAddress({...updatedAddress, address: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                    <input
                      type="text"
                      value={updatedAddress.city}
                      onChange={(e) => setUpdatedAddress({...updatedAddress, city: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                    <input
                      type="text"
                      value={updatedAddress.state}
                      onChange={(e) => setUpdatedAddress({...updatedAddress, state: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Pincode</label>
                  <input
                    type="text"
                    value={updatedAddress.pincode}
                    onChange={(e) => setUpdatedAddress({...updatedAddress, pincode: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
              </div>
              
              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowUpdateModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                  disabled={updateLoading}
                >
                  {updateLoading ? 'Updating...' : 'Update Address'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Cancel Order Modal */}
      {showCancelModal && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-red-600">Cancel Order</h3>
              <button 
                onClick={() => setShowCancelModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>
            
            <p className="mb-4">Are you sure you want to cancel this order? This action cannot be undone.</p>
            
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowCancelModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                No, Keep Order
              </button>
              <button
                onClick={handleCancelOrder}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50"
                disabled={cancelLoading}
              >
                {cancelLoading ? 'Cancelling...' : 'Yes, Cancel Order'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
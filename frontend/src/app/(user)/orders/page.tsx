'use client'
import { Package, Truck, CheckCircle, Clock } from 'lucide-react'

export default function OrdersPage() {
  const orders = [
    {
      id: '#123',
      date: '2024-02-20',
      status: 'Delivered',
      items: '2 items',
      total: '₹299',
      tracking: 'Delivered on Feb 20, 2024'
    },
    {
      id: '#124',
      date: '2024-02-18',
      status: 'In Transit',
      items: '1 item',
      total: '₹599',
      tracking: 'Package is on the way'
    }
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Delivered':
        return <CheckCircle className="text-green-500" size={20} />
      case 'In Transit':
        return <Truck className="text-blue-500" size={20} />
      default:
        return <Clock className="text-yellow-500" size={20} />
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-cyan-100">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 flex items-center gap-2 text-gray-800">
          <Package className="text-blue-600" size={24} />
          Track Orders
        </h1>

        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="bg-white rounded-lg p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-medium text-gray-800">Order {order.id}</h3>
                  <p className="text-sm text-gray-500">Placed on {order.date}</p>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusIcon(order.status)}
                  <span className="text-sm font-medium text-gray-800">{order.status}</span>
                </div>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <p>{order.items}</p>
                <p className="font-medium">{order.total}</p>
              </div>
              <div className="mt-4 pt-4 border-t">
                <p className="text-sm text-gray-600">{order.tracking}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
'use client'
import { useState } from 'react'
import {
  Package,
  Search,
  AlertCircle,
  Calendar,
  Box,
} from 'lucide-react'

// Add these imports
import { Edit, Plus, RefreshCcw } from 'lucide-react'

export default function InventoryPage() {
  const [searchQuery, setSearchQuery] = useState('')


  const [inventory] = useState([
    {
      id: 1,
      productName: 'Paracetamol 500mg',
      batchNo: 'BAT2024001',
      stock: 150,
      reorderPoint: 20,
      expiryDate: '2024-12-31',
      manufacturer: 'PharmaCare Ltd',
      location: 'Shelf A1',
      lastRestocked: '2024-02-15',
      supplier: {
        name: 'MediSupply Inc',
        contact: '+91 98765 43210'
      }
    },
    {
      id: 2,
      productName: 'Vitamin C 1000mg',
      batchNo: 'BAT2024002',
      stock: 85,
      reorderPoint: 30,
      expiryDate: '2024-10-15',
      manufacturer: 'HealthPlus Inc',
      location: 'Shelf B2',
      lastRestocked: '2024-02-10',
      supplier: {
        name: 'VitaWholesale Ltd',
        contact: '+91 98765 43211'
      }
    }
  ])

  const getStockStatus = (stock: number, reorderPoint: number) => {
    if (stock <= reorderPoint * 0.5) return 'bg-red-100 text-red-800'
    if (stock <= reorderPoint) return 'bg-yellow-100 text-yellow-800'
    return 'bg-green-100 text-green-800'
  }

  const isNearExpiry = (date: string) => {
    const expiryDate = new Date(date)
    const threeMonthsFromNow = new Date()
    threeMonthsFromNow.setMonth(threeMonthsFromNow.getMonth() + 3)
    return expiryDate <= threeMonthsFromNow
  }

  return (
    <div className="p-6 bg-blue-100 min-h-screen">
      {/* Add button in header */}
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <Box size={24} />
          Stock Management
        </h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700">
          <Plus size={20} />
          Add New Stock
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Low Stock Items</p>
              <p className="text-xl font-bold text-red-600">
                {inventory.filter(item => item.stock <= item.reorderPoint).length}
              </p>
            </div>
            <AlertCircle className="text-red-600" size={24} />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Expiring Soon</p>
              <p className="text-xl font-bold text-yellow-600">
                {inventory.filter(item => isNearExpiry(item.expiryDate)).length}
              </p>
            </div>
            <Calendar className="text-yellow-600" size={24} />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Products</p>
              <p className="text-xl font-bold text-blue-600">{inventory.length}</p>
            </div>
            <Package className="text-blue-600" size={24} />
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search by product name or batch number..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-800"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-300">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Batch No</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stock Level</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Expiry Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Supplier</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Last Restocked</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {inventory.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{item.productName}</div>
                    <div className="text-sm text-gray-500">{item.manufacturer}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">{item.batchNo}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStockStatus(item.stock, item.reorderPoint)}`}>
                      {item.stock} units
                    </span>
                    {item.stock <= item.reorderPoint && (
                      <div className="text-xs text-red-600 mt-1">Reorder Point: {item.reorderPoint}</div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-sm ${isNearExpiry(item.expiryDate) ? 'text-red-600 font-medium' : 'text-gray-500'}`}>
                      {item.expiryDate}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">{item.location}</td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{item.supplier.name}</div>
                    <div className="text-sm text-gray-500">{item.supplier.contact}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">{item.lastRestocked}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button 
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                        onClick={() => console.log('Edit item:', item.id)}
                      >
                        <Edit size={18} />
                      </button>
                      <button 
                        className="p-2 text-green-600 hover:bg-green-50 rounded"
                        onClick={() => console.log('Restock item:', item.id)}
                      >
                        <RefreshCcw size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
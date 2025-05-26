'use client'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { X, Package, AlertCircle, Calendar, Box, Edit, RefreshCcw } from 'lucide-react'

interface Inventory {
  _id: string
  name: string
  description: string
  price: number
  category: string
  image: string
  stock: number
  manufacturer: string
  expiryDate: string
  isPublished: boolean
  requiresPrescription: boolean
}

interface SearchFilters {
  name: string
  category: string
  manufacturer: string
  stockLevel: 'all' | 'low' | 'normal' | 'high'
}

export default function InventoryPage() {
  const [inventory, setInventory] = useState<Inventory[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedItem, setSelectedItem] = useState<Inventory | null>(null)
  const [searchFilters, setSearchFilters] = useState<SearchFilters>({
    name: '',
    category: '',
    manufacturer: '',
    stockLevel: 'all'
  })

  useEffect(() => {
    fetchInventory()
  }, [])

  const fetchInventory = async () => {
    const token = localStorage.getItem('token')
    try {
      setLoading(true)
      const response = await axios.get('/api/inventory', {
        headers: { Authorization: `Bearer ${token}` }
      })
      setInventory(response.data)
      setError('')
    } catch (err) {
      setError('Failed to fetch inventory')
      console.error('Error fetching inventory:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleEditStock = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedItem) return
    const token = localStorage.getItem('token')

    try {
      const response = await axios.put(
        `/api/inventory/stock/${selectedItem._id}`,
        selectedItem,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )

      setInventory(inventory.map(item =>
        item._id === selectedItem._id ? response.data : item
      ))
      setShowEditModal(false)
      setSelectedItem(null)
    } catch (err) {
      console.error('Error updating stock:', err)
      setError('Failed to update stock')
    }
  }

  const handleRestock = async (id: string) => {
    const token = localStorage.getItem('token')
    try {
      const response = await axios.post(`/api/inventory/restock/${id}`, {
        quantity: 10
      }, {
        headers: { Authorization: `Bearer ${token}` }
      })
      
      setInventory(inventory.map(item =>
        item._id === id ? response.data : item
      ))
    } catch (err) {
      console.error('Error restocking item:', err)
      setError('Failed to restock item')
    }
  }

  const handleEdit = (item: Inventory) => {
    setSelectedItem(item)
    setShowEditModal(true)
  }

  const getStockStatus = (stock: number) => {
    if (stock <= 10) return 'bg-red-100 text-red-800'
    if (stock <= 20) return 'bg-yellow-100 text-yellow-800'
    return 'bg-green-100 text-green-800'
  }

  const isNearExpiry = (date: string) => {
    const expiryDate = new Date(date)
    const threeMonthsFromNow = new Date()
    threeMonthsFromNow.setMonth(threeMonthsFromNow.getMonth() + 3)
    return expiryDate <= threeMonthsFromNow
  }

  const handleFilterChange = (key: keyof SearchFilters, value: string) => {
    setSearchFilters(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const filteredInventory = inventory.filter(item => {
    const nameMatch = (item.name || '').toLowerCase().includes(searchFilters.name.toLowerCase())
    const categoryMatch = !searchFilters.category || (item.category || '').toLowerCase().includes(searchFilters.category.toLowerCase())
    const manufacturerMatch = !searchFilters.manufacturer || (item.manufacturer || '').toLowerCase().includes(searchFilters.manufacturer.toLowerCase())
    
    let stockMatch = true
    if (searchFilters.stockLevel !== 'all') {
      switch (searchFilters.stockLevel) {
        case 'low':
          stockMatch = item.stock <= 10
          break
        case 'normal':
          stockMatch = item.stock > 10 && item.stock <= 50
          break
        case 'high':
          stockMatch = item.stock > 50
          break
      }
    }

    return nameMatch && categoryMatch && manufacturerMatch && stockMatch
  })

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
        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2 mb-4">
          <Box size={24} />
          Stock Management
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 bg-white p-4 rounded-lg shadow-sm">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
            <input
              type="text"
              value={searchFilters.name}
              onChange={(e) => handleFilterChange('name', e.target.value)}
              placeholder="Search by name..."
              className="text-black w-full p-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <input
              type="text"
              value={searchFilters.category}
              onChange={(e) => handleFilterChange('category', e.target.value)}
              placeholder="Filter by category..."
              className="text-black w-full p-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Manufacturer</label>
            <input
              type="text"
              value={searchFilters.manufacturer}
              onChange={(e) => handleFilterChange('manufacturer', e.target.value)}
              placeholder="Filter by manufacturer..."
              className="text-black w-full p-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Stock Level</label>
            <select
              value={searchFilters.stockLevel}
              onChange={(e) => handleFilterChange('stockLevel', e.target.value)}
              className="text-black w-full p-2 border rounded-md"
            >
              <option value="all">All Levels</option>
              <option value="low">Low Stock (≤10)</option>
              <option value="normal">Normal Stock (11-50)</option>
              <option value="high">High Stock (50)</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Low Stock Items</p>
              <p className="text-xl font-bold text-red-600">
                {inventory.filter(item => item.stock <= 10).length}
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

      <div className="bg-white p-4 rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-300">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stock Level</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Expiry Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredInventory.map((item) => (
                <tr key={item._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{item.name}</div>
                    <div className="text-sm text-gray-500">{item.manufacturer}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">{item.category}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStockStatus(item.stock)}`}>
                      {item.stock} units
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">{item.price}</td>
                  <td className="px-6 py-4">
                    <span className={`text-sm ${isNearExpiry(item.expiryDate) ? 'text-red-600 font-medium' : 'text-gray-500'}`}>
                      {new Date(item.expiryDate).toLocaleDateString()}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button 
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                        onClick={() => handleEdit(item)}
                      >
                        <Edit size={18} />
                      </button>
                      <button 
                        className="p-2 text-green-600 hover:bg-green-50 rounded"
                        onClick={() => handleRestock(item._id)}
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

      {showEditModal && selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-slate-800">Edit Stock</h2>
              <button onClick={() => setShowEditModal(false)} className="text-slate-400 hover:text-slate-500">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleEditStock} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Stock Level</label>
                <input
                  type="number"
                  value={selectedItem.stock}
                  onChange={(e) => setSelectedItem({ ...selectedItem, stock: Number(e.target.value) })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Update Stock
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
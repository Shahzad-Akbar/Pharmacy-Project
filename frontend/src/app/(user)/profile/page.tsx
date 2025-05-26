'use client'
import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { User, Mail, MapPin, Home, Building2, MapPinned } from 'lucide-react'
import axios from 'axios'
import toast from 'react-hot-toast'

interface UserProfile {
  username: string
  fullName: string
  email: string
  address: {
    street: string
    city: string
    state: string
    postalCode: string
    country: string
  }
  profileImg: string
}

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(true)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [formData, setFormData] = useState<UserProfile>({
    username: '',
    fullName: '',
    email: '',
    address: {
      street: '',
      city: '',
      state: '',
      postalCode: '',
      country: ''
    },
    profileImg: ''
  })

  useEffect(() => {
    fetchUserProfile()
  }, [])

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem('token')
      if (!token) {
        toast.error('Please login to view profile')
        return
      }

      const response = await axios.get('/api/users/profile', {
        headers: { Authorization: `Bearer ${token}` }
      })
      setFormData(response.data)
      setLoading(false)
    } catch (error) {
      toast.error('Failed to fetch profile')
      console.error('Error fetching profile:', error)
      setLoading(false)
    }
  }

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Convert image to base64 string
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      const base64String = reader.result as string
      setFormData(prev => ({
        ...prev,
        profileImg: base64String
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const token = localStorage.getItem('token')
      if (!token) {
        toast.error('Please login to update profile')
        return
      }

      // Send all data including the base64 image string
      const updateData = {
        fullName: formData.fullName,
        profileImg: formData.profileImg,
        address: {
          street: formData.address.street,
          city: formData.address.city,
          state: formData.address.state,
          postalCode: formData.address.postalCode,
          country: formData.address.country
        }
      }

      const response = await axios.put(
        '/api/users/update-profile',
        updateData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      )

      setFormData(prev => ({
        ...prev,
        ...response.data
      }))

      toast.success('Profile updated successfully')
      setIsEditing(false)
    } catch (error) {
      toast.error('Failed to update profile')
      console.error('Error updating profile:', error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-cyan-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading profile...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-gradient-to-b from-cyan-50 to-blue-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-blue-800 flex items-center gap-3">
              <User size={32} />
              Profile Information
            </h2>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="px-6 py-2.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </button>
          </div>

          <div className="flex flex-col md:flex-row gap-12">
            <div className="md:w-1/3">
              <div className="relative w-48 h-48 mx-auto group">
                <Image
                  src={formData.profileImg || '/logged/my-profile.png'}
                  alt="Profile"
                  fill
                  className="rounded-full object-cover border-4 border-blue-100 shadow-md"
                />
                {isEditing && (
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer"
                  >
                    <span className="text-white text-sm font-medium">Change Photo</span>
                  </div>
                )}

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </div>
            </div>

            <div className="md:w-2/3">
              {isEditing ? (
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="col-span-2 md:col-span-1">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <User size={16} />
                      Username
                    </label>
                    <input
                      type="text"
                      value={formData.username}
                      disabled
                      className="text-black mt-1 w-full rounded-lg border-gray-300 bg-gray-100 shadow-sm"
                    />
                  </div>
                  <div className="col-span-2 md:col-span-1">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <User size={16} />
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="text-black mt-1 w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <Mail size={16} />
                      Email
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      disabled
                      className="text-black mt-1 w-full rounded-lg border-gray-300 bg-gray-100 shadow-sm"
                    />
                  </div>

                  <div className="col-span-2 mt-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                      <MapPin size={20} />
                      Address Information
                    </h3>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <Home size={16} />
                      Street
                    </label>
                    <input
                      type="text"
                      value={formData.address.street}
                      onChange={(e) => setFormData({
                        ...formData,
                        address: { ...formData.address, street: e.target.value }
                      })}
                      className="text-black mt-1 w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <Building2 size={16} />
                      City
                    </label>
                    <input
                      type="text"
                      value={formData.address.city}
                      onChange={(e) => setFormData({
                        ...formData,
                        address: { ...formData.address, city: e.target.value }
                      })}
                      className="text-black mt-1 w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <MapPinned size={16} />
                      State
                    </label>
                    <input
                      type="text"
                      value={formData.address.state}
                      onChange={(e) => setFormData({
                        ...formData,
                        address: { ...formData.address, state: e.target.value }
                      })}
                      className="text-black mt-1 w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Postal Code</label>
                    <input
                      type="text"
                      value={formData.address.postalCode}
                      onChange={(e) => setFormData({
                        ...formData,
                        address: { ...formData.address, postalCode: e.target.value }
                      })}
                      className="text-black mt-1 w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div className="col-span-2">
                    <button
                      type="submit"
                      className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="col-span-2 md:col-span-1 bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-gray-700 flex items-center gap-2 mb-2">
                      <User size={16} />
                      Username
                    </h3>
                    <p className="text-lg text-blue-900">{formData.username}</p>
                  </div>
                  <div className="col-span-2 md:col-span-1 bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-gray-700 flex items-center gap-2 mb-2">
                      <User size={16} />
                      Full Name
                    </h3>
                    <p className="text-lg text-blue-900">{formData.fullName}</p>
                  </div>
                  <div className="col-span-2 bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-gray-700 flex items-center gap-2 mb-2">
                      <Mail size={16} />
                      Email
                    </h3>
                    <p className="text-lg text-blue-900">{formData.email}</p>
                  </div>

                  <div className="col-span-2 mt-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                      <MapPin size={20} />
                      Address Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="text-sm font-medium text-gray-700 flex items-center gap-2 mb-2">
                          <Home size={16} />
                          Street
                        </h4>
                        <p className="text-lg text-blue-900">{formData.address.street}</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="text-sm font-medium text-gray-700 flex items-center gap-2 mb-2">
                          <Building2 size={16} />
                          City
                        </h4>
                        <p className="text-lg text-blue-900">{formData.address.city}</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="text-sm font-medium text-gray-700 flex items-center gap-2 mb-2">
                          <MapPinned size={16} />
                          State
                        </h4>
                        <p className="text-lg text-blue-900">{formData.address.state}</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Postal Code</h4>
                        <p className="text-lg text-blue-900">{formData.address.postalCode}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
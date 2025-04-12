'use client'
import { useState } from 'react'
import Image from 'next/image'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  User, 
  Settings, 
  Heart, 
  Camera, 
  Mail, 
  Phone, 
  Calendar, 
  MapPin, 
  Shield, 
  Activity,
  ShoppingBag,
  AlertCircle,
  Contact
} from 'lucide-react'

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: 'Shahzad',
    email: 'bads80909@gmail.com',
    phone: '+91 9199617022',
    address: 'D- JAHANGIRPURI, New-Delhi, Delhi',
    dateOfBirth: '1990-01-01',
    gender: 'Male',
    emergencyContact: '+91 9876543210',
    bloodGroup: 'O+',
    allergies: 'None',
    medicalConditions: 'None'
  })

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsEditing(false)
  }

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault()
    // Add password change logic
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-cyan-50">
      <div className="max-w-4xl mx-auto">
        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid grid-cols-3 gap-4 bg-blue-50 p-2 rounded-lg">
            <TabsTrigger value="profile" className="data-[state=active]:bg-cyan-400 data-[state=active]:text-white flex items-center gap-2">
              <User size={18} />
              Profile
            </TabsTrigger>
            <TabsTrigger value="medical" className="data-[state=active]:bg-cyan-400 data-[state=active]:text-white flex items-center gap-2">
              <Heart size={18} />
              Medical Details
            </TabsTrigger>
            <TabsTrigger value="security" className="data-[state=active]:bg-cyan-400 data-[state=active]:text-white flex items-center gap-2">
              <Settings size={18} />
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-blue-800 flex items-center gap-2">
                <User size={24} />
                Personal Information
              </h2>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                {isEditing ? 'Cancel' : 'Edit Profile'}
              </button>
            </div>

            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/3">
                <div className="relative w-40 h-40 mx-auto">
                  <Image
                    src="/logged/my-profile.png"
                    alt="Profile"
                    fill
                    className="rounded-full object-cover border-4 border-blue-100"
                  />
                </div>
                {isEditing && (
                  <button className="mt-4 w-full px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200 flex items-center justify-center gap-2">
                    <Camera size={18} />
                    Change Photo
                  </button>
                )}
              </div>

              <div className="md:w-2/3">
                {isEditing ? (
                  <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className=" text-sm font-medium text-gray-700 flex items-center gap-2">
                        <User size={16} />
                        Name
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="mt-1  w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className=" text-sm font-medium text-gray-700 flex items-center gap-2">
                        <Mail size={16} />
                        Email
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="mt-1  w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className=" text-sm font-medium text-gray-700 flex items-center gap-2">
                        <Phone size={16} />
                        Phone
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="mt-1  w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className=" text-sm font-medium text-gray-700 flex items-center gap-2">
                        <Calendar size={16} />
                        Date of Birth
                      </label>
                      <input
                        type="date"
                        value={formData.dateOfBirth}
                        onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                        className="mt-1  w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className=" text-sm font-medium text-gray-700 flex items-center gap-2">
                        <MapPin size={16} />
                        Address
                      </label>
                      <textarea
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        rows={3}
                        className="mt-1  w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <button
                        type="submit"
                        className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                      >
                        Save Changes
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-800 flex items-center gap-2">
                        <User size={16} />
                        Name
                      </h3>
                      <p className="mt-1 text-lg text-green-900 pl-[20px]">{formData.name}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-800 flex items-center gap-2">
                        <Mail size={16} />
                        Email
                      </h3>
                      <p className="mt-1 text-lg  text-green-900 pl-[20px]">{formData.email}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-800 flex items-center gap-2">
                        <Phone size={16} />
                        Phone
                      </h3>
                      <p className="mt-1 text-lg  text-green-900 pl-[20px]">{formData.phone}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-800 flex items-center gap-2">
                        <Calendar size={16} />
                        Date of Birth
                      </h3>
                      <p className="mt-1 text-lg  text-green-900 pl-[20px]">{formData.dateOfBirth}</p>
                    </div>
                    <div className="md:col-span-2">
                      <h3 className="text-sm font-medium text-gray-800 flex items-center gap-2">
                        <MapPin size={16} />
                        Address
                      </h3>
                      <p className="mt-1 text-lg  text-green-900 pl-[20px]">{formData.address}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="medical" className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-blue-800 mb-6 flex items-center gap-2">
              <Activity size={24} />
              Medical Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-medium text-gray-800 flex items-center gap-2">
                  <Heart size={16} />
                  Blood Group
                </h3>
                <p className="mt-1 text-lg  text-green-900 pl-[20px]">{formData.bloodGroup}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-800 flex items-center gap-2">
                  <Contact size={16} />
                  Emergency Contact
                </h3>
                <p className="mt-1 text-lg  text-green-900 pl-[20px]">{formData.emergencyContact}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-800 flex items-center gap-2">
                  <AlertCircle size={16} />
                  Allergies
                </h3>
                <p className="mt-1 text-lg  text-green-900 pl-[20px]">{formData.allergies}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-800">Medical Conditions</h3>
                <p className="mt-1 text-lg  text-green-900 pl-[20px]">{formData.medicalConditions}</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="security" className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-blue-800 mb-6 flex items-center gap-2">
              <Shield size={24} />
              Change Password
            </h2>
            <form onSubmit={handlePasswordChange} className="max-w-md space-y-4">
              <div>
                <label className=" text-sm font-medium text-gray-700">Current Password</label>
                <input
                  type="password"
                  value={passwordForm.currentPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                  className="mt-1  w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className=" text-sm font-medium text-gray-700">New Password</label>
                <input
                  type="password"
                  value={passwordForm.newPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                  className="mt-1  w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className=" text-sm font-medium text-gray-700">Confirm New Password</label>
                <input
                  type="password"
                  value={passwordForm.confirmPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                  className="mt-1  w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <button
                type="submit"
                className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Update Password
              </button>
            </form>
          </TabsContent>
        </Tabs>

        {/* Order History Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mt-6">
          <h2 className="text-xl font-bold text-blue-800 mb-4 flex items-center gap-2">
            <ShoppingBag size={24} />
            Recent Orders
          </h2>
          <div className="text-gray-800 text-center py-4">
            No orders found
          </div>
        </div>
      </div>
    </div>
  )
}
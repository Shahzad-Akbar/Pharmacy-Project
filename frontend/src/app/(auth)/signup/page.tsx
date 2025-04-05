'use client'
import Link from 'next/link'
import { useState } from 'react'
import PublicNavbar from '@/components/shared/PublicNavbar'

export default function SignupPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phoneNumber: '',
    promotionalEmails: false,
    termsAccepted: false
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle signup logic here
    console.log(formData)
  }

  return (
    <div>
      <PublicNavbar />
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-12">
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg">
          <div>
            <Link href="/" className="text-2xl font-bold text-green-300">
              PHARMACY
            </Link>
            <h2 className="mt-6 text-3xl font-bold text-gray-900 text-center">Create an account</h2>
          </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-800">
                First name
              </label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                required
                value={formData.firstName}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-black focus:outline-none focus:ring-primary focus:border-primary"
                placeholder="First name"
              />
            </div>

            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-800">
                Last name
              </label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                required
                value={formData.lastName}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-black focus:outline-none focus:ring-primary focus:border-primary"
                placeholder="Last name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-800">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-black focus:outline-none focus:ring-primary focus:border-primary"
                placeholder="Email"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-800">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-black focus:outline-none focus:ring-primary focus:border-primary"
                placeholder="Password"
              />
            </div>

            <div>
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-800">
                Phone number
              </label>
              <input
                id="phoneNumber"
                name="phoneNumber"
                type="tel"
                required
                value={formData.phoneNumber}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-black focus:outline-none focus:ring-primary focus:border-primary"
                placeholder="Phone number"
              />
            </div>

            <div className="flex items-center">
              <input
                id="promotionalEmails"
                name="promotionalEmails"
                type="checkbox"
                checked={formData.promotionalEmails}
                onChange={handleChange}
                className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
              />
              <label htmlFor="promotionalEmails" className="ml-2 block text-sm text-gray-900">
                I am interested in receiving promotional emails from Pharmacy.
              </label>
            </div>

            <div className="flex items-center">
              <input
                id="termsAccepted"
                name="termsAccepted"
                type="checkbox"
                required
                checked={formData.termsAccepted}
                onChange={handleChange}
                className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
              />
              <label htmlFor="termsAccepted" className="ml-2 block text-sm text-gray-900">
                I agree to the terms and conditions and privacy policy.
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            Sign up
          </button>

          <div className="text-center text-sm">
            <span className="text-gray-600">Already have an account? </span>
            <Link href="/login" className="font-medium text-blue-700 hover:text-sky-600">
              Log in
            </Link>
          </div>
        </form>
      </div>
      </div>
    </div>
  )
}
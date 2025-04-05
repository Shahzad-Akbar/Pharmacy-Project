'use client'
import Link from 'next/link'
import { useState } from 'react'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle password reset logic here
    setIsSubmitted(true)
    setEmail('')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg">
        {/* Header */}
        <div className="">
          <Link href="/" className="text-2xl font-bold text-green-300">
            PHARMACY
          </Link>
          <h2 className="mt-6 text-3xl font-bold text-gray-900 text-center">Reset Password</h2>
          <p className="mt-2 text-center text-gray-600">
            Enter your email address and we will send you instructions to reset your password.
          </p>
        </div>

        {/* Form */}
        {!isSubmitted ? (
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-800">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-black focus:outline-none focus:ring-primary focus:border-primary"
                placeholder="Enter your email"
              />
            </div>

            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              Send Reset Link
            </button>

            <div className="text-center text-sm">
              <Link href="/login" className="font-medium text-blue-700 hover:text-sky-600">
                Back to Login
              </Link>
            </div>
          </form>
        ) : (
          <div className="mt-8 text-center">
            <div className="text-green-500 text-xl mb-4">✓</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Check your email</h3>
            <p className="text-gray-600 mb-6">
              We have sent password reset instructions to your email address.
            </p>
            <Link 
              href="/login" 
              className="text-blue-700 hover:text-sky-600 font-medium"
            >
              Return to Login
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
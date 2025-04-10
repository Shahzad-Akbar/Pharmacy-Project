'use client'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function UserNavbar() {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  const handleLogout = () => {
    // Add logout logic here
    router.push('/login')
  }

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <Link href="/dashboard" className="text-2xl font-bold text-primary">
            PHARMACY
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            <Link href="/product" className="text-gray-600 hover:text-primary">
              Products
            </Link>
            <Link href="/cart" className="text-gray-600 hover:text-primary">
              Cart (0)
            </Link>
            <Link href="/profile" className="text-gray-600 hover:text-primary">
              Profile
            </Link>
            <button
              onClick={handleLogout}
              className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90"
            >
              Logout
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-600"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        <div className={`md:hidden ${isOpen ? 'block' : 'hidden'} mt-4`}>
          <div className="flex flex-col space-y-4">
            <Link href="/product" className="text-gray-600 hover:text-primary">
              Products
            </Link>
            <Link href="/cart" className="text-gray-600 hover:text-primary">
              Cart (0)
            </Link>
            <Link href="/profile" className="text-gray-600 hover:text-primary">
              Profile
            </Link>
            <button
              onClick={handleLogout}
              className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90 w-full text-left"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
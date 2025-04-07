'use client'
import Link from 'next/link'
import { useState } from 'react'

export default function PublicNavbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-white text-black shadow-md">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-green-300">PHARMACY</Link>
          
          {/* Hamburger Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden focus:outline-none"
          >
            <svg className="w-6 h-6 text-gray-700" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              {isOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-blue-600 transition-colors">Home</Link>
            <Link href="/about" className="text-gray-700 hover:text-blue-600 transition-colors">About</Link>
            <Link 
              href="/login" 
              className="bg-primary px-4 py-2 rounded-md text-gray-700 hover:text-blue-600 transition-colors"
            >
              Login
            </Link>
            <Link 
              href="/signup" 
              className="bg-primary px-4 py-2 rounded-md text-gray-700 hover:text-blue-600 transition-colors"
            >
              Sign Up
            </Link>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`${isOpen ? 'block' : 'hidden'} md:hidden mt-4`}>
          <div className="flex flex-col space-y-4">
            <Link 
              href="/" 
              className="text-gray-700 hover:text-blue-600 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link 
              href="/about" 
              className="text-gray-700 hover:text-blue-600 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            <Link 
              href="/login" 
              className="bg-primary px-4 py-2 rounded-md text-gray-700 hover:text-blue-600 transition-colors inline-block"
              onClick={() => setIsOpen(false)}
            >
              Login
            </Link>
            <Link 
              href="/signup" 
              className="bg-primary px-4 py-2 rounded-md text-gray-700 hover:text-blue-600 transition-colors inline-block"
              onClick={() => setIsOpen(false)}
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
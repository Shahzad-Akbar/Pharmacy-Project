import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="container mx-auto px-6 py-16">
        <h1 className="text-5xl font-bold text-gray-800 mb-6">
          Welcome to Medical Store
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Your trusted online pharmacy for all medical needs
        </p>
        <div className="space-x-4">
          <Link 
            href="/login" 
            className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700"
          >
            Login
          </Link>
          <Link 
            href="/signup" 
            className="bg-white text-blue-600 px-6 py-3 rounded-md border border-blue-600 hover:bg-blue-50"
          >
            Sign Up
          </Link>
        </div>
      </div>

      {/* Quick Links */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Link 
            href="/about" 
            className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg"
          >
            <h2 className="text-2xl font-bold mb-4">About Us</h2>
            <p className="text-gray-600">Learn more about our services and mission</p>
          </Link>

          <Link 
            href="/products" 
            className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg"
          >
            <h2 className="text-2xl font-bold mb-4">Our Products</h2>
            <p className="text-gray-600">Browse our wide range of medicines</p>
          </Link>

          <Link 
            href="/contact" 
            className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg"
          >
            <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
            <p className="text-gray-600">Get in touch with our support team</p>
          </Link>
        </div>
      </div>
    </div>
  )
}
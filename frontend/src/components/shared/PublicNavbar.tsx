import Link from 'next/link'

export default function PublicNavbar() {
  return (
    <nav className="bg-white text-black shadow-md">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-green-300">PHARMACY</Link>
        <div className="flex items-center space-x-8">
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
    </nav>
  )
}
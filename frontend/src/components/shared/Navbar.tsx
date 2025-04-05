export default function PublicNavbar() {
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <a href="/" className="text-2xl font-bold text-gray-800">
              Medical Store
            </a>
          </div>
          
          <div className="flex space-x-6">
            <a href="/" className="text-gray-700 hover:text-blue-600">
              Home
            </a>
            <a href="/about" className="text-gray-700 hover:text-blue-600">
              About
            </a>
            <a href="/contact" className="text-gray-700 hover:text-blue-600">
              Contact
            </a>
            <a href="/login" className="text-gray-700 hover:text-blue-600">
              Login
            </a>
            <a href="/signup" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
              Sign Up
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
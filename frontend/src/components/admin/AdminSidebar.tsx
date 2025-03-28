export default function AdminSidebar() {
  return (
    <aside className="bg-gray-800 text-white w-64 min-h-screen p-4">
      <div className="mb-8">
        <h2 className="text-2xl font-bold">Medical Store</h2>
      </div>
      
      <nav className="space-y-2">
        <a href="/admin/dashboard" className="block px-4 py-2 rounded hover:bg-gray-700">
          Dashboard
        </a>
        <a href="/admin/product" className="block px-4 py-2 rounded hover:bg-gray-700">
          Products
        </a>
        <a href="/admin/inventory" className="block px-4 py-2 rounded hover:bg-gray-700">
          Inventory
        </a>
        <a href="/admin/manage" className="block px-4 py-2 rounded hover:bg-gray-700">
          Orders
        </a>
        <a href="/admin/users" className="block px-4 py-2 rounded hover:bg-gray-700">
          Users
        </a>
        <a href="/admin/settings" className="block px-4 py-2 rounded hover:bg-gray-700">
          Settings
        </a>
      </nav>
    </aside>
  );
}
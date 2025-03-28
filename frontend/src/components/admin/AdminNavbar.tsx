export default function AdminNavbar() {
  return (
    <nav className="bg-white shadow-md px-6 py-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Admin Dashboard</h1>
        <div className="flex items-center gap-4">
          <span className="text-gray-600">Admin Name</span>
          <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Contact Us</h1>
      <form className="max-w-lg mx-auto">
        <div className="mb-4">
          <label className="block mb-2">Name</label>
          <input type="text" className="w-full border p-2 rounded" />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Email</label>
          <input type="email" className="w-full border p-2 rounded" />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Message</label>
          <textarea className="w-full border p-2 rounded" rows={4}></textarea>
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Send Message
        </button>
      </form>
    </div>
  );
}
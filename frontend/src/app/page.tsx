import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/shared/PublicNavbar'
import Footer from '@/components/shared/Footer'

export default function Home() {
  return (
    <div className="min-h-screen bg-teal-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="container mx-auto px-6 py-12 flex items-center">
        <div className="w-1/2 pr-12">
          <h1 className="text-5xl font-bold text-black mb-6">
            Your Trusted Pharmacy
          </h1>
          <p className="text-gray-600 text-lg mb-8">
            We provide a wide range of prescription and over-the-counter medications, 
            along with expert advice and personalized care to meet your health needs.
          </p>
          <Link 
            href="/products" 
            className="bg-blue-300 hover:bg-blue-500 text-white px-6 py-3 rounded-2xl text-lg font-medium"
          >
            SHOP NOW
          </Link>
        </div>
        <div className="w-1/2">
          <Image
            src="/images/pharmist.png"
            alt="Professional Pharmacist"
            width={600}
            height={600}
            className="rounded-lg"
          />
        </div>
      </section>
     {/* card-section */}
     <section className="container mx-auto px-6 py-16">
        <h2 className="text-2xl font-bold text-black mb-8">Featured Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Product Card 1 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="h-64 relative">
              <Image
                src="/landing/multivitamin.jpeg"
                alt="Multivitamin Complex"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-lg font-semibold text-cyan-500 mb-2">Multivitamin Complex</h3>
              <p className="text-gray-600 mb-4">Support your daily nutritional needs with our comprehensive multivitamin formula</p>
              <Link 
                href="/products/multivitamin"
                className="bg-primary text-white px-4 py-2 rounded inline-block hover:bg-opacity-90"
              >
                Shop Now
              </Link>
            </div>
          </div>

          {/* Product Card 2 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="h-64 relative">
              <Image
                src="/landing/allergy-relief.jpeg"
                alt="Allergy Relief Tablets"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-lg font-semibold text-cyan-500 mb-2">Allergy Relief Tablets</h3>
              <p className="text-gray-600 mb-4">Relieve seasonal allergy symptoms with our effective allergy relief tablets</p>
              <Link 
                href="/products/allergy-relief"
                className="bg-primary text-white px-4 py-2 rounded inline-block hover:bg-opacity-90"
              >
                Shop Now
              </Link>
            </div>
          </div>

          {/* Product Card 3 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="h-64 relative">
              <Image
                src="/landing/first-kit.jpeg"
                alt="Complete First Aid Kit"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-lg font-semibold text-cyan-500 mb-2">Complete First Aid Kit</h3>
              <p className="text-gray-600 mb-4">Be prepared for any minor injury with our complete and portable first aid kit</p>
              <Link 
                href="/products/first-aid-kit"
                className="bg-primary text-white px-4 py-2 rounded inline-block hover:bg-opacity-90"
              >
                Shop Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-black mb-12">Featured Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Service 1 */}
            <div className="text-center p-6">
              <div className="text-primary text-5xl mb-4">⚕️</div>
              <h3 className="text-xl font-semibold text-green-700 mb-3">
                Prescription Services
              </h3>
              <p className="text-gray-600">
                Quick and accurate prescription filling services for all your medication needs.
              </p>
            </div>

            {/* Service 2 */}
            <div className="text-center p-6">
              <div className="text-primary text-5xl mb-4">💊</div>
              <h3 className="text-xl font-semibold text-green-700 mb-3">
                OTC Medications
              </h3>
              <p className="text-gray-600">
                A variety of over-the-counter medications for common health conditions.
              </p>
            </div>

            {/* Service 3 */}
            <div className="text-center p-6">
              <div className="text-primary text-5xl mb-4">👩‍⚕️</div>
              <h3 className="text-xl font-semibold text-green-700 mb-3">
                Health Consultations
              </h3>
              <p className="text-gray-600">
                Personalized advice and support from our experienced pharmacists.
              </p>
            </div>

            {/* service 4 */}
            <div className="text-center p-6">
              <div className="text-primary text-5xl mb-4">💉
              </div>
              <h3 className="text-xl font-semibold text-green-700 mb-3">
              Vaccinations
              </h3>
              <p className="text-gray-600">
              Protect yourself and your community with our available vaccinations. Schedule your appointment online.
              </p>
            </div>
            
          </div>
        </div>
      </section>

      {/* Health Tips Section */}
<section className="py-16">
  <div className="container mx-auto px-6">
    <h2 className="text-3xl font-bold text-black mb-12">
      Health Tips & Wellness
    </h2>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      
      {/* Tip 1 */}
      <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
        <h3 className="text-lg font-semibold text-emerald-700 mb-2">
          🥗 Eat Well, Stay Strong
        </h3>
        <p className="text-gray-700 text-sm">
          Discover the best foods to support your immune system and improve energy naturally.
        </p>
        <a href="#" className="text-blue-700 text-sm font-medium mt-3 inline-block hover:underline">
          Read more
        </a>
      </div>

      {/* Tip 2 */}
      <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
        <h3 className="text-lg font-semibold text-emerald-700 mb-2">
          💤 Sleep & Mental Health
        </h3>
        <p className="text-gray-700 text-sm">
          Learn how quality sleep impacts mental clarity, mood, and overall well-being.
        </p>
        <a href="#" className="text-blue-700 text-sm font-medium mt-3 inline-block hover:underline">
          Read more
        </a>
      </div>

      {/* Tip 3 */}
      <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
        <h3 className="text-lg font-semibold text-emerald-700 mb-2">
          🚶‍♂️ Fitness Basics
        </h3>
        <p className="text-gray-700 text-sm">
          Get started with simple, effective routines to improve your physical health.
        </p>
        <a href="#" className="text-blue-700 text-sm font-medium mt-3 inline-block hover:underline">
          Read more
        </a>
      </div>

    </div>
  </div>
</section>

      
      

      {/* Footer */}
      <Footer />
    </div>
  )
}
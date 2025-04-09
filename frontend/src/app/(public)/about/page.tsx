import Image from 'next/image'

export default function AboutPage() {
  return (
    <div className="bg-[#F8F9FA]">
      {/* Hero Section */}
      <section className="py-12 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#023E8A]/10 to-[#0096C7]/10 z-0"></div>
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="text-center lg:text-left relative z-10">
              <h1 className="text-3xl md:text-5xl font-bold text-[#023E8A] mb-4 md:mb-6 leading-tight">
                About <span className="text-[#0077B6]">IndianPharmo</span>
              </h1>
              <div className="w-20 h-2 bg-[#0096C7] mb-8"></div>
              <p className="text-gray-700 text-lg mb-8 leading-relaxed">
                Welcome to <span className="text-[#0077B6] font-semibold">IndianPharmo</span> — 
                your trusted healthcare partner since <strong>2022</strong>.
              </p>
              <p className="text-gray-700 text-lg mb-8 leading-relaxed">
                We are committed to improving your well-being by offering a complete range of high-quality services including:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-[#0096C7] rounded-full"></div>
                  <span className="text-[#0096C7] font-medium">Medicines</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-[#0096C7] rounded-full"></div>
                  <span className="text-[#0096C7] font-medium">Health Services</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-[#0096C7] rounded-full"></div>
                  <span className="text-[#0096C7] font-medium">Treatments</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-[#0096C7] rounded-full"></div>
                  <span className="text-[#0096C7] font-medium">Professional Consultations</span>
                </div>
              </div>
            </div>
            <div className="relative z-10 order-first lg:order-last">
              <div className="relative h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] w-full rounded-lg overflow-hidden shadow-xl">
                <Image
                  src="/images/pharmacy-about.png"
                  alt="Modern Pharmacy Interior"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-40 h-40 bg-[#023E8A]/10 rounded-full z-0"></div>
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-[#0096C7]/10 rounded-full z-0"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="bg-white py-8 md:py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 text-center">
            <div>
              <h3 className="text-3xl font-bold text-[#023E8A] mb-2">5000+</h3>
              <p className="text-gray-600">Happy Customers</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-[#023E8A] mb-2">1000+</h3>
              <p className="text-gray-600">Medicines Available</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-[#023E8A] mb-2">24/7</h3>
              <p className="text-gray-600">Customer Support</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-[#023E8A] mb-2">50+</h3>
              <p className="text-gray-600">Expert Staff</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values Section */}
      <section className="py-8 md:py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div className="bg-white shadow-md p-6 rounded-lg transform hover:scale-105 transition-transform">
              <div className="text-4xl text-[#023E8A] mb-4">🎯</div>
              <h3 className="text-xl font-semibold text-[#023E8A] mb-2">Our Mission</h3>
              <p className="text-gray-600">To make healthcare accessible, affordable, and reliable for everyone in India.</p>
            </div>

            <div className="bg-white shadow-md p-6 rounded-lg transform hover:scale-105 transition-transform">
              <div className="text-4xl text-[#023E8A] mb-4">👁️</div>
              <h3 className="text-xl font-semibold text-[#023E8A] mb-2">Our Vision</h3>
              <p className="text-gray-600">To become India&apos;s leading digital pharmacy, blending compassion with technology.</p>
            </div>

            <div className="bg-white shadow-md p-6 rounded-lg transform hover:scale-105 transition-transform">
              <div className="text-4xl text-[#023E8A] mb-4">💎</div>
              <h3 className="text-xl font-semibold text-[#023E8A] mb-2">Why Choose Us?</h3>
              <p className="text-gray-600">Fast delivery, licensed pharmacists, and 24/7 support to meet your healthcare needs.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="bg-white py-8 md:py-16">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-[#023E8A] text-center mb-8 md:mb-12">Our Core Values</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            <div className="text-center">
              <div className="bg-[#F8F9FA] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🤝</span>
              </div>
              <h3 className="text-lg font-semibold text-[#023E8A] mb-2">Trust</h3>
              <p className="text-gray-600">Building lasting relationships through reliability and transparency</p>
            </div>
            <div className="text-center">
              <div className="bg-[#F8F9FA] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⭐</span>
              </div>
              <h3 className="text-lg font-semibold text-[#023E8A] mb-2">Quality</h3>
              <p className="text-gray-600">Ensuring the highest standards in all our products and services</p>
            </div>
            <div className="text-center">
              <div className="bg-[#F8F9FA] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💡</span>
              </div>
              <h3 className="text-lg font-semibold text-[#023E8A] mb-2">Innovation</h3>
              <p className="text-gray-600">Embracing technology to improve healthcare delivery</p>
            </div>
            <div className="text-center">
              <div className="bg-[#F8F9FA] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">❤️</span>
              </div>
              <h3 className="text-lg font-semibold text-[#023E8A] mb-2">Care</h3>
              <p className="text-gray-600">Putting our customer&apos;s health and well-being first</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

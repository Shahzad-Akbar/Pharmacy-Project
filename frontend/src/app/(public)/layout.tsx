import PublicNavbar from '@/components/shared/PublicNavbar'
import Footer from '@/components/shared/Footer'

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <PublicNavbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}
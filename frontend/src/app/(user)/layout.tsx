import UserNavbar from '@/components/user/UserNavbar'
import Footer from '@/components/shared/Footer'

export default function UserLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <UserNavbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}
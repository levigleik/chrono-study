import { fontSans } from '@/config/fonts'
import Footer from './footer'
import Header from './header'

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Header />
      <main className={`${fontSans.className} text-medium`}>{children}</main>
      <Footer />
    </>
  )
}

import { Libre_Baskerville } from 'next/font/google'

const baskerville = Libre_Baskerville({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-baskerville',
})
export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <main className={baskerville.className}>{children}</main>
}

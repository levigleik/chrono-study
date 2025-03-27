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
  return (
    <main
      className={`mx-auto h-screen max-w-[90rem] px-4 py-6 ${baskerville.className} sm:px-8`}
    >
      {children}
    </main>
  )
}

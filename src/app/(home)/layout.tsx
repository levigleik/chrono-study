import { fontSans } from '@/config/fonts'

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <main className={`${fontSans.className} text-medium`}>{children}</main>
}

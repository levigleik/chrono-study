import type { Metadata } from 'next'
import './globals.css'
import { Providers } from './providers'

const APP_NAME = 'Chrono Study'
const APP_DEFAULT_TITLE = 'Chrono Study'
const APP_TITLE_TEMPLATE = '%s - Chrono Study'
const APP_DESCRIPTION = 'Uma ferramenta para estudantes'

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: APP_DEFAULT_TITLE,
    // startUpImage: [],
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: 'website',
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: 'summary',
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt" translate="no">
      <body className="antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}

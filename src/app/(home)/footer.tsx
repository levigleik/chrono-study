'use client'
import { Link } from '@heroui/react'

export default function Footer() {
  return (
    <footer className="mt-16 border-t bg-background py-6">
      <div className="mx-auto max-w-[1440px] px-4 text-center text-sm">
        Desenvolvido com ❤️ por{' '}
        <Link
          href="https://levigleik.vercel.app"
          className="font-semibold text-secondary hover:underline"
          isExternal
        >
          Levi Gleik
        </Link>{' '}
        • 2025
      </div>
    </footer>
  )
}

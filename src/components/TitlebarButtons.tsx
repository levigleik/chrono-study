'use client'

import { Link } from '@heroui/react'
import { useRouter } from 'next/navigation'
import { FaMinus, FaPlus, FaTimes } from 'react-icons/fa'

interface TitlebarButtonsProps {
  linkMinus: string
  linkPlus: string
  linkTimes: string
  onClickMinus?: () => void
  onClickPlus?: () => void
  onClickTimes?: () => void
}

export default function TitlebarButtons({
  linkMinus,
  linkPlus,
  linkTimes,
  onClickMinus,
  onClickPlus,
  onClickTimes,
}: TitlebarButtonsProps) {
  const router = useRouter()
  return (
    <>
      <Link
        href={linkTimes}
        onClick={(e) => {
          e.preventDefault()
          if (!onClickTimes) {
            if (document.startViewTransition) {
              document.startViewTransition(() => {
                router.push('/')
              })
            } else {
              router.push('/')
            }
          } else onClickTimes()
        }}
        className="h-4 w-4 rounded-full bg-danger-500 p-2 text-black transition-all ease-in hover:p-1"
      >
        <FaTimes />
      </Link>
      <Link
        href={linkMinus}
        onClick={(e) => {
          e.preventDefault()
          if (!onClickMinus) {
            if (document.startViewTransition) {
              document.startViewTransition(() => {
                router.push('/')
              })
            } else {
              router.push('/')
            }
          } else onClickMinus()
        }}
        className="h-4 w-4 rounded-full bg-yellow-300 p-2 text-black transition-all ease-in hover:p-1"
      >
        <FaMinus />
      </Link>
      <Link
        href={linkPlus}
        onClick={(e) => {
          e.preventDefault()
          if (!onClickPlus) {
            if (document.startViewTransition) {
              document.startViewTransition(() => {
                router.push('/chrono')
              })
            } else {
              router.push('/chrono')
            }
          } else onClickPlus()
        }}
        className="h-4 w-4 rounded-full bg-green-500 p-2 text-black transition-all ease-in hover:p-1"
      >
        <FaPlus />
      </Link>
    </>
  )
}

'use client'
import Theme from '@/app/(home)/components/Theme'
import {
  Button,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from '@heroui/react'
import { useRouter } from 'next/navigation'
import { FaGithub } from 'react-icons/fa'

export default function NavbarComp() {
  const router = useRouter()
  return (
    <Navbar
      classNames={{
        wrapper: 'max-w-[1440px] px-2 py-6 sm:px-6 md:px-8',
        base: 'bg-card',
      }}
      position="static"
    >
      <NavbarBrand>
        <Link
          href="/chrono"
          className="font-bold text-2xl text-foreground"
          onClick={(e) => {
            e.preventDefault()
            if (document.startViewTransition) {
              document.startViewTransition(() => {
                router.push('/')
              })
            } else {
              router.push('/')
            }
          }}
        >
          Chrono Study
        </Link>
      </NavbarBrand>
      <NavbarContent justify="end">
        <NavbarItem className="text-foreground">
          <Theme className="text-foreground" />
        </NavbarItem>
        <NavbarItem className="text-foreground">
          <Button
            href="https://github.com/levigleik/chrono-study"
            className="text-foreground text-medium"
            as={Link}
            variant="bordered"
            radius="full"
            size="sm"
            isExternal
            aria-label="Github"
          >
            <FaGithub className="mr-2" />
            Github
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}

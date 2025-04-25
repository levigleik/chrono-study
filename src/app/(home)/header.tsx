'use client'
import {
  Button,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from '@heroui/react'
import { FaGithub } from 'react-icons/fa'
import Theme from './components/Theme'

export default function Header() {
  return (
    <Navbar
      classNames={{
        wrapper: 'max-w-7xl px-2 py-6 sm:px-6 md:px-8',
        base: 'bg-secondary',
      }}
      position="static"
    >
      <NavbarBrand className="font-bold text-2xl text-white">
        Chrono Study
      </NavbarBrand>
      <NavbarContent justify="end">
        <NavbarItem className="text-white">
          <Theme className="text-white" />
        </NavbarItem>
        <NavbarItem className="text-white">
          <Link
            href="#"
            className="text-white"
            as={Button}
            variant="bordered"
            radius="full"
            size="sm"
          >
            <FaGithub className="mr-2" />
            Github
          </Link>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}

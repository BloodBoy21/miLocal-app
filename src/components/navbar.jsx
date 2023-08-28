import { useState, useEffect } from 'react'
import {
  Navbar,
  Typography,
  Collapse,
  IconButton
} from '@material-tailwind/react'
import { AccountCircle, Logout, Store } from '@mui/icons-material'
import { Link } from '@tanstack/react-router'
import { usePlacesWidget } from 'react-google-autocomplete'
const MAPS_API = import.meta.env.VITE_MAPS_API_KEY

const NavbarDefault = ({
  address,
  hasUser,
  logout,
  changeAddress,
  setLocation
}) => {
  const { ref } = usePlacesWidget({
    apiKey: MAPS_API,
    onPlaceSelected: (place) => {
      const lat = place.geometry.location.lat()
      const lon = place.geometry.location.lng()
      setLocation(lat, lon)
    }
  })
  const [openNav, setOpenNav] = useState(false)
  useEffect(() => {
    window.addEventListener(
      'resize',
      () => window.innerWidth >= 960 && setOpenNav(false)
    )
  }, [])

  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6 ">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <Link to="/login" className="flex items-center">
          Sign in
        </Link>
      </Typography>
    </ul>
  )

  const stackList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6 ">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal cursor-pointer flex items-center gap-2"
      >
        <Store className="cursor-pointer" />
        Stores
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal cursor-pointer flex items-center gap-2"
      >
        <AccountCircle className="cursor-pointer" />
        Account
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal cursor-pointer flex items-center gap-2"
      >
        <Logout className="cursor-pointer" />
        Logout
      </Typography>
    </ul>
  )

  const storeOwnerNavList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6 ">
      <Store className="cursor-pointer" />
      <AccountCircle className="cursor-pointer" />
      <Logout className="cursor-pointer" onClick={logout} />
    </ul>
  )
  function handleInputChange (event) {
    changeAddress(event.target.value)
  }
  return (
    <Navbar className="mx-auto max-w-screen-2xl py-2 px-4 lg:px-8 lg:py-4">
      <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
        <Typography
          className="mr-4 cursor-pointer py-1.5 font-bold"
        >
          <Link to="/">YourStores</Link>
        </Typography>

        <input
          value={address}
          size="md"
          ref={ref}
          onChange={handleInputChange}
          className="w-96 rounded-md border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-base px-2 py-1"
        />

        <div className="hidden lg:block">
          {hasUser ? storeOwnerNavList : navList}
        </div>
        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav
            ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
              )
            : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
              )}
        </IconButton>
      </div>
      <Collapse open={openNav}>
        <div className="container mx-auto">
          {hasUser ? stackList : navList}

        </div>
      </Collapse>
    </Navbar>
  )
}

export default NavbarDefault

/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import UserStore from '../storages/user'
import { useGetNearby } from '../hooks/store'
import StoreCard from '../components/storeCard'
import NavbarDefault from '../components/navbar'
import _ from 'lodash'

const getAddress = async (location) => {
  const { lon, lat } = location
  const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`)
  const data = await response.json()
  return data?.display_name || ''
}

const setLocationHook = ({ setLocation, refetch }) => {
  if (!navigator.geolocation) return console.error('Geolocation is not supported by your browser')
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude } = position.coords
      setLocation(latitude, longitude)
      refetch()
    },
    (error) => {
      console.error(error)
    }
  )
}

const errorMessages = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold">Something went wrong</h1>
      <p className="text-lg">Please try again later</p>
    </div>
  )
}

const StoreList = ({ stores = [] }) => {
  return (
    <div className="flex gap-4 w-full justify-center px-2" >
      {stores.map((store) => (
        <StoreCard
          key={store.store_id}
          name={store.name}
          address={store.address}
          image={store.image}
          storeId={store.store_id}
        />
      ))}
    </div>
  )
}

const Landing = () => {
  const { location, setLocation, setStores, user, logout } = UserStore()
  const [userAddress, setUserAddress] = useState('')
  const { data, error, refetch } = useGetNearby(location.lat, location.lon)
  useEffect(() => {
    setLocationHook({ setLocation, refetch })
    setStores(data)
    getAddress(location).then((address) => {
      setUserAddress(address)
    })
  }, [setLocation, setUserAddress, refetch, location, data, setStores])

  useEffect(() => {
    refetch()
  }, [location, refetch])

  if (error) return errorMessages()

  return (
    <main>
      <section className="flex flex-col items-center  h-screen w-screen bg-blue-gray-100 pt-5">
        <NavbarDefault address={userAddress} hasUser={!_.isEmpty(user)} logout={logout} changeAddress={setUserAddress} setLocation={setLocation}
        />
        <StoreList stores={data}/>
      </section>
    </main>
  )
}

export default Landing

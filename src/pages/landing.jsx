/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import UserStore from '../storages/user'
import { useGetNearby } from '../hooks/store'
import StoreCard from '../components/storeCard'
import NavbarDefault from '../components/navbar'

const getAddress = async (location) => {
  const { lon, lat } = location
  const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`)
  const data = await response.json()
  console.log(data)
  return data?.display_name || ''
}

const setLocationHook = ({ setLocation, refetch }) => {
  if (navigator.geolocation) {
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
  } else {
    console.error('Geolocation is not supported by this browser.')
  }
}

const StoreList = ({ stores = [] }) => {
  return (
    <div className="flex gap-4">
      {stores.map((store) => (
        <StoreCard
          key={store.store_id}
          name={store.name}
          address={store.address}
          image={store.image}
        />
      ))}
    </div>
  )
}

const Landing = () => {
  const { location, setLocation, setStores } = UserStore()
  const [userAddress, setUserAddress] = useState('')
  const { data, error, refetch } = useGetNearby(location.lat, location.lon)
  useEffect(() => {
    setLocationHook({ setLocation, refetch })
    setStores(data)
    getAddress(location).then((address) => {
      console.log(address)
      setUserAddress(address)
    })
  }, [setLocation, location, refetch, setStores, data, setUserAddress])
  if (error) return <div>failed to load</div>
  return (
    <main>
      <section className="flex flex-col items-center  h-screen w-screen bg-blue-gray-100 pt-5">
        <NavbarDefault address={userAddress}/>
        <StoreList stores={data} />
      </section>
    </main>
  )
}

export default Landing

import React from 'react'
import BottomNav from '../components/Navbar'
import ProductList from '../components/ProductList'

export default function Menu() {
  return (
    <div className='w-screen h-screen justify-center flex flex-col items-center'>
      Questo sarà il Menu
      <ProductList/>
      <BottomNav />
    </div>
  )
}

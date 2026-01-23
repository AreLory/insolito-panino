import React from 'react'
import BottomNav from '../components/Navbar'
import CartItem from '../components/CartItem'

export default function Order() {
  return (
    <div className='w-screen h-screen justify-center flex flex-col items-center'>
      Da qui si potrà ordinare
      <CartItem />
    </div>
  )
}

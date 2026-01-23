import React from 'react'
import BottomNav from '../components/Navbar'
import CartItem from '../components/CartItem'
import { useDispatch } from 'react-redux'
import { clearCart } from '../features/cart/cartSlice'

export default function Order() {
  const dispatch = useDispatch()
  return (
    <div className='w-screen h-screen justify-center flex flex-col items-center'>
      <button onClick={()=>dispatch(clearCart())}>CLEAR ALL</button>
      <CartItem />
    </div>
  )
}

import { useState } from 'react'

import CartItem from '../components/CartItem'
import { useDispatch, useSelector } from 'react-redux'
import { clearCart } from '../features/cart/cartSlice'
import { selectCartItems, selectCartTotal } from '../features/cart/cartSelector'
import { api } from '../config/axios'
import type { IOrder } from '../types/IOrder'

export default function Order() {
  const cart = useSelector(selectCartItems)
  const dispatch = useDispatch()
  const total = useSelector(selectCartTotal)
  const [notes, setNotes] = useState('no notes')

  const createOrder = async ()=>{
    try {  
      const order = await api.post<IOrder>("/orders", {
        items: cart,
        paymentMethod: 'cash',
        orderType:'take_away',
        notes
      })
      console.log("✅ Order created:", order.data)
      dispatch(clearCart());

    } catch (error: any) {
      console.error("❌ Order error:", error?.response?.status, error?.response?.data || error.message)
    }
  }

  
  return (
    <div className='w-screen h-screen  flex flex-col items-center bg-white'>
      <h2 className='text-xl my-4'>My Cart</h2>
      <CartItem />
      Total: {total}
      <button onClick={createOrder} disabled={!cart.length}>Submit</button>
      <button onClick={()=>dispatch(clearCart())}>CLEAR ALL</button>
    </div>
  )
}

// todo: Navbar (fixed bottom)
// todo: Menu
// todo: Cart
// todo: Orders


// ** Components
import BottomNav from "../components/BottomNav"
import { useAuth } from "../context/AuthContext"

const Home = ()=> {
  const {logout} = useAuth()
  return (
    <div className="w-screen h-screen justify-center flex flex-col items-center">
      
      Hi from HomePage
      <button onClick={logout}>LOGOUT</button>
    </div>
  )
}

export default Home
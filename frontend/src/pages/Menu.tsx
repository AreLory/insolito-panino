import {useState} from 'react'
import BottomNav from '../components/Navbar'
import ProductList from '../components/ProductList'

export default function Menu() {
  
  const categories = ['burger', 'pulled', 'fried-chicken','sausages', 'fries', 'fried', 'arrosticini', 'vegetarian']
  const [selectedCategory, setCategory] = useState(categories[0])

  return (
    <div className='w-screen h-screen justify-center flex flex-col items-center'>
      <div className="flex gap-2 mt-2 fixed top-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={()=>setCategory(cat)}
              className={`px-2 py-1 border rounded w-30 cursor-pointer ${
                  selectedCategory == cat
                  ? "bg-accent text-white"
                  : ""
              }`}
            >
              {cat}
            </button>
          ))}

        </div>
      <ProductList category={selectedCategory}/>
      <BottomNav />
    </div>
  )
}

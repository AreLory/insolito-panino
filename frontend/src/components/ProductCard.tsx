import React from "react";
import type { IProducts } from "../types/IProducts";
import { useDispatch} from "react-redux";
import { addToCart } from "../features/cart/cartSlice";

export default function ProductCard({item}:{item:IProducts}) {
    const dispatch = useDispatch()
  return (
    // <div key={item.id}>
    //   {item.name} 
    //   <p>Price: €{item.basePrice}</p>
    //   {item.ingredients.map(i=><p>{i.name}</p>)}
    //   <button onClick={() => dispatch(addToCart(item))}>+</button>
    // </div>
    <div className="w-full max-w-xs px-2 sm:px-1 py-2 min-w-60 bg-accent mb-2">
     <h3>{item.name}</h3>
     <h3>€{item.basePrice}</h3>
     <h3>{item.category}</h3>
     <button className="bg-secondary rounded-full size-10" 
     onClick={() => dispatch(addToCart(item))}>+</button>
    </div>
  );
}


// ! Il button + Aggiunge nel carrello +1 solo l'ultimo prodotto inserito 
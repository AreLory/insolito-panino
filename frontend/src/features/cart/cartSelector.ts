import type { IProducts } from "../../types/IProducts";


export const selectCartItems = (state:any) => {
    return state.cart.products.map((product:IProducts) =>({
        ...product,
        quantity: state.cart.quantityById[product.id]
    }))
}
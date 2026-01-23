import type { IProducts } from "./IProducts"


export interface ICartState {
    products: IProducts[]
    quantityById: Record<string,number>
}
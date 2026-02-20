
interface Props {
    price: number, 
    onAddToCart: ()=> void;
}
export default function AddToCartBar({price, onAddToCart}:Props) {


  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
        <div className="max-w-2xl mx-auto p-4">
          <button
            onClick={() => onAddToCart()}
            className={` w-full bg-linear-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-4 rounded-xl transition-all shadow-lg hover:shadow-xl flex items-center justify-between px-6 `}
          >
            <span className="text-lg">Aggiungi al carrello</span>
            <span className="text-xl font-bold">€{price.toFixed(2)}</span>
          </button>
        </div>
      </div>
  );
}

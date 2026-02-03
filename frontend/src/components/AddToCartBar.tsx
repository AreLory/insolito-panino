
interface Props {
    price: number, 
    isAuthenticated: boolean,
    onAddToCart: ()=> void;
}
export default function AddToCartBar({price, isAuthenticated, onAddToCart}:Props) {


  
  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl flex justify-between items-center h-20 bg-primary rounded-t-xl px-4">
      <h2 className="text-lg font-bold text-center text-white w-[40%]">
        €{price ? price.toFixed(2): '--'}
      </h2>

      <button
        onClick={isAuthenticated ? onAddToCart : undefined}
        className={`mt-3 p-1 text-sm w-[60%] py-2 rounded transition hover:scale-105 cursor-pointer ${isAuthenticated ? " bg-secondary text-primary" : "bg-gray-500 text-white"}`}
      >
        Add to Cart
      </button>
    </div>
  );
}

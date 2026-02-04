interface Props {
  onRemoveFromCart: () => void;
  onAddToCart: () => void;
  quantity: number
}
export default function CartCountingControls({quantity, onRemoveFromCart, onAddToCart}:Props) {
  return (
    <div className="flex items-center justify-around ">
      <button
        onClick={onRemoveFromCart}
        className="bg-blue-100 border border-r-0 rounded-l-lg size-8"
      >
        -
      </button>
      <h3 className="size-8 border text-center ">x {quantity}</h3>
      <button
        onClick={onAddToCart}
        className="bg-blue-100 border border-l-0 rounded-r-lg size-8"
      >
        +
      </button>
    </div>
  );
}

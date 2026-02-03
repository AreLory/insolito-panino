interface Props {
  onRemoveFromCart: () => void;
  onAddToCart: () => void;
  quantity: number
}
export default function CartCountingControls({quantity, onRemoveFromCart, onAddToCart}:Props) {
  return (
    <div className="flex items-center justify-around">
      <button
        onClick={() => onRemoveFromCart}
        className="bg-secondary border border-r-0 rounded-l-lg w-10"
      >
        -
      </button>
      <h3 className="w-10 border text-center">x {quantity}</h3>
      <button
        onClick={() => onAddToCart}
        className="bg-secondary border border-l-0  rounded-r-lg w-10"
      >
        +
      </button>
    </div>
  );
}

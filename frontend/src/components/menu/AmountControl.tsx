interface Props {
  onAddToCart: (amount: number) => void;
  quantity: number;
  onRemoveFromCart: (amount: number) => void;
}

export default function AmountControl({
  onAddToCart,
  quantity,
  onRemoveFromCart,
}: Props) {

  const addBtns = [1, 5, 10];
  const removeBtns = [10, 5, 1];
  return (
    <div className="flex items-center justify-center gap-2">
      {removeBtns.map((m) => (
        <button
          key={m}
          onClick={() => onRemoveFromCart(m)}
          className="px-3 py-1 bg-gray-200 rounded"
        >
          -{m}
        </button>
      ))}
      <span className="text-2xl font-bold text-gray-900 w-6 text-center">
        {quantity}
      </span>

      {addBtns.map((m) => (
        <button
          key={m}
          onClick={() => onAddToCart(m)}
          className="px-3 py-1 bg-gray-200 rounded"
        >
          +{m}
        </button>
      ))}
    </div>
  );
}

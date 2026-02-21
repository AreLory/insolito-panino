//Hooks
import { useDispatch, useSelector } from "react-redux";
import { useOrder } from "../hooks/useOrder";
//Components
import MiniNavBar from "../components/shared/MiniNavBar";
import Select from "../components/checkout/Select";

//Interfaces
import type { CreateOrderDTO, Order, OrderItem } from "../types/order";
import type { CartItem } from "../types/cart";

//Redux
import { selectCartItems } from "../features/cart/cartSelectors";

import { clearCart } from "../features/cart/cartSlice";

import { api } from "../config/axios";

//Assets/img
import cashImg from "../assets/img/coins.png";
import cardImg from "../assets/img/credit-card.png";
import bankImg from "../assets/img/bank.png";
import takeAwayImg from "../assets/img/take-away.png";
import dineInImg from "../assets/img/holding-hand-dinner.png";
import deliveryImg from "../assets/img/delivery-man.png";
import { resetOrder } from "../features/checkout/checkoutSlice";
import { ArrowLeft, ShoppingCart } from "lucide-react";

export default function Checkout() {
  const cart = useSelector(selectCartItems);
  const dispatch = useDispatch();
  const {
    order,
    total,
    subtotal,
    changePaymentMethod,
    changeNotes,
    changeOrderType,
  } = useOrder();

  const paymentMethodsList = [
    {
      name: "Cash",
      value: "cash",
      img: cashImg,
    },
    {
      name: "Card",
      value: "card",
      img: cardImg,
    },
    {
      name: "Online",
      value: "online",
      img: bankImg,
    },
  ];
  const orderTypesList = [
    {
      name: "Take Away",
      value: "take_away",
      img: takeAwayImg,
    },
    {
      name: "Dine In",
      value: "dine_in",
      img: dineInImg,
    },
    {
      name: "Delivery",
      value: "delivery",
      img: deliveryImg,
    },
  ];

  const selectedPaymentOption = paymentMethodsList.find(
    (p) => p.value === order.paymentMethod,
  );

  const selectedOrderTypeOption = orderTypesList.find(
    (o) => o.value === order.orderType,
  );
  const submitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formattedItems:OrderItem[] = cart.map((item:CartItem ) => ({
        productId: item._id,
        quantity: item.quantity,
        selectedSize: item.selectedSize,
        removedIngredients: item.removedIngredients,
        selectedExtras: item.selectedExtras,
      }));

      const orderDTO: CreateOrderDTO = {
        items: formattedItems,
        paymentMethod: order.paymentMethod!,
        orderType: order.orderType,
        notes: order.notes,
      };

      const response = await api.post<Order>("/orders", orderDTO);

      console.log("✅ Order created:", response.data);
      dispatch(clearCart());
      dispatch(resetOrder());
    } catch (error: any) {
      console.error(
        "❌ Order error:",
        error?.response?.status,
        error?.response?.data || error.message,
      );
    }
  }; 

  return (
    <div className="w-screen h-screen flex justify-center bg-white">
        <MiniNavBar
          leftChild={<ArrowLeft/>}
          rightChild={<ShoppingCart/>}
          pageName="Checkout"
          goBack="/cart"
          goTo="/cart"
        />
      <div className="pt-20 pb-32 max-w-3xl w-full">
      
        <form
          action="submit"
          onSubmit={submitOrder}
          className="flex w-full justify-center"
        >
          <div className="flex h-full w-full shadow-2xl max-w-3xl rounded-2xl">
            <div className="flex flex-col items-center w-full gap-4">
              <div className="w-full flex flex-col items-center p-4">
                <h2>Choose a Payment Method</h2>
                <Select
                  selectedOption={selectedPaymentOption}
                  onChooseOption={(option) => changePaymentMethod(option.value)}
                  optionList={paymentMethodsList}
                />
              </div>
              <div className="w-full flex flex-col items-center p-4">
                <h2>Choose a Order Type</h2>
                <Select
                  selectedOption={selectedOrderTypeOption}
                  onChooseOption={(option) => changeOrderType(option.value)}
                  optionList={orderTypesList}
                />
              </div>
              <div className="w-full flex flex-col items-center p-4">
                <h2>Add a note</h2>
                <textarea
                  value={order.notes}
                  onChange={(e) => changeNotes(e.target.value)}
                  placeholder="Add a note..."
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center bg-white shadow-2xl w-full max-w-3xl absolute bottom-0 rounded-2xl">
            <div className="w-full pt-6 space-y-3 pb-4 px-6">
              <div className="flex justify-between text-slate-500 text-sm font-medium">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              {order.orderType === "delivery" && (
                <div className="flex justify-between text-slate-500 text-sm font-medium">
                  <span>Delivery Fee</span>
                  <span>+ ${(2.5).toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between items-center pt-4 border-t border-slate-100">
                <span className="text-xl font-bold text-slate-800">Total</span>
                <span className="text-3xl font-bold text-[#FF3B30]">
                  ${total.toFixed(2)}
                </span>
              </div>
            </div>
            <div className="h-20 py-4 px-8 mb-2 flex w-full">
              <button
                type="submit"
                className="w-full bg-[#FF3B30] text-white py-5 rounded-3xl font-bold flex items-center justify-center gap-2 shadow-xl shadow-[#FF3B30]/20 hover:bg-[#E03429] transition-all active:scale-[0.98]"
              >
                <span>Submit Order</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

//Hooks
import { useDispatch, useSelector } from "react-redux";
import { useOrder } from "../hooks/useOrder";
//Components
import MiniNavBar from "../components/MiniNavBar";
import Select from "../components/Select";

//Interfaces
import type { CreateOrderDTO, Order } from "../types/order";
import type { CartItem } from "../types/cart";

//Redux
import { selectCartItems } from "../features/cart/cartSelectors";

import { clearCart } from "../features/cart/cartSlice";

import { api } from "../config/axios";

//Assets/img
import arrowLeft from "../assets/img/arrow-left.png";
import cartImg from "../assets/img/cart-gray.png";
import cashImg from "../assets/img/coins.png";
import cardImg from "../assets/img/credit-card.png";
import bankImg from "../assets/img/bank.png";
import takeAwayImg from "../assets/img/take-away.png";
import dineInImg from "../assets/img/holding-hand-dinner.png";
import deliveryImg from "../assets/img/delivery-man.png";
import { resetOrder } from "../features/checkout/checkoutSlice";

export default function Checkout() {
  const cart = useSelector(selectCartItems);
  const dispatch = useDispatch();
  const { order, total, changePaymentMethod, changeNotes, changeOrderType } =
    useOrder();

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
      const formattedItems = cart.map((item: CartItem) => ({
        _id: item._id,
        name: item.name,
        unitPrice: item.unitPrice,
        quantity: item.quantity,
        selectedSize: item.selectedSize,
        removedIngredients: item.removedIngredients,
        extras: item.extras,
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
      <div className="h-[80vh] w-full md:max-w-4xl md:w-4xl flex flex-col items-center justify-center ">
        <MiniNavBar
          rightImg={cartImg}
          leftImg={arrowLeft}
          pageName="Checkout"
          linkTo="/cart"
        />
        <form
          action="submit"
          onSubmit={submitOrder}
          className="flex w-full justify-center h-full"
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
            <div className="w-full">
              <div className="flex justify-around mt-1">
                <h2 className=" text-lg"> Total: </h2>
                <h2 className=" text-lg"> € {total.toFixed(2)} </h2>
              </div>
            </div>
            <div className="h-20 py-4 px-8 mb-2 flex w-full">
              <button
                type="submit"
                aria-disabled={!cart.length}
                className="bg-secondary rounded-full m-1 flex-2 text-center"
              >
                Submit Order
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

//Hooks
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//Components
import MiniNavBar from "../components/MiniNavBar";
import Select from "../components/Select";
import { Link } from "react-router";

//Interfaces
import type { IOrder } from "../types/IOrder";

import {
  selectCartTotal,
  selectCartItems,
} from "../features/cart/cartSelector";
import { api } from "../config/axios";
import { clearCart } from "../features/cart/cartSlice";

//Assets/img
import arrowLeft from "../assets/img/arrow-left.png";
import cartImg from "../assets/img/cart-gray.png";
import cashImg from "../assets/img/coins.png";
import cardImg from "../assets/img/credit-card.png";
import bankImg from "../assets/img/bank.png";
import takeAwayImg from "../assets/img/take-away.png";
import dineInImg from "../assets/img/holding-hand-dinner.png";
import deliveryImg from "../assets/img/delivery-man.png";

export default function Checkout() {
  const cart = useSelector(selectCartItems);
  const dispatch = useDispatch();
  const total: number = useSelector(selectCartTotal);

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

  const [notes, setNotes] = useState("no notes");
  const [paymentMethod, setPaymentMethod] = useState(paymentMethodsList[0]);
  const [orderType, setOrderType] = useState(orderTypesList[0]);

  const submitOrder = async () => {
    try {
      const order = await api.post<IOrder>("/orders", {
        items: cart,
        paymentMethod,
        orderType,
        notes,
      });
      console.log("✅ Order created:", order.data);
      dispatch(clearCart());
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
        <form action="submit" onSubmit={submitOrder} className="flex w-full justify-center h-full">
          <div className="flex h-full w-full shadow-2xl max-w-3xl rounded-2xl">
            <div className="flex flex-col items-center w-full gap-4">
              <div className="w-full flex flex-col items-center p-4">
                <h2>Choose a Payment Method</h2>
                <Select
                  selectedOption={paymentMethod}
                  onChooseOption={setPaymentMethod}
                  optionList={paymentMethodsList}
                />
              </div>
              <div className="w-full flex flex-col items-center p-4">
                <h2>Choose a Order Type</h2>
                <Select
                  selectedOption={orderType}
                  onChooseOption={setOrderType}
                  optionList={orderTypesList}
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
              <Link
                to={"/checkout"}
                aria-disabled={!cart.length}
                className="bg-secondary rounded-full m-1 flex-2 text-center"
              >
                Submit Order
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

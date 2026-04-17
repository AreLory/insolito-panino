import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

import {
  selectCartItems,
  selectTotalItems,
} from "../features/cart/cartSelectors";
import { clearCart } from "../features/cart/cartSlice";
import { resetOrder } from "../features/checkout/checkoutSlice";

import { useOrder } from "../hooks/useOrder";
import { useAlert } from "../context/AlertContext";

import MiniNavBar from "../components/shared/MiniNavBar";
import Select from "../components/checkout/Select";
import TimeSlotSelector from "../components/checkout/TimeSlotSelector";

import { api } from "../config/axios";

import type { CreateOrderDTO, Order, OrderItem } from "../types/order";
import type { CartItem } from "../types/cart";

import {
  ArrowLeft,
  ShoppingCart,
  Coins,
  CreditCard,
  Landmark,
  Van,
  ShoppingBag,
  Utensils,
} from "lucide-react";
import { handleAxiosError } from "../utils/errorHandler";

export default function Checkout() {
  const { showAlert } = useAlert();
  const navigate = useNavigate();

  const cart = useSelector(selectCartItems);
  const itemCount = useSelector(selectTotalItems);
  const dispatch = useDispatch();

  const {
    order,
    total,
    subtotal,
    changePaymentMethod,
    changeNotes,
    changeOrderType,
    changeRequestedTime,
  } = useOrder();

  const paymentMethodsList = [
    { name: "Cash", value: "cash", img: <Coins /> },
    { name: "Card", value: "card", img: <CreditCard /> },
    { name: "Online", value: "online", img: <Landmark /> },
  ];

  const orderTypesList = [
    { name: "Take Away", value: "take_away", img: <ShoppingBag /> },
    { name: "Dine In", value: "dine_in", img: <Utensils /> },
    { name: "Delivery", value: "delivery", img: <Van /> },
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
      const formattedItems: OrderItem[] = cart.map((item: CartItem) => ({
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
        requestedTime: order.requestedTime
      };

      const res = await api.post<Order>("/orders", orderDTO);

      showAlert("success", "Order: " + res.statusText);
      dispatch(clearCart());
      dispatch(resetOrder());
      navigate("/");
    } catch (error) {
      handleAxiosError(error, showAlert);
    }
  };

  // ==============================
  // UI
  // ==============================
  return (
    <div className="w-screen h-screen flex justify-center bg-white">
      <MiniNavBar
        leftChild={<ArrowLeft />}
        rightChild={<ShoppingCart />}
        pageName="Checkout"
        badgeCount={itemCount}
        goBack="/cart"
        goTo="/cart"
      />

      <div className="pt-20 pb-32 max-w-3xl w-full">
        <form
          onSubmit={submitOrder}
          className="flex flex-col w-full items-center justify-center"
        >
          <div className="flex w-full shadow-2xl max-w-3xl rounded-2xl">
            <div className="flex flex-col items-center w-full gap-4">
              {/* PAYMENT */}
              <div className="w-full flex flex-col items-center p-4">
                <h2 className="text-lg font-semibold">
                  Choose a Payment Method
                </h2>
                <Select
                  selectedOption={selectedPaymentOption}
                  onChooseOption={(option) => changePaymentMethod(option.value)}
                  optionList={paymentMethodsList}
                />
              </div>

              {/* ORDER TYPE */}
              <div className="w-full flex flex-col items-center p-4">
                <h2 className="text-lg font-semibold">Choose a Order Type</h2>
                <Select
                  selectedOption={selectedOrderTypeOption}
                  onChooseOption={(option) => changeOrderType(option.value)}
                  optionList={orderTypesList}
                />
              </div>

              {/* SLOT PICKER */}
              <TimeSlotSelector
                reqTime={order.requestedTime}
                onChange={changeRequestedTime}
              />

              {/* NOTES */}
              <div className="w-full flex flex-col items-center py-4 px-8">
                <h2 className="text-lg font-semibold">Add a note</h2>
                <textarea
                  value={order.notes}
                  onChange={(e) => changeNotes(e.target.value)}
                  className="w-full px-4 border rounded-lg"
                  placeholder="Add a note..."
                />
              </div>
            </div>
          </div>

          {/* SUMMARY */}
          <div className="fixed bottom-0 w-full flex justify-center">
            <div className="w-full max-w-3xl bg-white rounded-t-2xl shadow-2xl">
              <div className="w-full pt-6 space-y-3 pb-4 px-6">
                <div className="flex justify-between text-slate-500 text-sm font-medium">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>

                {order.orderType === "delivery" && (
                  <div className="flex justify-between text-slate-500 text-sm font-medium">
                    <span>Delivery Fee</span>
                    <span>+ 2.50</span>
                  </div>
                )}

                <div className="flex justify-between items-center pt-4 border-t">
                  <span className="text-xl font-bold">Total</span>
                  <span className="text-3xl font-bold text-[#FF3B30]">
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="px-6 pb-6 pt-4">
                <button
                  type="submit"
                  className="w-full bg-linear-to-r from-orange-700 to-orange-500 text-white py-4 rounded-3xl font-bold"
                >
                  Submit Order
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

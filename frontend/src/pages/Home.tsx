// Hooks
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchActiveOrder } from "../features/activeOrder/activeOrderSlice";
import {
  selectActiveOrder,
  selectActiveOrderLoading,
} from "../features/activeOrder/activeOrderSelectors";
import { selectCartItems } from "../features/cart/cartSelectors";
// Components
import Header from "../components/home/Header";
import OrderStatus from "../components/home/OrderStatus";
import DailySpecial from "../components/home/DailySpecial";
import MenuCategories from "../components/home/MenuCategories";
import OffersSection from "../components/home/OffersSection";
import LocationSection from "../components/home/LocationSection";
import ReviewSection from "../components/home/ReviewSection";
import QuickAccess from "../components/home/QuickAccess";
import BrandStory from "../components/home/BrandStory";

const Home = () => {
  const dispatch = useDispatch();
  const order = useSelector(selectActiveOrder);
  const loading = useSelector(selectActiveOrderLoading);
  const cartItemsQuantity = useSelector(selectCartItems);

  useEffect(() => {
    if (!order) {
      dispatch(fetchActiveOrder());
    }
  }, [order, dispatch]);

  if (loading) return <div>Loading...</div>;
  if (!order) return <div>No active order</div>;

  // !!!!! Cancellare

  const categories = [
    {
      id: '1',
      name: 'Panini',
      emoji: '🍔',
      description: 'Burger gourmet e panini speciali',
      itemCount: 12,
      color: 'bg-orange-500',
    },
    {
      id: '2',
      name: 'Dolci',
      emoji: '🧁',
      description: 'Dessert artigianali e torte',
      itemCount: 8,
      color: 'bg-red-500',
    },
    {
      id: '3',
      name: 'Bevande',
      emoji: '🥤',
      description: 'Drink freschi e speciali',
      itemCount: 15,
      color: 'bg-blue-500',
    },
    {
      id: '4',
      name: 'Contorni',
      emoji: '🍟',
      description: 'Patatine, nuggets e altro',
      itemCount: 6,
      color: 'bg-yellow-500',
    },
  ];

  const offers = [
    {
      id: "1",
      title: "Menu Combo",
      description: "Panino + Patatine + Bibita a prezzo speciale",
      discount: "-30%",
      validUntil: "31 Marzo",
      color: "bg-gradient-to-r from-red-500 to-orange-500",
    },
    {
      id: "2",
      title: "Happy Hour",
      description: "2x1 su tutte le bevande dalle 17:00 alle 19:00",
      discount: "2x1",
      validUntil: "Ogni giorno",
      color: "bg-gradient-to-r from-blue-500 to-cyan-500",
    },
  ];

  const locations = [
    {
      id: "1",
      name: "Largo Pertini",
      address: "Via Pasolini, 20, 64025 Pineto TE",
      distance: "0.5 km",
      openUntil: "22:00",
      isOpen: true,
    }
  ];

  const reviews = [
    {
      id: "1",
      userName: "Marco Rossi",
      rating: 5,
      comment:
        "Il miglior burger che abbia mai mangiato! Ingredienti freschi e sapore incredibile. Tornerò sicuramente!",
      likes: 24,
      date: "2 giorni fa",
    },
    {
      id: "2",
      userName: "Laura Bianchi",
      rating: 5,
      comment:
        "Servizio veloce e cibo delizioso. Le patatine sono croccanti al punto giusto. Consigliato!",
      likes: 18,
      date: "5 giorni fa",
    },
    {
      id: "3",
      userName: "Giuseppe Verde",
      rating: 4,
      comment:
        "Ottimo rapporto qualità-prezzo. Porzioni generose e personale gentile.",
      likes: 12,
      date: "1 settimana fa",
    },
  ];

  const quickAccessItems = [
    {
      id: "1",
      icon: "user" as const,
      label: "Profilo",
      color: "bg-gradient-to-br from-orange-400 to-red-400",
    },
    {
      id: "2",
      icon: "history" as const,
      label: "Ordini",
      count: 8,
      color: "bg-gradient-to-br from-blue-400 to-cyan-400",
    },
    {
      id: "3",
      icon: "heart" as const,
      label: "Preferiti",
      count: 12,
      color: "bg-gradient-to-br from-red-400 to-pink-400",
    },
    {
      id: "4",
      icon: "settings" as const,
      label: "Impostazioni",
      color: "bg-gradient-to-br from-gray-400 to-gray-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        cartItemCount={cartItemsQuantity}
        onMenuClick={() => console.log("Menu clicked")}
      />

      <OrderStatus
        hasActiveOrder={order ? true : false}
        orderStatus={order.status}
        estimatedTime={20}
      />

      <DailySpecial
        name="Double Bacon Burger"
        description="Doppio hamburger 200g, bacon croccante, cheddar, salsa BBQ speciale, insalata e pomodoro"
        price={8.9}
        originalPrice={11.9}
        imageUrl="https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=800"
        rating={4.8}
      />

      <MenuCategories categories={categories} />

      <OffersSection offers={offers} />

      <LocationSection locations={locations} />

      <ReviewSection reviews={reviews} averageRating={4.8} totalReviews={247} />

      <QuickAccess items={quickAccessItems} />

      <BrandStory
        title="La Nostra Storia"
        story="Nati dalla passione per lo street food autentico, portiamo nelle piazze italiane sapori unici e qualità senza compromessi. Ogni ingrediente è selezionato con cura, ogni ricetta è il risultato di anni di esperienza."
        imageUrl="https://images.pexels.com/photos/4253320/pexels-photo-4253320.jpeg?auto=compress&cs=tinysrgb&w=800"
      />

      <div className="sticky bottom-0 p-4 bg-linear-to-t from-gray-50 to-transparent">
        <button className="w-full bg-linear-to-r from-orange-500 to-red-500 text-white py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-[1.02] transition flex items-center justify-center gap-2">
          🛒 Vai al Carrello ({cartItemsQuantity} prodotti)
        </button>
      </div>
    </div>
  );
};

export default Home;

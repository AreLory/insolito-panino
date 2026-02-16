// Hooks
import { useEffect } from "react";
import { fetchActiveOrder } from "../features/activeOrder/activeOrderSlice";

import OrderTracking from "./OrderTracking";

import { useDispatch, useSelector } from "react-redux";
import {
  selectActiveOrder,
  selectActiveOrderLoading,
} from "../features/activeOrder/activeOrderSelectors";

// Components

const Home = () => {
  const dispatch = useDispatch();
  const order = useSelector(selectActiveOrder);
  const loading = useSelector(selectActiveOrderLoading);

  useEffect(() => {
    if (!order) {
      dispatch(fetchActiveOrder());
    }
  }, [order, dispatch]);

  if (loading) return <div>Loading...</div>;
  if (!order) return <div>No active order</div>;
  
  return (
    <div className="w-screen h-screen justify-center flex flex-col items-center">
      
    </div>
  );
};

export default Home;

import UserOrder from "@/components/orders/UserOrder";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata:Metadata = {
  title:"Orders"
}
const Orders = () => {
  
  return (
    <Suspense>
        <UserOrder/>
    </Suspense>
  );
};

export default Orders;

import AllOrders from "@/components/admin/orders/AllOrders"

const Orders = () => {
  return (
    <div className="p-5 space-y-4">
        <h1 className="text-[18px] font-medium">Orders</h1>
        <AllOrders/>
    </div>
  )
}

export default Orders
'use client'

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useFindOrders, useUpdateOrder } from "@/utils/apis/orderApi"
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const AllOrders = () => {
  const queryClient = useQueryClient();
  const {data:orders} = useFindOrders();
  console.log(orders);
  const {mutate} = useUpdateOrder();
  const handleUpdateOrder = (id:string,status:string) => {
    const data={id,status};
    mutate(data,{
        onSuccess: (response) => {
            queryClient.invalidateQueries({queryKey:['users']});
            toast.success(response.message);
        },
        onError: () => toast.error("Oops! Something Went Wrong")
    })
  }
  return (
    <Card>
        <Table>
            <TableCaption>A list of orders</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="text-center">S.N.</TableHead>
                    <TableHead className="text-center">User</TableHead>
                    <TableHead className="text-center">Food</TableHead>
                    <TableHead className="text-center">Price</TableHead>
                    <TableHead className="text-center">Status</TableHead>
                    <TableHead className="text-center">Order Date</TableHead>
                    <TableHead className="text-center">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {orders?.data?.map((order:{_id:string,user:{name:string},food:{name:string,price:number},status:string,createdAt:string},index:number) => 
                    <TableRow key={order._id}>
                        <TableCell className="text-center">{index+1}</TableCell>
                        <TableCell>{order?.user?.name}</TableCell>
                        <TableCell className="text-center">{order?.food?.name}</TableCell>
                        <TableCell className="text-center">{order?.food?.price}</TableCell>
                        <TableCell className="text-center">{order?.status}</TableCell>
                        <TableCell className="text-center">{new Date(order?.createdAt).toDateString()}</TableCell>
                        <TableCell className="flex gap-4 justify-center">
                            <Button onClick={() => handleUpdateOrder(order._id,"Accepted")} variant={`primary`}>Accept</Button>
                            <Button onClick={() => handleUpdateOrder(order._id,"Rejected")} className="bg-red-500 hover:border-2 hover:border-red-500 hover:text-red-500 hover:bg-white transition-all duration-400 cursor-pointer">Reject</Button>
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    </Card>
  )
}

export default AllOrders

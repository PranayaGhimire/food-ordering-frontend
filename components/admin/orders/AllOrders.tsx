"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useFindOrders, useUpdateOrder } from "@/utils/apis/orderApi";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const AllOrders = () => {
  const queryClient = useQueryClient();
  const { data: orders } = useFindOrders();
  console.log(orders);
  const { mutate } = useUpdateOrder();
  const handleUpdateOrder = (id: string, status: string) => {
    const data = { id, status };
    mutate(data, {
      onSuccess: (response) => {
        queryClient.invalidateQueries({ queryKey: ["orders"] });
        toast.success(response.message);
      },
      onError: () => toast.error("Oops! Something Went Wrong"),
    });
  };
  return (
    <Card className="shadow-md border-t-4 border-t-cyan-500">
      <Table>
        <TableCaption>A list of orders</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">S.N.</TableHead>
            <TableHead className="text-center">User</TableHead>
            <TableHead className="text-center">Food</TableHead>
            <TableHead className="text-center">Price</TableHead>
            <TableHead className="text-center">Status</TableHead>
            <TableHead className="text-center">Khalti Pidx</TableHead>
            <TableHead className="text-center">Payment Status</TableHead>
            <TableHead className="text-center">Order Date</TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders?.data?.map(
            (
              order: {
                _id: string;
                user: { name: string };
                food: { name: string; price: number };
                status: string;
                khaltiPidx: string;
                paymentStatus:string;
                createdAt: string;
              },
              index: number
            ) => (
              <TableRow key={order._id}>
                <TableCell className="text-center">{index + 1}</TableCell>
                <TableCell className="text-center">{order?.user?.name}</TableCell>
                <TableCell className="text-center">
                  {order?.food?.name}
                </TableCell>
                <TableCell className="text-center">
                  {order?.food?.price}
                </TableCell>
                <TableCell className="text-center">{order?.status}</TableCell>
                <TableCell className="text-center">{order?.khaltiPidx}</TableCell>
                <TableCell className="text-center">{order?.paymentStatus}</TableCell>
                <TableCell className="text-center">
                  {new Date(order?.createdAt).toDateString()}
                </TableCell>
                <TableCell className="flex gap-4 justify-center">
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant={`primary`}>Accept</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you sure you want to accept this order ?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This order will be
                          accepted when you click on continue.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel className="cursor-pointer">
                          Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                          className="bg-cyan-500 hover:bg-cyan-600 cursor-pointer"
                          onClick={() =>
                            handleUpdateOrder(order._id, "ACCEPTED")
                          }
                        >
                          Continue
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button className="bg-red-500 hover:border-2 hover:border-red-500 hover:text-red-500 hover:bg-white transition-all duration-400 cursor-pointer">
                        Reject
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you sure you want to reject this order ?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This cannot be undone. This order will be rejected
                          when you click on continue.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel className="cursor-pointer">
                          Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                          className="bg-cyan-500 hover:bg-cyan-600 cursor-pointer"
                          onClick={() =>
                            handleUpdateOrder(order._id, "REJECTED")
                          }
                        >
                          Continue
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </Table>
    </Card>
  );
};

export default AllOrders;

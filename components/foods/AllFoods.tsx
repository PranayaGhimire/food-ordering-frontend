"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useGetFoods } from "@/utils/apis/foodApi";
import { CirclePlus, Eye, UtensilsCrossed } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import { Skeleton } from "../ui/skeleton";
import { useCreateOrder, useFindOrders } from "@/utils/apis/orderApi";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog";
import { useGetProfile } from "@/utils/apis/userApi";

const AllFoods = () => {
  const {data:profile} = useGetProfile()
  const { data: orders } = useFindOrders();
  console.log(orders);

  const { data: foods, isLoading } = useGetFoods();
  console.log(foods);
  const { mutate: createOrder } = useCreateOrder();
  const onOrder = (id: string) => {
    const data = { food: id,user:profile?.data?._id };
    createOrder(data, {
      onSuccess: (response) => {
        toast.success(response.message);
      },
      onError: () => toast.error("Oops! Something Went Wrong"),
    });
  };
  return (
    <div className="space-y-4">
      <Button variant={`primary`}>
        <Link href={`/foods/add`} className="flex gap-2 items-center">
          <CirclePlus />
          Add Food
        </Link>
      </Button>
      {isLoading ? (
        <Skeleton className="w-full h-60 bg-gray-400" />
      ) : (
        <Card className="shadow-md border-t-4 border-t-cyan-500">
          <Table>
            <TableCaption>A list of foods.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="text-center">S.N.</TableHead>
                <TableHead className="text-center">Name</TableHead>
                <TableHead className="text-center">Price</TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {foods?.data?.map(
                (
                  f: {
                    _id: string;
                    name: string;
                    price: string;
                    image: string;
                  },
                  index: number
                ) => (
                  <TableRow key={f._id}>
                    <TableCell className="text-center">{index + 1}</TableCell>
                    <TableCell className="text-center">{f.name}</TableCell>
                    <TableCell className="text-center">Rs. {f.price}</TableCell>
                    <TableCell className="text-center space-x-3">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button className="bg-gray-500 border-2 hover:border-gray-500 hover:bg-white hover:text-gray-500 transition-all duration-400 cursor-pointer">
                            <Eye />
                            View
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="w-72">
                          <DialogHeader>
                            <DialogTitle>{f.name}</DialogTitle>
                            <DialogDescription>Rs. {f.price}</DialogDescription>
                          </DialogHeader>
                          <div className="w-60 h-60 relative rounded-md overflow-hidden">
                            <Image
                              src={f.image}
                              alt={f.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                        </DialogContent>
                      </Dialog>{" "}
                      <AlertDialog>
                          <AlertDialogTrigger asChild>
                              <Button variant={`primary`} ><UtensilsCrossed/>Order</Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                              <AlertDialogHeader>
                                  <AlertDialogTitle>Are you sure you want to order {f.name} ?</AlertDialogTitle>
                                  <AlertDialogDescription>This action cannot be undone. {f.name} will be ordered from your account.</AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                  <AlertDialogCancel className="cursor-pointer">Cancel</AlertDialogCancel>
                                  <AlertDialogAction onClick={() => onOrder(f._id,)} className="bg-cyan-500 hover:bg-cyan-600 cursor-pointer">Continue</AlertDialogAction>
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
      )}
    </div>
  );
};

export default AllFoods;

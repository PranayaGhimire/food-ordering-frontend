"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useDeleteFood, useGetFoods } from "@/utils/apis/foodApi";
import { useQueryClient } from "@tanstack/react-query";
import { Edit, Eye, Trash } from "lucide-react";
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
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { useGetProfile } from "@/utils/apis/userApi";

const AllFoods = () => {
  const {data:profile} = useGetProfile();
  const { data: orders } = useFindOrders();
  console.log(orders);

  const { data: foods, isLoading } = useGetFoods();
  console.log(foods);
  const { mutate: createOrder } = useCreateOrder();
  const { mutate: deleteFood } = useDeleteFood();
  const queryClient = useQueryClient();
  const onOrder = (id: string) => {
    const data = { food: id };
    createOrder(data, {
      onSuccess: (response) => {
        toast.success(response.message);
      },
      onError: () => toast.error("Oops! Something Went Wrong"),
    });
  };
  const handleDeleteFood = (id: string) => {
    deleteFood(id, {
      onSuccess: (response) => {
        toast.success(response.message);
        queryClient.invalidateQueries({ queryKey: ["foods"] });
      },
      onError: () => toast.error("Oops! Something Went Wrong"),
    });
  };
  return (
    <div className="space-y-4">
      <Button className="bg-cyan-500 hover:bg-cyan-600 cursor-pointer">
        <Link href={`/foods/add`}>Add Food</Link>
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
                          <Button className="bg-gray-500 hover:bg-gray-600 cursor-pointer">
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
                          <DialogFooter className="gap-3">
                            <DialogClose asChild>
                              <Button className="bg-red-500 hover:bg-red-600 cursor-pointer">
                                Close
                              </Button>
                            </DialogClose>
                            <Button variant={`primary`} onClick={() => onOrder(f._id)}>Order</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>{" "}
                      <Link href={`/foods/edit/${f._id}`}>
                        <Button variant={"primary"}>
                          <Edit />
                          Edit
                        </Button>
                      </Link>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button className="bg-red-500 hover:bg-red-600 cursor-pointer">
                            {" "}
                            <Trash />
                            Delete
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Are you absolutely sure ?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              This cannot be undone. This will permanently
                              delete this food item and remove its data from our
                              servers.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel className="cursor-pointer">
                              Cancel
                            </AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDeleteFood(f._id)}
                              className="bg-cyan-500 hover:bg-cyan-600 cursor-pointer"
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
      )}
    </div>
  );
};

export default AllFoods;

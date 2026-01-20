"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useGetFoods } from "@/utils/apis/foodApi";
import { Eye, Search, UtensilsCrossed } from "lucide-react";
import Image from "next/image";
import toast from "react-hot-toast";
import { Skeleton } from "../ui/skeleton";
import { useCreateOrder } from "@/utils/apis/orderApi";
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
import { useGetProfile } from "@/utils/apis/userApi";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { Switch } from "../ui/switch";
import { Input } from "../ui/input";
import { useState } from "react";
import { NativeSelect, NativeSelectOption } from "../ui/native-select";

const AllFoods = () => {
  // States
  const [searchValue, setSearchValue] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [priceFilter, setPriceFilter] = useState("All");
  const router = useRouter();
  const { data: profile } = useGetProfile();
  const { data: foods, isLoading } = useGetFoods();
  const { mutate: createOrder } = useCreateOrder();
  const queryClient = useQueryClient();
  const onOrder = (id: string, isAvailable: boolean, name: string) => {
    const data = { food: id, user: profile?.data?._id };
    if (isAvailable)
      createOrder(data, {
        onSuccess: (response) => {
          toast.success(response.message);
          router.push(`/orders?food=${data.food}&order=${response?.data?._id}`);
          queryClient.invalidateQueries({ queryKey: ["orders"] });
        },
        onError: () => toast.error("Oops! Something Went Wrong"),
      });
    else toast.error(`Sorry ${name} is not available at this moment`);
  };
  return (
    <div className="space-y-4">
      <div className="w-full flex flex-col md:flex-row gap-2 justify-between">
        {/* Search */}
        <div className="md:w-1/2 relative">
          <Input
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            type="search"
            placeholder="Search food.."
            className="bg-white pl-8"
          />
          <Search className="absolute top-3 left-2 text-cyan-500" size={20} />
        </div>
        {/* Filters */}
        <div className="w-fit flex gap-3 space-y-2">
          <NativeSelect
            className="bg-white"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <NativeSelectOption>All</NativeSelectOption>
            <NativeSelectOption>Momo</NativeSelectOption>
            <NativeSelectOption>Snacks</NativeSelectOption>
            <NativeSelectOption>Tea</NativeSelectOption>
            <NativeSelectOption>Coffee</NativeSelectOption>
            <NativeSelectOption>Soft Drinks</NativeSelectOption>
            <NativeSelectOption>Hard Drinks</NativeSelectOption>
          </NativeSelect>
          <NativeSelect
            className="bg-white"
            value={priceFilter}
            onChange={(e) => setPriceFilter(e.target.value)}
          >
            {/* <NativeSelectOption>All</NativeSelectOption> */}
            <NativeSelectOption>Highest</NativeSelectOption>
            <NativeSelectOption>Medium</NativeSelectOption>
            <NativeSelectOption>Lowest</NativeSelectOption>
          </NativeSelect>
        </div>
      </div>
      {isLoading ? (
        <Skeleton className="w-full h-60 bg-gray-400" />
      ) : (
        <Card className="shadow-md border-t-4 border-t-cyan-500">
          <Table>
            <TableCaption>A list of foods.</TableCaption>
            <TableHeader>
              <TableRow className="">
                <TableHead className="text-center">S.N.</TableHead>
                <TableHead className="text-center">Name</TableHead>
                <TableHead className="text-center">Price</TableHead>
                <TableHead className="text-center">Availability</TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {foods?.data
                ?.filter((f: { name: string; category: string }) =>
                  searchValue
                    ? f.name.toLowerCase().includes(searchValue.toLowerCase())
                    : categoryFilter !== "All"
                      ? f.category === categoryFilter
                      : true,
                )
                ?.map(
                  (
                    f: {
                      _id: string;
                      name: string;
                      price: string;
                      isAvailable: boolean;
                      image: string;
                    },
                    index: number,
                  ) => (
                    <TableRow key={f._id}>
                      <TableCell className="text-center">{index + 1}</TableCell>
                      <TableCell className="text-center">{f.name}</TableCell>
                      <TableCell className="text-center">
                        Rs. {f.price}
                      </TableCell>
                      <TableCell className="text-center">
                        <Switch checked={f.isAvailable} />
                      </TableCell>
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
                              <DialogDescription>
                                Rs. {f.price}
                              </DialogDescription>
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
                            <Button variant={`primary`}>
                              <UtensilsCrossed />
                              Order
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Are you sure you want to order {f.name} ?
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. {f.name} will be
                                ordered from your account.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel className="cursor-pointer">
                                Cancel
                              </AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() =>
                                  onOrder(f._id, f.isAvailable, f.name)
                                }
                                className="bg-cyan-500 hover:bg-cyan-600 cursor-pointer"
                              >
                                Continue
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </TableCell>
                    </TableRow>
                  ),
                )}
            </TableBody>
          </Table>
        </Card>
      )}
    </div>
  );
};

export default AllFoods;

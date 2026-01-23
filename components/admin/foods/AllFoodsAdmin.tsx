"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  useDeleteFood,
  useGetFoods,
  useUpdateFoodAvailability,
} from "@/utils/apis/foodApi";
import { useQueryClient } from "@tanstack/react-query";
import { CirclePlus, Edit, Eye, Search, Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import { Skeleton } from "../../ui/skeleton";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table";
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
} from "../../ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

const AllFoodsAdmin = () => {
  // States
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const { data: foods, isLoading } = useGetFoods(currentPage, searchValue);
  console.log(foods);

  const { mutate: deleteFood } = useDeleteFood();
  const { mutate: updateFoodAvailability } = useUpdateFoodAvailability();
  const queryClient = useQueryClient();
  const handleUpdateFoodAvailability = (id: string, current: boolean) => {
    updateFoodAvailability(
      {
        id,
        isAvailable: !current,
      },
      {
        onSuccess: (response) => {
          toast.success(response.message);
          queryClient.invalidateQueries({ queryKey: ["foods"] });
        },
        onError: () => toast.error("Oops! Something Went Wrong"),
      },
    );
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
      <Button variant={`primary`}>
        <Link href={`/admin/foods/add`} className="flex gap-2 items-center">
          <CirclePlus />
          Add Food
        </Link>
      </Button>
      <div className="md:w-1/2 relative ">
        <Input
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          type="search"
          placeholder="Search food.."
          className="pl-8"
        />
        <Search
          className="absolute top-1/2 transform -translate-y-1/2 left-2"
          size={16}
        />
      </div>
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
                <TableHead className="text-center">Availability</TableHead>
                <TableHead className="text-center">Category</TableHead>
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
                    isAvailable: boolean;
                    image: string;
                    category: string;
                  },
                  index: number,
                ) => (
                  <TableRow key={f._id}>
                    <TableCell className="text-center">{index + 1}</TableCell>
                    <TableCell className="text-center">{f.name}</TableCell>
                    <TableCell className="text-center">Rs. {f.price}</TableCell>
                    <TableCell className="text-center">
                      <Switch
                        onCheckedChange={() =>
                          handleUpdateFoodAvailability(f._id, f.isAvailable)
                        }
                        checked={f.isAvailable}
                      />
                    </TableCell>
                    <TableCell className="text-center">{f.category}</TableCell>
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
                      <Link href={`/admin/foods/edit/${f._id}`}>
                        <Button variant={"primary"}>
                          <Edit />
                          Edit
                        </Button>
                      </Link>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button className="bg-red-500 border-2 hover:border-red-500 hover:bg-white hover:text-red-500 transition-all duration-400 cursor-pointer">
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
                ),
              )}
            </TableBody>
          </Table>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  className="cursor-pointer"
                  onClick={() =>
                    currentPage > 1 && setCurrentPage((prev) => prev - 1)
                  }
                />
              </PaginationItem>
              {Array.from({ length: foods?.totalPages }).map((_, index) => (
                <PaginationItem key={index}>
                  <PaginationLink
                    className={`${index + 1 === currentPage && "bg-cyan-500 text-white hover:text-cyan-500 hover:bg-white hover:border-2 hover:border-cyan-500 transition-all duration-400 ease-in-out"} cursor-pointer`}
                    onClick={() => setCurrentPage(index + 1)}
                  >
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext
                  className="cursor-pointer"
                  onClick={() =>
                    currentPage < foods?.totalPages &&
                    setCurrentPage((prev) => prev + 1)
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </Card>
      )}
    </div>
  );
};

export default AllFoodsAdmin;

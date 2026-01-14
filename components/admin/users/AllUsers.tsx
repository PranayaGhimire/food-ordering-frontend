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
import { useDeleteUser, useGetUsers } from "@/utils/apis/userApi";
import { useQueryClient } from "@tanstack/react-query";
import { Trash } from "lucide-react";
import toast from "react-hot-toast";

const AllUsers = () => {
  const { data: users } = useGetUsers();
  const { mutate } = useDeleteUser();
  const queryClient = useQueryClient();
  const handleDeleteUser = (id: string) => {
    mutate(id, {
      onSuccess: (response) => {
        toast.success(response.message);
        queryClient.invalidateQueries({ queryKey: ["users"] });
      },
      onError: () => toast.error("Oops! Something Went Wrong"),
    });
  };
  return (
    <>
      <Card className="shadow-md border-t-4 border-t-cyan-500">
        <Table>
          <TableCaption>A list of users.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">S.N.</TableHead>
              <TableHead className="text-center">Full Name</TableHead>
              <TableHead className="text-center">Username</TableHead>
              <TableHead className="text-center">Phone Number</TableHead>
              <TableHead className="text-center">Email</TableHead>
              <TableHead className="text-center">Role</TableHead>
              <TableHead className="text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users?.data
              ?.filter((user: { role: string }) => user.role === "USER")
              ?.map(
                (
                  user: {
                    _id: string;
                    fullName: string;
                    username: string;
                    phoneNumber: string;
                    email: string;
                    role: string;
                  },
                  index: number
                ) => (
                  <TableRow key={user._id}>
                    <TableCell className="text-center">{index + 1}</TableCell>
                    <TableCell className="text-center">{user.fullName}</TableCell>
                    <TableCell className="text-center">
                      {user.username}
                    </TableCell>
                    <TableCell className="text-center">{user.phoneNumber}</TableCell>
                    <TableCell className="text-center">{user.email}</TableCell>
                    <TableCell className="text-center">{user.role}</TableCell>
                    <TableCell className="text-center">
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button className="bg-red-500 hover:bg-red-600 cursor-pointer">
                            <Trash />
                            Delete
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Are you sure you want to delete this account ?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This account will be
                              permanently deleted from our servers.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel className="cursor-pointer">
                              Cancel
                            </AlertDialogCancel>
                            <AlertDialogAction
                              className="bg-cyan-500 hover:bg-cyan-600 cursor-pointer"
                              onClick={() => handleDeleteUser(user._id)}
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
    </>
  );
};

export default AllUsers;

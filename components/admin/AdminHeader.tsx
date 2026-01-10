"use client";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useLogout } from "@/utils/apis/authApi";
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
import { CustomTrigger } from "./CustomTrigger";

const AdminHeader = () => {
  const { mutate } = useLogout();
  return (
    <header className="w-full flex gap-5 md:justify-between items-center bg-white p-3 shadow-md">
      <div className="md:hidden">
         <CustomTrigger/>
      </div>
      <Input placeholder="Search..." className="w-100" />
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button className="bg-red-500 hover:bg-red-600 cursor-pointer">
            Log Out
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to Log Out ?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. You will be logged out from your
              account and will have to log in again.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="cursor-pointer">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => mutate()}
              className="bg-cyan-500 hover:bg-cyan-600 cursor-pointer"
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </header>
  );
};

export default AdminHeader;

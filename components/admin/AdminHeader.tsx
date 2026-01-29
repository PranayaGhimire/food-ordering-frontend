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
import { LogOut } from "lucide-react";
import { ChangeEvent, useState } from "react";

const AdminHeader = () => {
  const { mutate } = useLogout();
  const [searchValue, setSearchValue] = useState<string>();
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    console.log(searchValue);
  };
  return (
    <header className="w-full flex gap-5 md:justify-between items-center bg-white dark:bg-stone-700 p-3 shadow-md">
      <div className="md:hidden">
        <CustomTrigger />
      </div>
      <Input
        defaultValue={searchValue}
        onChange={handleSearch}
        type="search"
        placeholder="Search..."
        className="w-100"
      />
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button className="text-white bg-red-500 hover:bg-white hover:border-2 hover:border-red-500 hover:text-red-500 hover:transition-all hover:duration-400 cursor-pointer">
            Log Out
            <LogOut />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="dark:bg-stone-800">
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
              className="text-white bg-cyan-500 hover:bg-cyan-600 cursor-pointer"
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

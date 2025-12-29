"use client";
import { Button } from "./ui/button";
import { navLinks } from "@/constants/navLinks";
import Link from "next/link";
import Image from "next/image";
import momoHouse from "@/assets/MomoHouse.png";
import { usePathname } from "next/navigation";
import { GiHamburgerMenu } from "react-icons/gi";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { logout } from "@/redux/auth/authSlice";
import { FaLongArrowAltRight } from "react-icons/fa";
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
} from "./ui/alert-dialog";
import toast from "react-hot-toast";

const Navbar = () => {
  const path = usePathname();
  const token = useSelector((state: RootState) => state.authReducer.token);
  const user = useSelector((state: RootState) => state.authReducer.user);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
    toast.success("User logged out successfully");
  }
  return (
    <header>
      <div className="flex  justify-center  lg:justify-between items-center bg-cyan-600 h-14 px-20 text-white ">
        <div className="font-semibold hidden lg:flex gap-10">
          <p>EMAIL: rest@themomohouse.com</p>
          <p>PHONE: 9840505684; Pranaya Ghimire, Manager</p>
        </div>
        <Button className="w-28 h-full rounded-none bg-stone-800 hover:bg-stone-900 cursor-pointer">
          <Link href={`/auth`}>Order Now</Link> <FaLongArrowAltRight />
        </Button>
      </div>
      <div className="flex justify-between items-center h-28 px-5 md:px-20 bg-white">
        <Image
          loading="eager"
          src={momoHouse}
          alt="Momo House Logo"
          className="rounded-full w-20 h-20"
        />
        {user && <p>Hello, {user?.username}</p>}
        <ul className="md:flex gap-8 hidden">
          {navLinks.map((navLink) => (
            <li
              key={navLink.name}
              className={`${
                path === navLink.route && "text-orange-500"
              } font-medium`}
            >
              <Link href={navLink.route}>{navLink.name}</Link>
              {path === navLink.route && (
                <hr className="mt-1 w-8 border-2 border-orange-500" />
              )}
            </li>
          ))}
        </ul>
        {token ? (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                className="bg-red-500 hover:bg-red-600 cursor-pointer"
              >
                Log Out
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. You will be logged out from
                  your account and have to login again.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="cursor-pointer">Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleLogout} className="bg-cyan-600 hover:bg-cyan-700 cursor-pointer">Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        ) : (
          <Button className="bg-cyan-500 hover:bg-cyan-600 cursor-pointer">
            <Link href={`/auth`}>Log In</Link>
          </Button>
        )}
        <Sheet>
          <SheetTrigger asChild>
            <Button className="bg-cyan-500 md:hidden">
              <GiHamburgerMenu />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>The Momo House</SheetTitle>
              <SheetDescription>
                We Provide online delivery of momos and other food items
              </SheetDescription>
            </SheetHeader>
            <ul className="md:hidden flex flex-col gap-5 px-5  ">
              {navLinks.map((navLink) => (
                <li
                  key={navLink.name}
                  className={`${
                    path === navLink.route && "text-orange-500"
                  } font-medium`}
                >
                  <Link href={navLink.route}>{navLink.name}</Link>
                  {path === navLink.route && (
                    <hr className="mt-1 w-8 border-2 border-orange-500" />
                  )}
                </li>
              ))}
            </ul>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Navbar;

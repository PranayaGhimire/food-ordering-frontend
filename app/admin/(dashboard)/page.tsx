'use client'
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetFoods } from "@/utils/apis/foodApi";
import { useFindOrders } from "@/utils/apis/orderApi";
import { useGetUsers } from "@/utils/apis/userApi";
import { Soup, User, UtensilsCrossed } from "lucide-react";
import Link from "next/link";

const Dashboard = () => {
  const {data:users,isLoading:isUsersLoading} = useGetUsers();
  const {data:foods,isLoading:isFoodsLoading} = useGetFoods();
  const {data:orders,isLoading:isOrdersLoading} = useFindOrders();
  const dashboardCards =[
    {title:'Users',length:users?.data?.length,icon:User,route:"/admin/users"},
    {title:'Foods',length:foods?.data?.length,icon:Soup,route:"/admin/foods"},
    {title:'Orders',length:orders?.data?.length,icon:UtensilsCrossed,route:"/admin/orders"}
  ];
  return (
    <div className="px-5 py-5 space-y-5">
      <h1 className="text-[18px] font-semibold">Admin Dashboard</h1>
      {(isUsersLoading || isFoodsLoading || isOrdersLoading) ? <div className="flex flex-col md:flex-row gap-5">
            <Skeleton className="w-40 h-28 bg-gray-400 rounded-md"/>
            <Skeleton className="w-40 h-28 bg-gray-400 rounded-md"/>
            <Skeleton className="w-40 h-28 bg-gray-400 rounded-md"/>
        </div> 
      :<div className="flex flex-col md:flex-row gap-5">
          {dashboardCards?.map((dc) => 
            <Link key={dc.title} href={dc.route}>
               <Card  className="w-40 shadow-md border-t-4 border-t-cyan-500 hover:-translate-y-2 transition-all ease-in-out duration-400">
                <CardContent className="flex gap-5 justify-center items-center">
                  <dc.icon className="text-cyan-500"/>
                  <div className="">
                    <p className="font-medium">{dc.title}</p>
                    <p className="text-xl text-center font-bold text-cyan-700">{dc.length}</p>
                  </div>
                </CardContent>
                  
      
              </Card>
            </Link>
             
          )}      
      </div>}  
    </div>
  );
};

export default Dashboard;

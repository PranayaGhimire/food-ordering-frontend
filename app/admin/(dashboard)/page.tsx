'use client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetFoods } from "@/utils/apis/foodApi";
import { useFindOrders } from "@/utils/apis/orderApi";
import { useGetUsers } from "@/utils/apis/userApi";
import { Soup, User, UtensilsCrossed } from "lucide-react";


const Dashboard = () => {
  const {data:users} = useGetUsers();
  const {data:foods} = useGetFoods();
  const {data:orders} = useFindOrders();
  const dashboardCards =[
    {title:'Users',length:users?.data?.length,icon:User},
    {title:'Foods',length:foods?.data?.length,icon:Soup},
    {title:'Orders',length:orders?.data?.length,icon:UtensilsCrossed}
  ];
  return (
    <div className="px-5 py-5 space-y-4">
      <h1 className="text-[18px] font-semibold">Admin Dashboard</h1>
      <div className="flex flex-col md:flex-row gap-5">
          {dashboardCards?.map((dc) => 
              <Card key={dc.title} className="w-40 shadow-md border-t-4 border-t-cyan-500">
                
                <CardContent className="flex gap-5 justify-center items-center">
                  <dc.icon className="text-cyan-500"/>
                  <div className="">
                    <p className="font-medium">{dc.title}</p>
                    <p className="text-xl text-center font-bold text-cyan-700">{dc.length}</p>
                  </div>
                </CardContent>
                  
      
              </Card>
          )}      
      </div>  
    </div>
  );
};

export default Dashboard;

'use client'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useDeleteRating, useGetRatings } from "@/utils/apis/ratingApi"
import { useQueryClient } from "@tanstack/react-query"
import { Trash } from "lucide-react"
import toast from "react-hot-toast"

const AllRatings = () => {
  const queryClient = useQueryClient();
  const {data:ratings} = useGetRatings();
  console.log(ratings);
  const {mutate:deleteRating} = useDeleteRating();
  const handleDeleteRating = (id:string) => {
    deleteRating(id,{
        onSuccess: (response) => {
            toast.success(response.message);
            queryClient.invalidateQueries({queryKey:['ratings']});
        },
        onError: () => toast.error('Oops! Something Went Wrong')
    })
  }
  return (
    <>
        <Card className="border-t-4 border-t-cyan-500 shadow-md">
            <Table>
                <TableCaption>A list of ratings</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="text-center">S.N.</TableHead>
                        <TableHead className="text-center">User</TableHead>
                        <TableHead className="text-center">Food</TableHead>
                        <TableHead className="text-center">Rating</TableHead>
                        <TableHead className="text-center">Comment</TableHead>
                        <TableHead className="text-center">Actions</TableHead>    
                    </TableRow>    
                </TableHeader>
                <TableBody>
                   {ratings?.data?.map((rating:{_id:string,user:{fullName:string},order:{food:string},rating:number,comment:string},index:number) => 
                        <TableRow key={rating._id}>
                            <TableCell className="text-center">{index+1}</TableCell>
                            <TableCell className="text-center">{rating?.user?.fullName}</TableCell>
                            <TableCell className="text-center">{rating?.order?.food}</TableCell>
                            <TableCell className="text-center">{rating.rating}</TableCell>
                            <TableCell className="text-center">{rating?.comment}</TableCell>
                            <TableCell className="text-center">
                                <Button onClick={() => handleDeleteRating(rating._id)} 
                                className="bg-red-500 hover:bg-white hover:text-red-500 hover:border-2 hover:border-red-500 cursor-pointer transition-all duration-400"><Trash/>Delete</Button>
                            </TableCell>
                        </TableRow>
                    )}     
                </TableBody>    
            </Table>    
        </Card>   
    </>
  )
}

export default AllRatings
'use client'

import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useGetMessages } from "@/utils/apis/messageApi"

const AllMessages = () => {
  const {data:messages} = useGetMessages();
  return (
    <Card className="border-t-4 border-t-cyan-500 shadow-md">
        <Table>
            <TableCaption>A list of messages</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="text-center">S.N.</TableHead>
                    <TableHead className="text-center">Name</TableHead>
                    <TableHead className="text-center">Email</TableHead>
                    <TableHead className="text-center">Message</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {messages?.data?.map((m:{_id:string;name:string;email:string;message:string},index:number) =>
                    <TableRow key={m._id}>
                        <TableCell className="text-center">{index+1}</TableCell>
                        <TableCell className="text-center">{m.name}</TableCell>
                        <TableCell className="text-center">{m.email}</TableCell>
                        <TableCell className="text-center">{m.message}</TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    </Card>
  )
}

export default AllMessages
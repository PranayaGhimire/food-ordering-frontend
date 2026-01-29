'use client'

import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useGetSubscribers } from "@/utils/apis/subscriberApi"

const AllSubscribers = () => {
  const {data:subscribers} = useGetSubscribers();
  return (
    <>
        <Card className="dark:bg-stone-700 shadow-md border-t-4 border-t-cyan-500">
            <Table>
                <TableCaption>A list of subscribers</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>S.N.</TableHead>
                        <TableHead>Subscriber</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {subscribers?.data?.map((subscriber:{id:string;email:string},index:number) =>
                        <TableRow key={subscriber.id}>
                            <TableCell>{index+1}</TableCell>
                            <TableCell>{subscriber.email}</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </Card>
    </>
  )
}

export default AllSubscribers
import { createFileRoute } from '@tanstack/react-router'
import { Skeleton } from "../components/ui/skeleton"
import { api } from "../lib/api";
import { useQuery } from "@tanstack/react-query";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table"
import { Card } from '../components/ui/card';


export const Route = createFileRoute('/expenses')({
  component: Expenses,
})



async function fetchAllExpenses() {
  const response = await api.expenses.$get();
  if (!response.ok) {
    throw new Error("Failed to fetch expenses");
  }
  const data = response.json();
  return data;
}


function Expenses() {
  const { isPending, data, error } = useQuery({
    queryKey: ["get-all-expenses"],
    queryFn: fetchAllExpenses,
  });

  if (error) return <div>Error: {error.message}</div>;
  return (
    <div className="absolute w-screen flex justify-center bg-inherit bg-[radial-gradient(ellipse_20%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]">
      <div className='mt-36 w-2/5'>
        <Card className=" text-sky-50 pt-6 text-center backdrop-blur-lg bg-page-gradient border-white/10 text-md font-geistSans hover:border-zinc-600 hover:bg-transparent/10 hover:text-zinc-100">
          <Table className=''>
            <TableCaption>A list of your expenses .</TableCaption>
            <TableHeader>
              <TableRow className='hover:bg-inherit '>
                <TableHead className="w-[100px] text-2xl p-6 font-bold text-center">Id</TableHead>
                <TableHead className="w-[100px] p-6 text-2xl text-center font-bold">Title</TableHead>
                <TableHead className="w-[100px] p-6 text-2xl text-center font-bold">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isPending ?
                Array(3)
                  .fill(0)
                  .map((_, i) => (
                    <TableRow key={i}>
                      <TableCell className='p-6 w-[100px]'><Skeleton className=" h-4 rounded-full bg-indigo-300/40 " />
                      </TableCell>
                      <TableCell className='p-6 w-[100px]'><Skeleton className="h-4 rounded-full bg-indigo-300/40" />
                      </TableCell>
                      <TableCell className='p-6 w-[100px]'><Skeleton className="h-4 rounded-full bg-indigo-300/40" />
                      </TableCell>
                    </TableRow>
                  )) : data?.expense.map((expense: any) => (
                    <TableRow key={expense.id} className='hover:bg-inherit'>
                      <TableCell className='p-6 w-[100px]  text-indigo-300 text-lg font-semibold '>{expense.id}</TableCell>
                      <TableCell className='p-6 w-[100px] text-lg  text-indigo-300 text-center font-semibold'>{expense.title}</TableCell>
                      <TableCell className='p-6 w-[100px] text-lg text-indigo-300 text-center font-semibold'>{expense.amount}</TableCell>
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </div>
  )
}
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
    <div className="absolute w-screen flex items-center justify-center ">
      <img src="https://tailwindcss.com/_next/static/media/docs@30.8b9a76a2.avif" className='absolute top-0 opacity-50' />
      <Card className=" text-sky-50 pt-6 w-1/2 mt-36 text-center bg-inherit shadow-2xl border-2 border-white/5 text-md font-geistSans hover:border-zinc-600 hover:bg-transparent/10">
        <Table>
          <TableCaption className='bg-gradient-to-br from-indigo-400 via-indigo-300 to-indigo-700 bg-clip-text text-transparent'>A list of your expenses .</TableCaption>
          <TableHeader>
            <TableRow className='hover:bg-inherit '>
              <TableHead className="w-[100px] text-4xl p-6 font-bold text-center text-transparent bg-clip-text bg-gradient-to-r to-blue-800 from-zinc-100">Id</TableHead>
              <TableHead className="w-[100px] p-6 text-4xl text-center font-bold text-transparent bg-clip-text bg-gradient-to-r to-blue-800 from-zinc-100">Title</TableHead>
              <TableHead className="w-[100px] p-6 text-4xl text-center font-bold text-transparent bg-clip-text bg-gradient-to-r to-blue-800 from-zinc-100">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody >
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
                    <TableCell className='p-6 w-[100px]   text-2xl font-semibold '>{expense.id}</TableCell>
                    <TableCell className='p-6 w-[100px] text-2xl  text-center font-semibold'>{expense.title}</TableCell>
                    <TableCell className='p-6 w-[100px] text-2xl  text-center font-semibold'>{expense.amount}</TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  )
}
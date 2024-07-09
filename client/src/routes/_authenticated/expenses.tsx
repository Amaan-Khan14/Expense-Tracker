import { createFileRoute } from '@tanstack/react-router'
import { Skeleton } from "../../components/ui/skeleton"
import { api, deleteExpenses, fetchAllExpensesQueryOptions } from "../../lib/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table"
import { Card } from '../../components/ui/card';
import { format } from 'date-fns';
import { Button } from '../../components/ui/button';
import { ReloadIcon, TrashIcon } from "@radix-ui/react-icons"
import { toast } from 'sonner';



export const Route = createFileRoute('/_authenticated/expenses')({
  component: Expenses,
})


function Expenses() {
  const { isPending, data, error } = useQuery(fetchAllExpensesQueryOptions);

  if (error) return <div>Error: {error.message}</div>;
  return (
    <div className="absolute w-full flex items-center justify-center ">
      <Card className=" text-sky-50 pt-6 my-36 text-center bg-page-gradient [box-shadow:0_-20px_80px_-20px_#8686f01f_inset] shadow-2xl border-2 border-white/5 text-md font-geistSans hover:border-zinc-600 hover:bg-transparent/10">
        <Table>
          <TableCaption className=' bg-gradient-to-br from-zinc-100 via-zinc-200/50 to-zinc-200/90 bg-clip-text text-transparent text-xl'>A list of your expenses .</TableCaption>
          <TableHeader>
            <TableRow className='hover:bg-inherit '>
              <TableHead className=" w-[100px]  p-6  text-4xl text-center font-bold text-transparent bg-clip-text bg-gradient-to-r to-blue-800 from-zinc-100">Title</TableHead>
              <TableHead className=" w-[100px]  p-6  text-4xl text-center font-bold text-transparent bg-clip-text bg-gradient-to-r to-blue-800 from-zinc-100">Amount</TableHead>
              <TableHead className=" w-[100px]  p-6  text-4xl text-center font-bold text-transparent bg-clip-text bg-gradient-to-r to-blue-800 from-zinc-100">Created At</TableHead>
              <TableHead className=" w-[100px]  p-6  text-4xl text-center font-bold text-transparent bg-clip-text bg-gradient-to-r to-blue-800 from-zinc-100">Delete</TableHead>

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
                    <TableCell className='p-6 w-[100px]'><Skeleton className="h-4 rounded-full bg-indigo-300/40" />
                    </TableCell>
                  </TableRow>
                )) : data?.expense.map((expense: any) => (
                  <TableRow key={expense.id} className='hover:bg-inherit'>
                    <TableCell className='p-6 w-[100px] text-2xl  text-center font-semibold'>{expense.title}</TableCell>
                    <TableCell className='p-6 w-[100px] text-2xl  text-center font-semibold'>{expense.amount}</TableCell>
                    <TableCell className='p-6 w-[100px] text-2xl text-center font-semibold'>
                      {format(new Date(expense.date), 'yyyy-MM-dd')}
                    </TableCell>
                    <TableCell className='p-6 w-[100px] text-2xl text-center font-semibold'>
                      <ExpenseDelete id={expense.id} title={expense.title} />
                    </TableCell>

                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </Card>
    </div >
  )
}

function ExpenseDelete({ id, title }: { id: number; title: string }) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteExpenses,
    onError: (e) => {
      toast('Error', {
        description: `Failed to delete expense ${title} ${e instanceof Error ? e.message : ''}`
      });
    },
    onSuccess: async () => {
      toast('Success', {
        description: `Expense deleted successfully: ${title}`
      });

      queryClient.setQueryData(fetchAllExpensesQueryOptions.queryKey, (existingExpenses: any) => ({
        ...existingExpenses,
        expense: existingExpenses?.expense.filter((expense: any) => expense.id !== id) || []
      }));
    }
  });

  const handleDelete = () => {
    mutation.mutate({ id });
  };

  return (
    <div>
      <Button
        disabled={mutation.isPending}
        onClick={handleDelete}
        variant="outline"
        size="icon"
        className="bg-page-gradient [box-shadow:0_-20px_80px_-20px_#8686f01f_inset] hover:bg-slate-500 border-white/5"
      >
        {mutation.isPending ? (
          <ReloadIcon className="m-2 h-4 w-4 animate-spin" />
        ) : (
          <TrashIcon className="h-5 w-5" />
        )}
      </Button>
    </div>
  );
}

export default ExpenseDelete;
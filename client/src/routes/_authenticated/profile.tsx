import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query';
import { userQueryoptions } from '../../lib/api';
import { Card, CardContent } from '../../components/ui/card';
import { Table, TableHeader, TableBody, TableCaption, TableHead, TableRow, TableCell } from '../../components/ui/table';

export const Route = createFileRoute('/_authenticated/profile')({
  component: Profile,
})

function Profile() {
  const { isPending, data, error } = useQuery(userQueryoptions);

  if (isPending) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return (
    <div className="absolute w-screen flex items-center justify-center ">
      <Card className=" text-sky-50 pt-6 w-1/2 mt-36 text-center bg-page-gradient [box-shadow:0_-20px_80px_-20px_#8686f01f_inset] shadow-2xl border-2 border-white/5 text-md font-geistSans hover:border-zinc-600 hover:bg-transparent/10">
        <CardContent>
          hello
        </CardContent>
      </Card>
    </div>
  )
}


import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query';
import { userQueryoptions } from '../../lib/api';
import { Card, CardContent } from '../../components/ui/card';
import { Label } from '@radix-ui/react-label';

export const Route = createFileRoute('/_authenticated/profile')({
  component: Profile,
})

function Profile() {
  const { isPending, data, error } = useQuery(userQueryoptions);

  if (isPending) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return (
    <div>
      <div className='flex flex-col absolute top-0'>
        <div className=' w-screen flex items-center justify-center' >
          <Card className="text-sky-50 pt-6 mt-36 w-1/4 text-center shadow-2xl bg-page-gradient [box-shadow:0_-20px_80px_-20px_#8686f01f_inset] border-2 border-white/5 font-geistSans hover:bg-transparent/10 hover:border-zinc-600">
            <CardContent>
              <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r to-blue-800 from-zinc-100">Details</h1>
            </CardContent>
          </Card>
        </div>
        <div className=' w-screen flex items-center justify-center' >
          <Card className="text-sky-50 p-6 w-1/2 mt-10 h-96 shadow-2xl bg-page-gradient [box-shadow:0_-20px_80px_-20px_#8686f01f_inset] border-2 border-white/5 font-geistSans hover:bg-transparent/10 hover:border-zinc-600">
            <div className='m-16'>
              <div className='flex my-4 items-center '>
                <Label className="bg-gradient-to-tr from-zinc-100 via-zinc-200/50 to-zinc-200/90 text-transparent mx-5 text-2xl bg-clip-text p-3 font-bold tracking-wide">Name</Label>
                <p className="text-transparent bg-clip-text bg-gradient-to-r to-blue-800 from-zinc-100 text-2xl box-shadow:0_-20px_80px_-20px_#8686f01f_inset] border-2 w-3/4  text-center p-2 border-white/5 rounded-lg bg-zinc-500/10 tracking-wide font-semibold">{data.user.given_name} {data.user.family_name}</p>
              </div>
              <div className='flex my-4'>
                <Label className="bg-gradient-to-tr from-zinc-100 via-zinc-200/50 to-zinc-200/90 text-transparent mx-5 text-2xl bg-clip-text p-3 font-bold tracking-wide">Email</Label>
                <p className="text-2xl box-shadow:0_-20px_80px_-20px_#8686f01f_inset] border-2 w-3/4 text-center m-1 p-2 border-white/5 rounded-lg bg-zinc-500/10 tracking-wide font-semibold text-transparent bg-clip-text bg-gradient-to-r to-blue-800 from-zinc-100">{data.user.email}</p>
              </div>
              <div className='flex my-4 items-center '>
                <a href='/api/logout' className="text-transparent bg-clip-text bg-gradient-to-r to-blue-800 from-zinc-100 text-2xl [box-shadow:0_-20px_80px_-20px_#8686f01f_inset] border-2 w-full  text-center p-2 border-white/5 rounded-lg bg-zinc-500/10 tracking-wide font-semibold">Logout</a>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div >
  )
}


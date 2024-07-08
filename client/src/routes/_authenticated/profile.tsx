import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query';
import { userQueryoptions } from '../../lib/api';
import { Card, CardContent } from '../../components/ui/card';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../../components/ui/drawer"
import { Button } from '../../components/ui/button';

export const Route = createFileRoute('/_authenticated/profile')({
  component: Profile,
})

export function Profile() {
  const { isPending, data, error } = useQuery(userQueryoptions);

  if (isPending) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return (
    <div >
      <Drawer>
        <DrawerTrigger>Profile</DrawerTrigger>
        <DrawerContent className='flex items-center justify-center h-4/5 bg-transparent bg-gradient-to-r from-slate-800 to-slate-700 border-2 border-white/30 '>
          <img src="https://tailwindcss.com/_next/static/media/docs-dark@tinypng.1bbe175e.png" className='absolute top-0 right-48 opacity-80 ' />
          <div className='flex flex-col absolute top-0 right-0'>
            <div className=' w-screen flex items-center justify-center' >
              <Card className="text-sky-50 pt-6 mt-10 w-1/4 text-center shadow-2xl bg-page-gradient [box-shadow:0_-20px_80px_-20px_#8686f01f_inset] border-2 border-white/5 font-geistSans hover:bg-transparent/10 hover:border-zinc-600">
                <CardContent>
                  <h1 className="text-3xl font-bold text-gray-200">Profile</h1>
                </CardContent>
              </Card>
            </div>
            <div className=' w-screen flex items-center justify-center' >
              <Card className="text-sky-50 pt-6 w-1/4 m-5 text-center shadow-2xl bg-page-gradient [box-shadow:0_-20px_80px_-20px_#8686f01f_inset] border-2 border-white/5 font-geistSans hover:bg-transparent/10 hover:border-zinc-600">
                <CardContent>
                  <h1 className="text-3xl font-bold text-gray-200">Profile1</h1>
                </CardContent>
              </Card>
            </div>
          </div>
          <DrawerFooter />
        </DrawerContent>
      </Drawer>
    </div >
  )
}


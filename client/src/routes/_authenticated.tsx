import { createFileRoute, Outlet } from "@tanstack/react-router";
import { userQueryoptions } from "../lib/api";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";

const Login = () => {
  return (
    <div>
      <div className="absolute w-screen flex items-center justify-center ">
        <Card className="text-sky-50 pt-6 w-1/2 mt-36 text-center shadow-2xl bg-page-gradient [box-shadow:0_-20px_80px_-20px_#8686f01f_inset] border-2 border-white/5 font-geistSans hover:bg-transparent/10 hover:border-zinc-600">
          <CardHeader>
            <CardTitle className="bg-gradient-to-br from-indigo-400 via-indigo-300 to-indigo-700 bg-clip-text text-transparent text-6xl font-medium">Enter to manage your SpendLog</CardTitle>
              <div className='flex my-4 items-center justify-center'>
                <a href='/api/login' className="text-transparent bg-clip-text m-10 bg-gradient-to-r to-blue-800 from-zinc-100 text-2xl [box-shadow:0_-20px_80px_-20px_#8686f01f_inset] border-2 w-1/2 text-center p-2 border-white/5 rounded-lg bg-zinc-500/10 tracking-wide font-semibold">Login</a>
              </div>            
          </CardHeader>
        </Card>
      </div>
    </div>
  )
}


const Component = () => {
  const { user } = Route.useRouteContext();
  if (!user) {
    return <Login />
  }
  return <Outlet />
}


// src/routes/_authenticated.tsx
export const Route = createFileRoute('/_authenticated')({
  beforeLoad: async ({ context }) => {
    const queryClient = context.queryClient

    try {
      const data = await queryClient.fetchQuery(userQueryoptions)
      return data
    } catch (error) {
      return { user: null }
    }

  },
  component: Component,
})



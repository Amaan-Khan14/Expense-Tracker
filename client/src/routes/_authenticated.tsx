import { createFileRoute, Outlet } from "@tanstack/react-router";
import { userQueryoptions } from "../lib/api";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";

const Login = () => {
  return (
    <div>
      <div className="absolute w-screen flex items-center justify-center ">

        <Card className="text-sky-50 pt-6 w-1/2 mt-36 text-center shadow-2xl bg-page-gradient [box-shadow:0_-20px_80px_-20px_#8686f01f_inset] border-2 border-white/5 font-geistSans hover:bg-transparent/10 hover:border-zinc-600">
          <CardHeader>
            <CardTitle className="bg-gradient-to-br from-indigo-400 via-indigo-300 to-indigo-700 bg-clip-text text-transparent text-6xl">Login</CardTitle>
            <CardDescription className="bg-gradient-to-br from-zinc-100 via-zinc-200/50 to-zinc-200/90 text-transparent bg-clip-text animate-text text-5xl">
              <a href="/api/login">Login</a>
            </CardDescription>
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



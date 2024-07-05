import { createFileRoute } from "@tanstack/react-router";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";


export const Route = createFileRoute("/createExpense")({
  component: createExpenses,
});

function createExpenses() {
  return (
    <div>
      <img src="https://tailwindcss.com/_next/static/media/docs@30.8b9a76a2.avif" className='absolute top-0 opacity-50' />
      <div className="absolute w-screen flex items-center justify-center">
        <Card className="relative bg-page-gradient [box-shadow:0_-20px_80px_-20px_#8686f01f_inset] mt-36 w-2/5 h-1/2 shadow-2xl border-2 border-white/5 text-md font-geistSans ">
          <div className="bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
          <section className="m-16">
            <form className="">
              <Label className="bg-gradient-to-tr from-zinc-100 via-zinc-200/50 to-zinc-200/90 text-transparent bg-clip-text text-lg">Title</Label>
              <Input type="text" placeholder="Title" className="my-2 bg-transparent/10 border-2 border-white/30 text-white text-lg focus:[box-shadow:0_-20px_80px_-20px_#8686f01f_inset] focus:border-white/50" />
              <Label className="bg-gradient-to-tr from-zinc-200 via-zinc-300/50 to-zinc-200/90 text-transparent bg-clip-text text-lg">Amount</Label>
              <Input type="number" placeholder="Amount" className="my-2 bg-transparent/10 border-2 border-white/30 text-white text-lg focus:[box-shadow:0_-20px_80px_-20px_#8686f01f_inset] focus:border-white/50" />
              <Button className="text-lg my-2 mx-56 px-10 relative text-zinc-100 bg-page-gradient border-white/30 text-md font-geistSans hover:border-zinc-600 hover:bg-transparent/20 hover:shadow-inner hover:[box-shadow:0_-20px_80px_-20px_#8686f01f_inset] hover:text-white" variant="outline">Create</Button>
            </form>
          </section>
        </Card>
      </div>
    </div>)
}

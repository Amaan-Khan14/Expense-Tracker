import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./components/ui/card";

function App() {
  const [total, setTotal] = useState(0);
  useEffect(() => {
    async function fetchTotal() {
      const res = await fetch("/api/expenses/total");
      const data = await res.json();
      setTotal(data.total);
    }
    fetchTotal();
  }, []);
  return (
    <>
      <div className=" flex items-center justify-center bg-gradient-to-r from-slate-900 to-slate-700">
        <Card className="w-1/2 pt-6 m-8 text-center backdrop-blur-md bg-slate-600 bg-opacity-50 border-transparent rounded-lg hover:shadow-2xl hover:shadow-blue-500/20 hover:bg-slate-400/80">
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>Card Description</CardDescription>
          </CardHeader>
          <CardContent className="font-semibold text-2xl">{total}</CardContent>
        </Card>
      </div>
    </>
  );
}

export default App;

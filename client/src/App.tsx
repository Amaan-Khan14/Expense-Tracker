import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./components/ui/card";
import { Progress } from "./components/ui/progress";
import { api } from "./lib/api";
import { useQuery } from "@tanstack/react-query";

async function fetchTotal() {
  const response = await api.expenses["total"].$get();
  if (!response.ok) {
    throw new Error("Failed to fetch total");
  }
  return response.json();
}
function ProgressDemo() {
  const [progress, setProgress] = useState(25);

  useEffect(() => {
    let timer = setTimeout(() => setProgress(66), 500);
    timer = setTimeout(() => setProgress(100), 1000);

    return () => clearTimeout(timer);
  }, []);

  return <Progress value={progress} className="w-3/4 m-auto h-3" />;
}

function App() {
  const { isPending, data, error } = useQuery({
    queryKey: ["get-total"],
    queryFn: fetchTotal,
  });

  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <div className=" flex items-center justify-center bg-gradient-to-r from-slate-900 to-slate-700">
        <Card className="w-1/2 pt-6 m-8 text-center backdrop-blur-md bg-slate-600 bg-opacity-50 border-transparent rounded-lg hover:shadow-2xl hover:shadow-blue-500/20 hover:bg-slate-400/80">
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>Card Description</CardDescription>
          </CardHeader>
          <CardContent className="font-semibold text-2xl">
            {isPending ? <ProgressDemo /> : data.total}
          </CardContent>
        </Card>
      </div>
    </>
  );
}

export default App;

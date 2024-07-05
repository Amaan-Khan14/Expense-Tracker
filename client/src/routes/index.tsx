import { createFileRoute } from "@tanstack/react-router";

import { useEffect, useState } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../components/ui/card";
import { Progress } from "../components/ui/progress";
import { api } from "../lib/api";
import { useQuery } from "@tanstack/react-query";

export const Route = createFileRoute("/")({
    component: Index,
});

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

    return (
        <Progress
            value={progress}
            className="w-3/4 m-auto h-3 bg-slate-300 rounded-full overflow-hidden shadow-inner"
        />
    );
}

function Index() {
    const { isPending, data, error } = useQuery({
        queryKey: ["get-total"],
        queryFn: fetchTotal,
    });

    if (error) return <div>Error: {error.message}</div>;

    return (
        <div>
            <img src="https://tailwindcss.com/_next/static/media/docs@30.8b9a76a2.avif" className='absolute top-0 opacity-50 ' />
            <div className="absolute w-screen flex items-center justify-center ">
                <Card className="text-sky-50 pt-6 w-1/2 mt-36 text-center shadow-2xl bg-page-gradient [box-shadow:0_-20px_80px_-20px_#8686f01f_inset] border-2 border-white/5 font-geistSans hover:bg-transparent/10 hover:border-zinc-600">
                    <CardHeader>
                        <CardTitle className="bg-gradient-to-br from-indigo-400 via-indigo-300 to-indigo-700 bg-clip-text text-transparent text-6xl">Card Title</CardTitle>
                        <CardDescription className="bg-gradient-to-tr from-zinc-100 via-zinc-200/50 to-zinc-200/90 text-transparent bg-clip-text animate-text text-5xl">Card Description</CardDescription>
                    </CardHeader>
                    <CardContent className="font-semibold text-2xl">
                        {isPending ? <ProgressDemo /> : data.total}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

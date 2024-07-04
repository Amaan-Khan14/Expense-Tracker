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
            className="w-3/4 m-auto h-3 bg-gradient-to-r from-slate-900 to-slate-700"
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
        <div className="absolute w-screen flex items-center justify-center bg-inherit bg-[radial-gradient(ellipse_20%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]">
            <Card className=" text-sky-50 pt-6 w-2/5 m-28 text-center backdrop-blur-lg bg-page-gradient border-white/30 text-md font-geistSans hover:border-zinc-600 hover:bg-transparent/10 hover:text-zinc-100">
                <CardHeader>
                    <CardTitle>Card Title</CardTitle>
                    <CardDescription>Card Description</CardDescription>
                </CardHeader>
                <CardContent className="font-semibold text-2xl">
                    {isPending ? <ProgressDemo /> : data.total}
                </CardContent>
            </Card>
        </div>
    );
}

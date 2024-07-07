import { hc } from 'hono/client'
import { queryOptions, useQuery } from '@tanstack/react-query';
import { type ApiRoutes } from "../../../server/index"

const client = hc<ApiRoutes>('/')

export const api = client.api

async function getUser() {
    const response = await api.me.$get();
    if (!response.ok) {
        throw new Error("Failed to fetch expenses");
    }
    const data = response.json();
    return data;
}

export const userQueryoptions = queryOptions({
    queryKey: ["get-user-profile"],
    queryFn: getUser,
    staleTime: Infinity,
})


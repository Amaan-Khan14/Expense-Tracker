import { hc } from 'hono/client'
import { queryOptions } from '@tanstack/react-query';
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

export async function fetchAllExpenses() {
    const response = await api.expenses.$get();
    if (!response.ok) {
        throw new Error("Failed to fetch expenses");
    }
    const data = response.json();
    return data;
}

export const fetchAllExpensesQueryOptions = queryOptions({

    queryKey: ["get-all-expenses"],
    queryFn: fetchAllExpenses,
})


export async function deleteExpenses({ id }: { id: number }) {
    const response = await api.expenses[':id{[0-9]+}'].$delete(
        {
            param: { id: id.toString() }
        });
    if (!response.ok) {
        throw new Error("Failed to delete expense");
    }
    const data = response.json();
    return data;

}
import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";

const expenseSchema = z.object({
    id: z.number().positive().int(),
    title: z.string(),
    amount: z.number().positive().int()
})

const createExpense = expenseSchema.omit({ id: true })

type Expense = z.infer<typeof expenseSchema>

const InMemoryExpenses: Expense[] = [
    { id: 1, title: "Rent", amount: 1000 },
    { id: 2, title: "Food", amount: 200 },
    { id: 3, title: "Transport", amount: 100 },
]

export const expenseRoutes = new Hono()
    .get('/', (c) => {
        return c.json({ expense: InMemoryExpenses })
    })
    .post('/', zValidator("json", createExpense), async (c) => {
        const expense = await c.req.valid("json")
        const id = InMemoryExpenses.length + 1
        InMemoryExpenses.push({ ...expense, id })
        return c.json({ expense: InMemoryExpenses })
    })
    .get("/:id{[0-9]+}", (c) => {
        const id = parseInt(c.req.param("id"))
        const expense = InMemoryExpenses.find(e => e.id === id)
        if (!expense) {
            return c.notFound()
        }
        return c.json({ expense })
    })
    .delete("/:id{[0-9]+}", (c) => {
        const id = parseInt(c.req.param("id"))
        const index = InMemoryExpenses.findIndex(e => e.id === id)
        if (index === -1) {
            return c.notFound()
        }
        InMemoryExpenses.splice(index, 1)
        return c.json({ expense: InMemoryExpenses })
    })
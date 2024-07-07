import { Hono } from "hono";
import { date, z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { getUserProfile } from "../kinde";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const expenseSchema = z.object({
    id: z.number().positive().int(),
    title: z.string(),
    amount: z.number().positive().int(),
    date: z.date().optional().transform((d) => d?.toLocaleDateString(undefined, { year: "numeric", month: "2-digit", day: "2-digit" })),
})

const createExpense = expenseSchema.omit({ id: true })

type Expense = z.infer<typeof expenseSchema>

export const expenseRoutes = new Hono()
    .get('/', getUserProfile, async (c) => {
        await new Promise((r) => setTimeout(r, 1500))
        const user = c.var.user
        const expenses = await prisma.expenses.findMany({
            where: {
                userId: user.id
            }
        })
        return c.json({ expense: expenses })
    })
    .post('/', getUserProfile, zValidator("json", createExpense), async (c) => {
        const expense = await c.req.valid("json")
        const user = c.var.user
        const createExpense = await prisma.expenses.create({
            data: {
                title: expense.title,
                amount: expense.amount,
                date: expense.date,
                userId: user.id
            },
            select: {
                id: true,
                title: true,
                amount: true,
                date: true
            }
        })
        return c.json({ expense: createExpense })
    })
    .get("/:id{[0-9]+}", getUserProfile, async (c) => {
        const id = parseInt(c.req.param("id"))
        const expense = await prisma.expenses.findFirst({
            where: {
                id: id
            }
        })
        if (!expense) {
            return c.notFound()
        }
        return c.json({ expense })
    })
    .get("/total", getUserProfile, async (c) => {
        await new Promise((r) => setTimeout(r, 1500))
        const result = await prisma.expenses.aggregate({
            _sum: {
                amount: true
            }
        })
        const total = result._sum.amount ?? 0

        return c.json({ total })
    })
// .delete("/:id{[0-9]+}", getUserProfile, (c) => {
//     const id = parseInt(c.req.param("id"))
//     const index = InMemoryExpenses.findIndex(e => e.id === id)
//     if (index === -1) {
//         return c.notFound()
//     }
//     InMemoryExpenses.splice(index, 1)
//     return c.json({ expense: InMemoryExpenses })
// })
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
    date: z.preprocess(
        (arg) => (arg instanceof Date ? arg : new Date(arg as string)),
        z.date().transform((d) => d.toLocaleDateString(undefined, { year: "numeric", month: "2-digit", day: "2-digit" }))
    ).optional(),
})

const createExpense = expenseSchema.omit({ id: true });

type Expense = z.infer<typeof expenseSchema>

export const expenseRoutes = new Hono()
    .get('/', getUserProfile, async (c) => {
        await new Promise((r) => setTimeout(r, 1500));
        const user = c.var.user;
        const page = 1; // or whatever page number you're on;
        const pageSize = 10;

        const expenses = await prisma.expenses.findMany({
            where: {
                userId: user.id
            },
            orderBy: {
                date: 'desc'
            },
            skip: (page - 1) * pageSize,
            take: pageSize
        });
        return c.json({ expense: expenses });
    })
    .post('/', getUserProfile, zValidator("json", createExpense), async (c) => {
        const expense = await c.req.valid("json");
        const user = c.var.user;
        if (expense.date) {
            expense.date = new Date(expense.date).toISOString();
        };
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
        return c.json({ expense: createExpense });
    })
    .get("/:id{[0-9]+}", getUserProfile, async (c) => {
        const id = parseInt(c.req.param("id"));
        const user = c.var.user;
        const expense = await prisma.expenses.findFirst({
            where: {
                id: id,
                userId: user.id
            }
        })
        if (!expense) return c.notFound();

        return c.json({ expense });
    })
    .get("/total", getUserProfile, async (c) => {
        await new Promise((r) => setTimeout(r, 1500));
        const user = c.var.user;
        const result = await prisma.expenses.aggregate({
            _sum: {
                amount: true
            },
            where: {
                userId: user.id
            }
        })
        const total = result._sum.amount ?? 0;

        return c.json({ total });
    })
    .delete("/:id{[0-9]+}", getUserProfile, async (c) => {
        const id = parseInt(c.req.param("id"));
        const user = c.var.user;

        const expense = await prisma.expenses.delete({
            where: {
                id: id,
                userId: user.id
            },
            select: {
                title: true,
                amount: true
            }
        })

        if (!expense) return c.notFound();

        return c.json({ expense })
    })
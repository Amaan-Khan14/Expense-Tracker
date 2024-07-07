import { z } from "zod";

const expenseSchema = z.object({
    id: z.number().positive().int(),
    title: z.string().min(1, { message: "Title must be at least 3 charchter(s)" }).max(255),
    amount: z.number().positive().int(),
    date: z.preprocess(
        (arg) => (arg instanceof Date ? arg : new Date(arg as string)),
        z.date().transform((d) => d.toLocaleDateString(undefined, { year: "numeric", month: "2-digit", day: "2-digit" }))
    ).optional(),
})

export const createExpense = expenseSchema.omit({ id: true });



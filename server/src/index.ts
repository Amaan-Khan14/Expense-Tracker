import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { expenseRoutes } from '../routes/expense'

const app = new Hono()

app.use(logger())

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.route('/api/expenses', expenseRoutes)

export default app

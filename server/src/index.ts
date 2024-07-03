import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { expenseRoutes } from '../routes/expense'
import { serveStatic } from 'hono/bun'


const app = new Hono()

app.use(logger())

app.route('/api/expenses', expenseRoutes)


app.use('*', serveStatic({ root: './client/dist' }))
app.get('*', serveStatic({ path: './client/dist/index.html' }))

export default app

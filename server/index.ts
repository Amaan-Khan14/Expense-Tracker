import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { expenseRoutes } from './routes/expense'
import { serveStatic } from 'hono/bun'
import { authRoute } from './routes/authRoute'


const app = new Hono()

app.use(logger())

const apiRoute = app.basePath('/api')
  .route('/expenses', expenseRoutes)
  .route('/', authRoute)  


app.use('*', serveStatic({ root: './client/dist' }))
app.get('*', serveStatic({ path: './client/dist/index.html' }))

export default app
export type ApiRoutes = typeof apiRoute
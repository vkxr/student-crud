import express from 'express'
import cors from 'cors'
import studentRoutes from './routes/studentRoutes'

const app = express()
const PORT = process.env.PORT || 5000

// middleware
app.use(cors())
app.use(express.json())

// routes
app.use('/api/students', studentRoutes)

// health check
app.get('/', (_req, res) => {
    res.json({ message: 'Student CRUD API is running 🚀' })
})

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})

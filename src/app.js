const cors = require('cors');
const express = require('express')
const port = process.env.PORT
const userRouter = require('./routers/user')
const notesRouter = require('./routers/notes-router')
const todoRouter = require('./routers/todo-router')
require('./db/db')

const app = express()

app.use(cors());
app.use(express.json({ limit: "200mb" }));
app.use(express.urlencoded({ limit: "200mb", extended: true }));
app.use(userRouter)
app.use(todoRouter)
app.use(notesRouter)

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})

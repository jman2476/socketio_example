import express from 'express'
import { createServer } from 'node:http'

const app = express()
const port = 3100
const server = createServer(app)

app.get('/', (req, res)=> {
    res.send('<h1>Ahoy matey</h1>')
})

server.listen(port, () => {
    console.log(`server running at http://localhost:${port}`)
})
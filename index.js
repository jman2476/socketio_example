import express from 'express'
import { createServer } from 'node:http'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const app = express()
const port = 3100
const server = createServer(app)

const __dirname = dirname(fileURLToPath(import.meta.url))

app.get('/', (req, res)=> {
    // res.send('<h1>Ahoy matey</h1>')
    res.sendFile(join(__dirname, 'index.html'))
})

server.listen(port, () => {
    console.log(`server running at http://localhost:${port}`)
})
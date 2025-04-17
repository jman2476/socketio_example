import express from 'express'
import { createServer } from 'node:http'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { Server  } from 'socket.io'
import { strictEqual } from 'node:assert'
import { SocketAddress } from 'node:net'

const app = express()
const port = 3100
const server = createServer(app)
const io = new Server(server, {
    connectionStateRecovery: {}
})

const __dirname = dirname(fileURLToPath(import.meta.url))

app.get('/', (req, res)=> {
    // res.send('<h1>Ahoy matey</h1>')
    res.sendFile(join(__dirname, 'index.html'))
})

io.on('connection', (socket) => {
    console.log('a user connected')
    socket.on('disconnect', () => {
        console.log('user disconnected')
    })

    socket.on('chat message', (msg) => {
        io.emit('chat message', msg)
    })

    
})

server.listen(port, () => {
    console.log(`server running at http://localhost:${port}`)
})
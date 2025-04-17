import express from 'express'
import { createServer } from 'node:http'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { Server  } from 'socket.io'

import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

const db = await open({
    filename: 'chat.db',
    driver: sqlite3.Database
})

await db.exec(`
    CREATE TABLE IF NOT EXISTS messages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        client_offset TEXT UNIQUE,
        content TEXT
    );
    `)

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
    socket.on('chat message', async (msg) => {
        let result
        try {
            result = await db.run('INSERT INTO messages (content) VALUES (?)', msg)
        } catch (e) {
            
        }

        io.emit('chat message', msg, result.lastID)
    })

    
})

server.listen(port, () => {
    console.log(`server running at http://localhost:${port}`)
})
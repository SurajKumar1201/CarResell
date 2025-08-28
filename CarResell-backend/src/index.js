import http from 'http'
import 'dotenv/config'
import connectToDb from './db/db.connect.js'
import app from './app.js'

//Create server instance
const server=http.createServer(app)

//store port
const PORT=process.env.PORT

//listen on a port

server.listen(PORT,()=>{
    console.log(`Listening on PORT: ${PORT}`)
    connectToDb()
})
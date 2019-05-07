const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const cors = require('cors')

const app = express()

app.use(cors())

const server = require('http').Server(app)
const io = require('socket.io')(server)

io.on('connection', socket => {
   socket.on('connectRoom', box => {
       socket.join(box)
   })
})

mongoose.connect('mongodb+srv://clonebox:clonebox@databoxes-1utlq.mongodb.net/clonebox?retryWrites=true',{
    useNewUrlParser : true
})

app.use((req,res,next) => {
    req.io = io
    return next()
})

//Modules
app.use(express.json())
app.use(express.urlencoded({extended : true})) // Permite o envio de arquivos pela URL
app.use('/files',express.static(path.resolve(__dirname,'..','tmp')))

app.use(require('./routes'))

const port = process.env.PORT || 5000
const host = process.env.HOST || '0.0.0.0'
server.listen(port,host, function(){
    console.log("Server started.......");
})
const express = require('express')
const app = express()

const port = 8080
const http = require('http').createServer(app)
const io = require('socket.io')(http)

app.use(express.static('public'))

//I listen for socket connection
io.on('connect', (socket) => {
  //Once a user is connected I wait for him to send me figure on the event 'send_figure'
  console.log('User connected')
  socket.on('send_figure', (figure_specs) => {
    //Here I received the figure specs, all I do is send back the specs to all other client with the event share figure
    socket.broadcast.emit('share_figure', figure_specs)
  })
})

http.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})


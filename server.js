require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const http = require('http');
const roomRoutes = require('./src/routes/roomRoutes');

const app = express();

// Middlewares
app.use(express.json());

const corsOptions = {
   origin: process.env.CLIENT_URL,
   credentials: true
};
app.use(cors(corsOptions));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URL)
   .then(() => console.log('MongoDB Connected'))
   .catch((error) => console.log('Failed to connect to MongoDB: ', error));

const server = http.createServer(app)

const { Server } = require('socket.io');
const { Socket } = require('dgram');

const io = new Server(server, {
   cors: {
      origin: process.env.CLIENT_URL,
      methods: ["GET","POST","DELETE","PUT"],
   }
})
//Gets executed on every new connection.
//if the new connection is for custom event "join-room"
//to join a room, we add it to the pool of clients sharing same roomCode 
io.on("connection",(socket) => {
   console.log("New client connection: ",socket.id);

   socket.on("join-room",(roomCode) => {
      socket.join(roomCode);
      console.log(`User joined room: ${roomCode}`);
   });

   socket.on("disconnect",()=>{
      console.log("Client disconnected: ",socket.id);
   })
});

app.set("io",io);

// Routes
app.use('/room', roomRoutes);

const PORT = process.env.PORT;
server.listen(PORT, (error) => {
   if (error) {
       console.log('Server not starting due to: ', error);
   } else {
       console.log(`Server running at port ${PORT}`);
   }
});

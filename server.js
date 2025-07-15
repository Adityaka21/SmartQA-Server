require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

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

// Routes
app.use('/room', roomRoutes);

const PORT = process.env.PORT;
app.listen(PORT, (error) => {
   if (error) {
       console.log('Server not starting due to: ', error);
   } else {
       console.log(`Server running at port ${PORT}`);
   }
});

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const http = require('http');
const socketIo = require('socket.io');
const rateLimit = require('express-rate-limit')
const  helmet = require('helmet')


// Initialize express app
const app = express();

// Load environment variables
dotenv.config();


const limiter = rateLimit({
    windowMs: 15 * 60 *1000,
    max: 100,
    message: "Too many requests, Please try again later"
})

app.use(limiter);
app.use(helmet())


// Middleware
app.use(cors({
    origin: 'http://localhost:3000',  // Frontend URL
    credentials: true
}));
app.use(express.json());  // To parse JSON bodies


app.use((req, res, next)=>{
    res.setHeader("Content-Security-Policy", "deafaut-src 'self'")
    next();
})

// Routes
const userRoutes = require('./routes/userRoutes');
const jobRoutes = require('./routes/jobRoutes');
const applicationRoutes = require('./routes/applicationRoutes');  // Added
const notificationRoutes = require('./routes/notificationRoutes');  // Optional

// Test route
app.get('/', (req, res) => {
    res.send('Job Listing Portal is running');
});

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => {
        console.error('MongoDB connection error:', err);
        process.exit(1);  // Exit if connection fails
    });

// Application routes
app.use('/api/users', userRoutes);  // User-related routes
app.use('/api/jobs', jobRoutes);    // Job-related routes
app.use('/api/applications', applicationRoutes); // Application routes
app.use('/api/notifications', notificationRoutes); // Notification routes (optional)

// 404 Error handling middleware
app.use((req, res, next) => {
    res.status(404).json({ message: 'Endpoint Not Found' });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal server error', error: err.message });
});

// Create HTTP server
const server = http.createServer(app);

// Set up Socket.IO
const io = socketIo(server, {
    cors: {
        origin: "http://localhost:3000",  // Frontend URL
        methods: ["GET", "POST"]
    }
});

// Socket.IO connection
io.on('connection', (socket) => {
    console.log('A user connected');

    // Example: Listen for 'notification' event and broadcast it
    socket.on('notification', (data) => {
        io.emit('notification', data);  // Broadcast to all clients
    });

    // Handle user disconnect
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

// Start server on specified PORT
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

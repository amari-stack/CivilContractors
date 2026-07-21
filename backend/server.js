const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const { apiLimiter } = require('./middleware/rateLimiter');
const { errorHandler } = require('./middleware/errorHandler');

const proposalRoutes = require('./routes/proposalRoutes');
const geminiRoutes = require('./routes/geminiRoutes');

// Load environment variables
dotenv.config();

// Connect to MongoDB Atlas
connectDB();

const app = express();
const PORT = Number(process.env.PORT) || 5000;

// Security Headers Middleware
app.use(helmet({ contentSecurityPolicy: false }));

// CORS Middleware
const allowedOrigin = process.env.CLIENT_URL || '*';
app.use(cors({ origin: allowedOrigin, credentials: true }));

// Body Parser Middleware
app.use(express.json());

// Apply Rate Limiter to /api routes
app.use('/api/', apiLimiter);

// Health Check Route (for Render deployment verification)
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    service: 'Civil Contractors Production Backend',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// API Endpoint Routes
app.use('/api/proposal', proposalRoutes);
app.use('/api/gemini', geminiRoutes);

// Centralized Error Handling Middleware
app.use(errorHandler);

// Start Server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Production Backend Server listening on port ${PORT}`);
});

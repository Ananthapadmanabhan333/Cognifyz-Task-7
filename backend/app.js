require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const passport = require('passport');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const path = require('path');

const connectDB = require('./config/db');
const { connectRedis } = require('./config/redis');
require('./config/passport'); // Initialize passport strategies

// Routes
const authRoutes = require('./routes/authRoutes');
const githubRoutes = require('./routes/githubRoutes');
const resumeRoutes = require('./routes/resumeRoutes');
const recommendationRoutes = require('./routes/recommendationRoutes');

// Middleware
const errorHandler = require('./middleware/errorHandler');
const { apiLimiter } = require('./middleware/rateLimiter');

const app = express();

// Connect to Databases
connectDB();
connectRedis();

// Setup Swagger
const swaggerDocument = YAML.load(path.join(__dirname, 'swagger.yaml'));

// Global Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: 'http://localhost:5173', // Vite default port
    credentials: true
}));
app.use(helmet());
app.use(morgan('dev'));
app.use(passport.initialize());

// Apply Rate Limiter
app.use('/api', apiLimiter);

// API Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Mount Routes
app.use('/api/auth', authRoutes);
app.use('/api/github', githubRoutes);
app.use('/api/resume', resumeRoutes);
app.use('/api/recommendations', recommendationRoutes);

// Simple dashboard stats endpoint
app.get('/api/stats', (req, res) => {
    // In a real app, you would fetch these from DB/Redis
    res.json({
        success: true,
        data: {
            totalCalls: 1542,
            cachedRequests: 890,
            failedRequests: 23,
            avgResponseTime: '120ms'
        }
    });
});

// Error Handler (must be last middleware)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});

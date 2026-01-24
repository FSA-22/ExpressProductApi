// Node modules
import express from 'express';

// Custom modules
import { PORT } from './config/env.js';
import productRouter from './routes/products.routes.js';
import authRouter from './routes/auth.routes.js';
import connectDB from './databases/mongoDB.js';
import { errorMiddleware } from './middleware/error.middleware.js';
import todoRouter from './routes/todo.route.js';

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(errorMiddleware);

// Routes

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/products', productRouter);
app.use('/api/v1/todos', todoRouter);

let server;

/**
 * Bootstrap server — immediate execution
 */
(async () => {
  try {
    await connectDB();

    server = app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
})();

/**
 * Graceful shutdown
 */
const shutdown = async (signal) => {
  console.log(`\nReceived ${signal}. Shutting down gracefully...`);

  try {
    if (server) {
      await new Promise((resolve, reject) => {
        server.close((err) => {
          if (err) return reject(err);
          console.log('HTTP server closed');
          resolve();
        });
      });
    }

    await mongoose.connection.close(false);
    console.log('MongoDB connection closed');
    process.exit(0);
  } catch (error) {
    console.error('Shutdown error:', error.message);
    process.exit(1);
  }
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

export default app;

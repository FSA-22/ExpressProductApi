// Node module
import express from 'express';

// Custom module
import { PORT } from './config/env.js';
import productRouter from './routes/products.routes.js';

const app = express();

app.use(express.json());

app.use('/api/v1/products', productRouter);

app.listen(PORT, () => {
  console.log(`server running on  http://localhost:${PORT}`);
});

export default app;

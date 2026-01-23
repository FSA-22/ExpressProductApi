import mongoose from 'mongoose';
import { MONGODB_URI } from '../config/env.js';

/**
 *  MongoDB connection
 */
const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log(`MongoDB connected to ${MONGODB_URI}`);
  } catch (error) {
    console.error('MongoDB connection failed', error);
    process.exit(1);
  }
};

export default connectDB;

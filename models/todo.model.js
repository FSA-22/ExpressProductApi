import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema(
  {
    externalId: {
      type: Number,
      required: true,
    },
    userId: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: [true, 'Title is required'],
    },
    completed: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model('Todo', todoSchema);

import mongoose from 'mongoose';

/**
 * Product schema
 * imageUrl stores Cloudinary-hosted image
 */
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
      maxLength: [100, 'Product name should not exceed 100 characters'],
    },
    price: { type: Number, required: [true, 'Price is required'] },
    description: String,
    imageUrl: String,
  },
  { timestamps: true },
);

export default mongoose.model('Product', productSchema);

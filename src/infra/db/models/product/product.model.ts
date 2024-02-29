import mongoose from 'mongoose';

const { Schema } = mongoose;

const productSchema = new Schema({
  make: String,
  model: Number,
  price: Number,
  description: String,
  sex: String,
  color: String,
  size: Number,
  isAvailable: Boolean,
});

export const ProductModel = mongoose.model('product', productSchema);

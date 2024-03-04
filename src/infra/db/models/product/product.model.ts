import mongoose from 'mongoose';

const { Schema } = mongoose;

const productSchema = new Schema({
  make: { type: String, required: true },
  model: { type: Number, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  sex: { type: String, required: true },
  color: { type: String, required: true },
  size: { type: Number, required: true },
  isAvailable: { type: Boolean, required: true },
});

const ProductModel = mongoose.model('ProductModel', productSchema);

export default ProductModel;

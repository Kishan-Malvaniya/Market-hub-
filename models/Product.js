import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  id: { type: Number },
  title: { type: String, required: true },
  price: { type: String, required: true },
  category: { type: String, required: true },
  img: { type: String },
  seller: { type: String }
});

export default mongoose.model('Product', productSchema);

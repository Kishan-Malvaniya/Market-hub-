import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  id: { type: String, required: true },
  date: { type: String, required: true },
  total: { type: String, required: true },
  status: { type: String, default: 'Pending' },
  items: [String]
});

export default mongoose.model('Order', orderSchema);

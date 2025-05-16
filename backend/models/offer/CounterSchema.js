const mongoose = require("mongoose");

// Counter schema and model for order ID sequence
const CounterSchema = new mongoose.Schema({
  _id: { type: String, required: true }, // e.g., "orderId"
  seq: { type: Number, default: 0 }
});

const Counter = mongoose.model("Counter", CounterSchema);

module.exports = {
    Counter
}
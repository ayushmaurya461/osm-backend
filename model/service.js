const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  serviceName: { type: String, required: true },
  name: { type: String },
  image: String,
  description: String,
  contact: mongoose.Schema.Types.Mixed,
  address: mongoose.Schema.Types.Mixed,
  businessHours: mongoose.Schema.Types.Mixed,
  pricing: mongoose.Schema.Types.Mixed,
  serviceArea: String,
  teamMembers: mongoose.Schema.Types.Mixed,
  paymentMethods: String,
  tools: String,
  overallPriceRange: String,
});

module.exports = mongoose.model("Service", productSchema);

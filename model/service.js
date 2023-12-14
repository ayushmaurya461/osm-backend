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
  license: mongoose.Schema.Types.Mixed,
  serviceCategories: mongoose.Schema.Types.Mixed,
  teamMembers: mongoose.Schema.Types.Mixed,
  paymentMethods: mongoose.Schema.Types.Mixed,
  tools: mongoose.Schema.Types.Mixed,
  overallPriceRange: mongoose.Schema.Types.Mixed,
  faq: mongoose.Schema.Types.Mixed,
  reviews: mongoose.Schema.Types.Mixed,
});

module.exports = mongoose.model("Service", productSchema);

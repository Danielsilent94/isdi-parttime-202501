import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema({
  comment: { type: String, required: true }, // antes "text"
  rating: { type: Number, required: true, min: 1, max: 5 }, // antes "score"
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // antes "author"
}, { timestamps: true });

export default mongoose.model("Review", ReviewSchema);
import { model, models, Schema } from "mongoose";


const TransactionSchema = new Schema ({
  createdAt: { type: Date, default: Date.now },
  stripeId: { type: String, required: true, unique: true },
  amount: { type: Number, required: true },
  plan: { type: String },
  credits: { type: Number },
  buyer: { type: Schema.Types.ObjectId, ref: "User" },
});

const Transaction = models?.Transaction || model("Transaction", TransactionSchema);

export default Transaction;

/* import { model, models, Schema } from "mongoose";

const TransactionSchema = new Schema({
  createdAt: { type: Date, default: Date.now },
  razorpayOrderId: { type: String, required: true, unique: true },
  razorpayPaymentId: { type: String, required: true, unique: true },
  razorpaySignature: { type: String, required: true },
  amount: { type: Number, required: true },
  plan: { type: String },
  credits: { type: Number },
  buyer: { type: Schema.Types.ObjectId, ref: "User" },
});

const Transaction = models?.Transaction || model("Transaction", TransactionSchema);

export default Transaction; */
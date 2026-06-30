import mongoose, { Schema, model, models, type InferSchemaType } from "mongoose";

const QuoteRequestSchema = new Schema(
  {
    customerName: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    email: { type: String, default: "", trim: true, lowercase: true },
    companyName: { type: String, default: "", trim: true },
    productName: { type: String, default: "", trim: true },
    quantity: { type: String, default: "", trim: true },
    message: { type: String, default: "" },
  },
  { timestamps: true }
);

export type QuoteRequestType = InferSchemaType<typeof QuoteRequestSchema> & {
  _id: mongoose.Types.ObjectId;
};

export const QuoteRequest =
  models.QuoteRequest || model("QuoteRequest", QuoteRequestSchema);

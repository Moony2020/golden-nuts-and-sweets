import mongoose, { Schema, model, models, type InferSchemaType } from "mongoose";

const ContactMessageSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    phone: { type: String, default: "", trim: true },
    email: { type: String, default: "", trim: true, lowercase: true },
    message: { type: String, required: true },
  },
  { timestamps: true }
);

export type ContactMessageType = InferSchemaType<typeof ContactMessageSchema> & {
  _id: mongoose.Types.ObjectId;
};

export const ContactMessage =
  models.ContactMessage || model("ContactMessage", ContactMessageSchema);

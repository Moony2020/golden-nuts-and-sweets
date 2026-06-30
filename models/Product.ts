import mongoose, { Schema, model, models, type InferSchemaType } from "mongoose";
import { CATEGORY_SLUGS } from "@/lib/config";

const ProductSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true, lowercase: true },
    category: { type: String, required: true, enum: CATEGORY_SLUGS },
    description: { type: String, default: "" },
    shortDescription: { type: String, default: "" },
    image: { type: String, default: "" },
    galleryImages: [{ type: String }],
    originCountry: { type: String, default: "" },
    packaging: { type: String, default: "" },
    minimumOrderQuantity: { type: String, default: "" },
    available: { type: Boolean, default: true },
    featured: { type: Boolean, default: false },
    tags: [{ type: String }],
  },
  { timestamps: true }
);

export type ProductType = InferSchemaType<typeof ProductSchema> & {
  _id: mongoose.Types.ObjectId;
};

export const Product = models.Product || model("Product", ProductSchema);

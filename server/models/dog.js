import mongoose from "mongoose";

const dogSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    breed: { type: String, required: true },
    age: { type: Number, required: true },
    status: {
      type: String,
      enum: ["available", "adopted"],
      default: "available",
    },
  },
  { timestamps: true },
);

const Dog = mongoose.model("Dog", dogSchema);

export default Dog;
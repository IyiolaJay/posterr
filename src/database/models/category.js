import { Schema, model } from "mongoose";
import { v4 as uuidV4 } from "uuid";

const categorySchema = new Schema(
  {
    category_uuid: {
      type: String,
      required: true,
      default: () => uuidV4(),
      unique: true,
    },
    title: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);


categorySchema.pre('save', function (next) {
  this.title = this.title.toLowerCase();
  next();
});
const Category = model("Categories", categorySchema);

export default Category;

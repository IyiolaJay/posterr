import { Schema, model } from "mongoose";
import { v4 as uuidV4 } from "uuid";

const postSchema = new Schema(
  {
    post_uuid: {
      type: String,
      required: true,
      default: () => uuidV4(),
      unique: true,
    },
    userId : {
        type: Schema.Types.ObjectId,
        ref:"User",
        required : true,
    },
    title: {
      type: String,
      required : true,
    },
    contentBody: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);


const Post = model("Posts", postSchema);

export default Post;

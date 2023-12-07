import Category from "../../../database/models/category.js";
import Post from "../../../database/models/post.js";
import {
  ErrMissingKeyFields,
  ErrResourceNotFound,
  ErrCategoryNotFound,
} from "../../../errors/index.js";
import { getIo } from "../../../socket.js";

/**
 * @description Create Post
 * @param (userReq Object & userId)
 * @returns Created Post
 */
export const createPostService = async (userReq, userId) => {
  const { category } = userReq;

  //findOne method with case insensitive search
  const categoryExists = await Category.findOne({
    title: { $regex: new RegExp(category, "i") },
  })
    .select("_id")
    .lean();
  if (!categoryExists) throw ErrCategoryNotFound;

  const post = await Post.create({
    ...userReq,
    userId: userId,
  });


  // socket.io instance for real time updates
  const io = getIo();
  io.emit("updateTotalPosts", { totalPosts: await Post.countDocuments() });

  return { post };
};

/**
 * @description  Fetch all Posts
 * @param (None)
 * @returns All Posts
 */
const allPostsService = async () => {
  const posts = await Post.find().lean();
  return posts;
};

/**
 * @description  Fetch single Post
 * @param (userId, postId)
 * @returns Single Post
 */
const getSinglePostService = async (postId) => {
  if (!postId) throw ErrMissingKeyFields;
  const post = await Post.findOne({ post_uuid: postId,}).lean();
  if (!post) throw ErrResourceNotFound;
  return post;
};

/**
 * @description  Edit Post
 * @param (post_uuid , post Object, userId)
 * @returns Edited post
 */
const editPostService = async (postId, userReq, id) => {
  const { title, contentBody, category } = userReq;
  if (!title || !contentBody || category) throw ErrMissingKeyFields;

  const post = await Post.findOneAndUpdate(
    //included user_id so other authorized/unauthorized users cannot delete another users post
    { post_uuid: postId, userId: id },
    { ...userReq },
    { new: true }
  );
  if (!post) throw ErrResourceNotFound;
  return post;
};

/**
 * @description  Delete Post
 * @param (Post_uuid, userId)
 * @returns null
 */
const deletePostService = async (postId, userId) => {
  const post = await Post.findOne({ post_uuid: postId, userId: userId })
    .select("_id")
    .lean();

  if (!post) throw ErrResourceNotFound;
  await Post.deleteOne({ _id: post._id });
  return;
};

export const PostService = {
  createPostService,
  allPostsService,
  editPostService,
  deletePostService,
  getSinglePostService,
};

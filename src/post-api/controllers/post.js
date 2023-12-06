import { createPostService } from "../services/app/postService.js";

export const createPost = async (req, res) => {
  try {
    const userReq = req.body;
    const {_id} = req.user;
    const newPost = await createPostService(userReq, _id);
    return res.status(201).json({
      message: "Post created",
      post: newPost,
    });

  } catch (error) {
    console.log(error);
    const result = getErrorMessage(error);
    return res.status(error.code).json({ error: result });
  }
};


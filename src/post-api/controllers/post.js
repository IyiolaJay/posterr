import { PostService}from "../services/app/postService.js";
import { getErrorMessage } from "../../errors/index.js";

export const createPost = async (req, res) => {
  try {
    const userReq = req.body;
    const _id = req.user._id;
    const newPost = await PostService.createPostService(userReq, _id);
    return res.status(201).json({
      message: "Post created",
      post: newPost,
    });

  } catch (error) {
    console.log(error);
    const result = getErrorMessage(error);
    return res.status(result.code).json({ error: result });
  }
};

export const getSinglePost =async(req, res)=>{
  try{
    const postId = req.params.postId;

    const post = await PostService.getSinglePostService( postId);
    return res.status(200).json({
      message: "Success",
      post: post,
    });
  }catch(error){
    console.log(error);
      const result = getErrorMessage(error);
      return res.status(result.code).json({ error: result });
  }
}

export const allPosts = async(_, res)=>{
  try {
      const  posts= await PostService.allPostsService();
      return res
        .status(200)
        .json({ message: "success", data: posts });
    } catch (error) {
      console.log(error);
      const result = getErrorMessage(error);
      return res.status(result.code).json({ error: result });
    }

}

export const editPost = async(req, res)=> {
  try{
  const postId  = req.params.postId;
  const body = req.body;
  const _id = req.user._id;

  const post = await PostService.editPostService(postId, body, _id);
  return res
        .status(200)
        .json({ message: "success", data: post });
    } catch (error) {
      console.log(error);
      const result = getErrorMessage(error);
      return res.status(result.code).json({ error: result });
    }

}

export const deletePost = async(req, res)=>{
  try{
      const postId  = req.params.postId;
      const _id = req.user._id;

       await PostService.deletePostService(postId,_id);
      return res
            .status(200)
            .json({ message: "success, Post deleted", });
        } catch (error) {
          console.log(error);
          const result = getErrorMessage(error);
          return res.status(result.code).json({ error: result });
        }
}


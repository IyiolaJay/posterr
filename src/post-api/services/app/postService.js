import Post from "../../../database/models/post.js";

export const createPostService = async (reqBody, userId)=>{
    const {title, contentBody, category}= reqBody;
    
    const post = await Post.create({
        title: title,
        contentBody: contentBody,
        category: category,
        userId : userId,
    });  

    return {post};


};
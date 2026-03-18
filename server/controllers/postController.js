  import Post from "../models/User.js";

//  POST api/posts
export const createPost = async (req, res) => {

 try {
  const post = await Post.create({
  user: req.user.id,
  content: req.body.content,
  image: req.body.image || "",
  });
  
  res.json({success: true, post});
 } catch(err){
    res.status(500).json({message: err.message});
 }
}
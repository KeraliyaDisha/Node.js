
// import model
const Post = require("../models/postmodel");
const Like = require("../models/likemodel");
const { json } = require("express");

// like a post
// business logic

exports.likePost = async (req, res) => {
    try{
        // fetch data from body
        const {post, user} = req.body;
        
        // create a comment object
        const like = new Like({
            post,user,
        });

        // save the new comment into the database
        const savedLike = await like.save();

        // find the post by ID, add the new comment to its comments array
        const updatedPost = await Post.findByIdAndUpdate(post, {$push: {likes: savedLike._id} }, {new:true})
                            .populate("likes")//populate the comments array with comment documents
                            .exec();
        res.json({
            post: updatedPost,
        });

    }
    catch(error){
      return res.status(500).json({
        error:"Error while liking post"
      });
    }
};

// unlike a post
exports.unlikePost = async (req,res) => {
    try{
        const {post, like} = req.body;
       
        // find and deleted the like collection 
        const deletedLike = await Like.findOneAndDelete({post:post, _id:like});

        // update the post collection
        const updatedPost= await Post.findByIdAndUpdate(post, 
                                                        {$pull: {likes: deletedLike._id}}, 
                                                        {new: true});
        
        res.json({
            post:updatedPost,
        });
    }
    catch(Error){
        return res.status(500).json({
            error:"Error while unlinking post"
          });
    }
}


exports.dummylink = (req, res) => {
    res.send("this is my dummy page")
}
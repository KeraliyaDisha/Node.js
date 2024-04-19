const { Post, Like, Comment, User } = require("../../models");
const postController = {};

postController.create = async (req, res) => {
  try {
    const { title, description, user_id } = req.body;

    const userId = await User.findOne({ where: {id: user_id}})

    if(!userId){
      return res.status(404).json({
        message: translate("NOTFOUND", { name: "user" }),
      });
    }
    const posts = await Post.create({
      user_id,
      title,
      description,
    });

    return res.status(200).json({
      success: true,
      post: posts,
      message: translate("CREATE", { name: "post" }),
    });
  } 
  catch (error) {
    return res.status(500).json({
      success: false,
      message: translate("ERROR"),
    });
  }
};

postController.getAll = async (req, res) => {
  try {
    const posts = await Post.findAll({
      include: [
        {
          model: Like,
          as: "likes",
        },
        {
          model: Comment,
          as: "comments",
        },
      ],
    });

    return res.status(200).json({
      success: true,
      posts: posts,
      message: translate("GET", { name: "posts" }),
    });
  } 
  catch (error) {
    return res.status(500).json({
      success: false,
      message: translate("ERROR"),
    });
  }
};

postController.getById = async (req, res) => {
  try {
    const id = req.params.id;
    const posts = await Post.findByPk(id, {
      include: [
        {
          model: Like,
          as: "likes",
        },
        {
          model: Comment,
          as: "comments",
        },
      ],
    });
    return res.status(200).json({
      success: true,
      posts: posts,
      message: translate("GETBYID", { name: "posts" }),
    });
  } 
  catch (error) {
    return res.status(500).json({
      success: false,
      message: translate("ERROR"),
    });
  }
};

postController.update = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedPosts = await Post.update(req.body, {
      where: { id: id },
    });

    return res.status(200).json({
      success: true,
      updatedPosts: updatedPosts,
      message: translate("UPDATE"),
    });
  } 
  catch (error) {
    return res.status(500).json({
      success: false,
      message: translate("ERROR"),
    });
  }
};

postController.delete = async (req, res) => {
  try {
    const id = req.params.id;
    const { user_id } = req.body;

    const user = await User.findOne({ where: { id: user_id } });
    console.log(user.role);

    if (user.role === "admin") {
      const deletedPost = await Post.destroy({ where: { id: id } });

      await Like.destroy({ where: { postId: id } });
      await Comment.destroy({ where: { postId: id } });

      return res.status(200).json({
        success: true,
        post: deletedPost,
        message: translate("DELETE"),
      });
    } 
    else {
      return res.status(401).json({
        success: false,
        message: translate("NOT_ADMIN"),
      });
    }
  } 
  catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: translate("ERROR"),
    });
  }
};

module.exports = postController;

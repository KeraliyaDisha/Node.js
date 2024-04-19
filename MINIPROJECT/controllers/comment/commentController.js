const { Comment, Post, sequelize } = require("../../models");

const commentController = {};

commentController.create = async (req, res) => {
  try {
    const { postId, user_id, body } = req.body;

    const post = await Post.findOne({ where: { id: postId } });
    if (!post) {
      return res.status(404).json({
        message: translate("NOT_FOUND", { name: "post" }),
      });
    }

    const comments = await Comment.create({
      postId,
      user_id,
      body,
    });

    await Post.update(
      {
        commentCount: sequelize.literal(
          `(SELECT COUNT(*) FROM comments WHERE postId=${postId})`
        ),
      },
      {
        where: { id: postId },
        returning: true,
      }
    );

    return res.status(200).json({
      success: true,
      comments: comments,
      message: translate("CREATE", { name: "comment" }),
    });
  } 
  catch (error) {
    return res.status(500).json({
      success: false,
      message: translate("ERROR"),
    });
  }
};

commentController.update = async (req, res) => {
  try {
    const { postId } = req.body;
    const id = req.params.id;

    const updatedComment = await Comment.update(req.body, {
      where: { id: id, postId: postId },
    });

    return res.status(200).json({
      success: true,
      comment: updatedComment,
      message: translate("UPDATE", { name: "comment" }),
    });
  } 
  catch (error) {
    return res.status(500).json({
      success: false,
      message: translate("ERROR"),
    });
  }
};

commentController.delete = async (req, res) => {
  try {
    const id = req.params.id;
    const { postId } = req.body;

    const deletedComment = await Comment.destroy({
      where: { id: id, postId: postId },
    });

    await sequelize.query(
      "UPDATE posts SET commentCount = commentCount - 1 WHERE id = ?",
      {
        replacements: [ postId ],
        type: sequelize.QueryTypes.UPDATE,
      }
    );

    return res.status(200).json({
      success: true,
      comment: deletedComment,
      message: translate("DELETE"),
    });
  } 
  catch (error) {
    return res.status(500).json({
      success: false,
      message: translate("ERROR"),
    });
  }
};

commentController.getByPostId = async (req, res) => {
  try {
    const { postId } = req.body;
    const comments = await Comment.findAll({ where: { postId: postId } });

    return res.status(200).json({
      success: true,
      comments: comments,
      message: translate("GET", { name: "comments" }),
    });
  } 
  catch (error) {
    return res.status(500).json({
      success: false,
      message: translate("ERROR"),
    });
  }
};

module.exports = commentController;

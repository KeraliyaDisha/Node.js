const { Like, Post, sequelize } = require("../../models");

const likeController = {};

likeController.create = async (req, res) => {
  try {
    const { postId, user_id } = req.body;

    const post = await Post.findOne({ where: { id: postId } });
    if (!post) {
      return res.status(404).json({
        message: translate("NOT_FOUND", { name: "post" }),
      });
    }

    const likes = await Like.create({
      postId,
      user_id,
    });

    await Post.update(
      {
        likeCount: sequelize.literal(
          `(SELECT COUNT(*) FROM likes WHERE postId=${postId})`
        ),
      },
      {
        where: { id: postId },
        returning: true,
      }
    );
    return res.status(200).json({
      success: true,
      likes: likes,
      message: translate("CREATE", { name: "like" }),
    });
  } 
  catch (error) {
    return res.status(500).json({
      success: false,
      message: translate("ERROR"),
    });
  }
};

likeController.delete = async (req, res) => {
  try {
    const id = req.params.id;
    const { postId } = req.body;

    const deletedLike = await Like.destroy({
      where: { id: id, postId: postId },
    });

    await sequelize.query(
      "UPDATE posts SET likeCount = likeCount - 1 WHERE id = ?",
      {
        replacements: [ postId ],
        type: sequelize.QueryTypes.UPDATE,
      }
    );

    return res.status(200).json({
      success: true,
      like: deletedLike,
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

module.exports = likeController;

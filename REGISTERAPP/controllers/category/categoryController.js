const category = require("../../models/category");
// const product = require('../../models/product');
const categoryController = {};

categoryController.create = async (req, res) => {
  try {
    const { name } = req.body;

    const response = await category.create({
      name,
    });

    const savedCategory = await response.save();

    return res.status(200).json({
      data: savedCategory,
      message: translate("CREATE", { name: "category" }),
    });
  } 
  catch (error) {
    return res.status(500).json({
      Message: error.message,
    });
  }
};

categoryController.getAll = async (req, res) => {
  try {
    const data = await category.find({});

    if (!data) {
      return res.status(404).json({
        success: false,
        message: translate("NOT_FOUND", { name: "category" }),
      });
    }
    return res.status(200).json({
      success: true,
      category: data,
      message: translate("GET", { name: "category" }),
    });
  } 
  catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

categoryController.update = async (req, res) => {
  try {
    const { categoryId, name } = req.body;

    const data = await category.findByIdAndUpdate(
      { _id: categoryId },
      { name }
    );
    res.status(200).json({
      success: true,
      category: data,
      message: translate("UPDATE"),
    });
  } 
  catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

categoryController.delete = async (req, res) => {
  try {
    const { categoryId } = req.body;

    const data = await category.findByIdAndDelete({ _id: categoryId });

    return res.status(200).json({
      success: true,
      category: data,
      message: translate("DELETE"),
    });
  } 
  catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

categoryController.getByCategoryId = async (req, res) => {
  try {
    const { categoryId } = req.body;

    const data = await category
      .findById({ _id: categoryId })
      .populate("product")
      .exec();

    return res.status(200).json({
      success: true,
      category: data,
      message: translate("GETBYID"),
    });
  } 
  catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
module.exports = categoryController;

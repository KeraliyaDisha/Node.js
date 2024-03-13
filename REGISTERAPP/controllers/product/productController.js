const product = require("../../models/product");
const category = require("../../models/category");
const productController = {};

productController.create = async (req, res) => {
  try {
    const { categoryId, title, description, status } = req.body;

    const Product = new product({
      title,
      description,
      status,
    });
    let savedProduct = await Product.save();

    const updatedCategory = await category
      .findByIdAndUpdate(
        categoryId,
        { $push: { product: savedProduct._id } },
        { new: true }
      )
      .populate("product")
      .exec();

    return res.status(200).json({
      category: updatedCategory,
      message: translate("CREATE", { name: "product" }),
    });
  } 
  catch (error) {
    return res.status(500).json({
      Message: error.message,
    });
  }
};

productController.getAll = async (req, res) => {
  try {
    const data = await product.find({});

    res.status(200).json({
      success: true,
      product: data,
      message: translate("GET", { name: "product" }),
    });
  } 
  catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

productController.getBycategoryId = async (req, res) => {
  try {
    const { categoryId } = req.body;

    const products = await category
      .findById({ _id: categoryId })
      .populate("product")
      .exec();

    return res.status(200).json({
      success: true,
      category: products,
      message: translate("GET", { name: "product" }),
    });
  } 
  catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

productController.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status } = req.body;

    const data = await product.findByIdAndUpdate(
      { _id: id },
      { title, description, status }
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

productController.delete = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await product.findByIdAndDelete({ _id: id });

    return res.status(200).json({
      success: true,
      product: data,
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

module.exports = productController;

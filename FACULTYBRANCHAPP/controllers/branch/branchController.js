const { Branch, Faculty } = require("../../models");
const branchController = {};

branchController.create = async (req, res) => {
  try {
    const { branch_name, branch_code } = req.body;

    let data = await Branch.create(
      {
        branch_name,
        branch_code,
      },
      {
        include: [
          {
            model: Faculty,
            as: "Faculties",
          },
        ],
      }
    );

    let branchData = await data.save();

    return res.status(200).json({
      success: true,
      branches: branchData,
      message: translate("CREATE", { name: "branch" }),
    });
  } 
  catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: translate("ERROR"),
    });
  }
};

branchController.getAll = async (req, res) => {
  try {
    const branch = await Branch.findAll({
      include: [
        {
          model: Faculty,
          as: "Faculties",
        },
      ],
    });

    return res.status(200).json({
      success: true,
      branch: branch,
      message: translate("GET", { name: "branch" }),
    });
  } 
  catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: translate("ERROR"),
    });
  }
};

branchController.getById = async (req, res) => {
  try {
    const id = req.params.id;

    const branch = await Branch.findByPk(id, {
      include: [
        {
          model: Faculty,
          as: "Faculties",
        },
      ],
    });

    if(!branch){
      return res.status(404).json({
        success: false,
        message: translate("NOT_FOUND", { name:``}),
      });
    }

    return res.status(200).json({
      success: true,
      branch: branch,
      message: translate("GETBYID", { name: "branch" }),
    });
  } 
  catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: translate("ERROR"),
    });
  }
};

branchController.update = async (req, res) => {
  try {
    const id = req.params.id;

    const updatedData = await Branch.update(req.body, {
      where: { id: id },
    });
    
    return res.status(200).json({
      success: true,
      data: updatedData,
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

branchController.delete = async (req, res) => {
  try {
    const id = req.params.id;

    await Branch.destroy({
      where: { id: id },
    });

    res.status(200).json({
      success: true,
      message: translate("DELETE"),
    });
  } 
  catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: translate("ERROR"),
    });
  }
};

module.exports = branchController;


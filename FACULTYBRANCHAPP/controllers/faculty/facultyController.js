const { Faculty, Branch } = require("../../models");
const facultyController = {};

facultyController.create = async (req, res) => {
  try {
    const { name, main_subject, qualification, experience, branch_id } = req.body;
  
    let data = await Faculty.create({
      name,
      main_subject,
      qualification,
      experience,
      branch_id,
    });

    let savedFaculty = await data.save();

    return res.status(200).json({
      success: true,
      faculty: savedFaculty,
      message: translate("CREATE", { name: "faculty" }),
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

facultyController.getAll = async (req, res) => {
  try {
    const faculty = await Faculty.findAll({
      include: [
        {
          model: Branch,
          as: "Branch",
        },
      ],
    });

    return res.status(200).json({
      success: true,
      data: faculty,
      message: translate("GET", { name: "faculties" }),
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

facultyController.getById = async (req, res) => {
  try {
    const id = req.params.id;

    const ID = await Faculty.findOne({where: {id: id}})
    if(!ID){
      return res.status(404).json({
        success: false,
        message: translate("NOT_FOUND", { name: "Faculty" }),
      });
    }
    
    let faculty = await Faculty.findByPk(id, {
      include: [
        {
          model: Branch,
          as: "Branch",
        },
      ],
    });

    return res.status(200).json({
      success: true,
      data: faculty,
      message: translate("GETBYID", { name: "faculty" }),
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

facultyController.update = async (req, res) => {
  try {
    const id = req.params.id;

    const updatedData = await Faculty.update(req.body, {
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

facultyController.delete = async (req, res) => {
  try {
    const id = req.params.id;

    await Faculty.destroy({
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

module.exports = facultyController;

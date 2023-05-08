const { carModel } = require("../models/CarBrand");

// method that fetch all models from DB
exports.findModels = async (req, res) => {
  try {
    let query = carModel.find();

    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.limit) || 8;
    const skip = (page - 1) * pageSize;
    const total = await carModel.countDocuments();
    const pages = Math.ceil(total / pageSize);

    let sort = req.query.sort || "name";
    req.query.sort ? (sort = req.query.sort.split(",")) : (sort = [sort]);
    let sortBy = {};
    if (sort[1]) {
      sortBy[sort[0]] = sort[1];
    } else {
      sortBy[sort[0]] = "asc";
    }

    query = query.skip(skip).limit(pageSize).sort(sortBy);

    if (page > pages) {
      return res.status(404).send({
        status: "fail",
        message: "No page found.",
      });
    }
    const result = await query;

    res.status(200).send({
      status: "success",
      count: result.length,
      page,
      pages,
      modelsData: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "error",
      message: "Server Error",
    });
  }
};

// method that filter models from DB by REGEXP
exports.findModel = async (req, res) => {
  const models = await carModel.find({
    abrv: new RegExp("^" + req.query.name, "i"),
  });
  res.send(models);
};

// method that INSERTs new model into DB
exports.createModel = async (req, res) => {
  const makeId = req.body.makeId;
  const name = req.body.name;
  const abrv = req.body.abrv;

  const model = await carModel.create({ makeId, name, abrv });

  res.send(model);
};

// method to update model in DB
exports.updateModel = async (req, res) => {
  const makeId = req.params.id;
  const name = req.body.name;
  const abrv = req.body.abrv;

  await carModel.findByIdAndUpdate(makeId, { name, abrv });
  const model = await carModel.findById(makeId);

  res.send(model);
};

// method to delete model from DB
exports.deleteModel = async (req, res) => {
  const makeId = req.params.id;

  await carModel.deleteOne({ _id: makeId });
  res.send({ success: "Record deleted" });
};

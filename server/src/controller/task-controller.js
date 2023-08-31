const Task = require("../model/task-model");
const User = require("../model/user-model");

module.exports.addTask = async (req, res, next) => {
  let { todo, status } = req.body;
  if (!todo || !status) {
    return res.send({ message: "Invalid input" });
  }
  try {
    const addTask = new Task({
      todo,
      status,
      UserId: req.userId,
    });
    const addedTask = await addTask.save();
    try {
      res
        .status(201)
        .send({ message: "Task added", ok: true, id: addedTask.id });
    } catch (error) {
      throw new Error();
    }
  } catch (error) {
    res.send({ message: "Task not added", ok: false });
    console.error(error);
  }
};

module.exports.getTasks = async (req, res, next) => {
  try {
    const itemsPerPage = Number(req.query.size) || 2;
    let page = Number(req.query.page);
    const status = req.query.status;
    let query = {
      UserId: req.userId,
    };
    if (status !== "Pending" && status !== "Completed") {
      query.status = { $in: ["Pending", "Completed"] };
    } else {
      query.status = status;
    }
    const count = await Task.countDocuments(query);
    while (itemsPerPage * (page - 1) >= count && page > 1) {
      page -= 1;
    }
    const offset = itemsPerPage * (page - 1);
    if (offset <= count) {
      const tasks = await Task.find(query)
        .sort({ _id: -1 })
        .skip(offset)
        .limit(itemsPerPage);
      res.send({
        ok: true,
        currentPage: page,
        previousPage: page - 1,
        nextPage: tasks.length < itemsPerPage ? 0 : page + 1,
        tasks,
        lastPage:
          tasks.length < itemsPerPage ? 0 : Math.ceil(count / itemsPerPage),
      });
    }
  } catch (error) {
    res.send({ message: error.message });
  }
};

module.exports.deleteTask = async (req, res, next) => {
  try {
    const findTask = await Task.findById(req.params.Id);
    const deleteId = await findTask.deleteOne();
    try {
      res.send({ ok: true, message: "Deleted" });
    } catch (error) {
      throw new Error();
    }
  } catch (error) {
    res.send({ ok: false, message: "failed" });
  }
};

module.exports.editTask = async (req, res, next) => {
  try {
    const Id = req.params.Id;
    let { todo, status } = req.body;
    if (!todo || !status) {
      throw new Error("Invalid input");
    }
    const getTask = await Task.findById(Id);
    const updateTask = await getTask.updateOne({
      status,
      todo,
    });
    try {
      res.send({ message: "Task updated", task: updateTask, ok: true });
    } catch (error) {
      throw new Error();
    }
  } catch (error) {
    res.send({ message: error.message, ok: false });
  }
};

module.exports.getTask = async (req, res, next) => {
  try {
    const Id = req.params.Id;
    const getTask = await Task.findById(Id);
    res.send({ message: "Edit task", task: getTask, ok: true });
  } catch (error) {
    res.send({ message: "Error", ok: false });
  }
};

const meetingsRouter = require("express").Router();

module.exports = meetingsRouter;

const {
  createMeeting,
  addToDatabase,
  getAllFromDatabase,
  deleteAllFromDatabase,
} = require("./db.js");

meetingsRouter.get("/", (req, res, next) => {
  res.send(getAllFromDatabase("meetings"));
});

meetingsRouter.post("/", (req, res, next) => {
  const newMeeting = addToDatabase("meetings", createMeeting());
  res.status(201).send(newMeeting);
});

meetingsRouter.delete("/", (req, res, next) => {
  deleteAllFromDatabase("meetings");
  res.status(204).send();
});

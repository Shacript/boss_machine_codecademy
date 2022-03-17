const minionsRouter = require("express").Router();

module.exports = minionsRouter;

const {
  addToDatabase,
  getAllFromDatabase,
  getFromDatabaseById,
  updateInstanceInDatabase,
  deleteFromDatabasebyId,
} = require("./db.js");

minionsRouter.param("minionId", (req, res, next, id) => {
  const minion = getFromDatabaseById("minions", id);
  if (!minion) return res.status(404).send();
  req.minion = minion;
  next();
});

minionsRouter.get("/", (req, res, next) => {
  res.send(getAllFromDatabase("minions"));
});

minionsRouter.post("/", (req, res, next) => {
  const newMinion = addToDatabase("minions", req.body);
  res.status(201).send(newMinion);
});

minionsRouter.get("/:minionId", (req, res, next) => {
  res.send(req.minion);
});

minionsRouter.put("/:minionId", (req, res, next) => {
  const updatedMinion = updateInstanceInDatabase("minions", req.body);
  res.send(updatedMinion);
});

minionsRouter.delete("/:minionId", (req, res, next) => {
  const deleted = deleteFromDatabasebyId("minions", req.params.minionId);
  res.status(deleted ? 204 : 500).send();
});

minionsRouter.get("/:minionId/work", (req, res, next) => {
  res.send(
    getAllFromDatabase("work").filter(
      (work) => work.minionId === req.params.minionId
    )
  );
});

minionsRouter.post("/:minionId/work", (req, res, next) => {
  const currentRequestBody = req.body;
  currentRequestBody.minionId = req.params.minionId;
  const newWork = addToDatabase("work", currentRequestBody);
  res.status(201).send(newWork);
});

minionsRouter.param("workId", (req, res, next, id) => {
  const work = getFromDatabaseById("work", id);
  if (!work) return res.status(404).send();
  req.work = work;
  next();
});

minionsRouter.put("/:minionId/work/:workId", (req, res, next) => {
  if (req.body.minionId !== req.work.minionId) return res.status(400).send();
  const updatedWork = updateInstanceInDatabase("work", req.body);
  res.send(updatedWork);
});

minionsRouter.delete("/:minionId/work/:workId", (req, res, next) => {
  const deleted = deleteFromDatabasebyId("work", req.params.workId);
  res.status(deleted ? 204 : 500).send();
});

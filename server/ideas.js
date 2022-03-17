const ideasRouter = require("express").Router();

module.exports = ideasRouter;

const checkMillionDollarIdeaMiddleware = require("./checkMillionDollarIdea.js");

const {
  addToDatabase,
  getAllFromDatabase,
  getFromDatabaseById,
  updateInstanceInDatabase,
  deleteFromDatabasebyId,
} = require("./db.js");

ideasRouter.param("ideaId", (req, res, next, id) => {
  const idea = getFromDatabaseById("ideas", id);
  if (!idea) return res.status(404).send();
  req.idea = idea;
  next();
});

ideasRouter.get("/", function (req, res, next) {
  res.send(getAllFromDatabase("ideas"));
});

ideasRouter.post(
  "/",
  checkMillionDollarIdeaMiddleware,
  function (req, res, next) {
    const newIdeas = addToDatabase("ideas", req.body);
    res.status(201).send(newIdeas);
  }
);

ideasRouter.get("/:ideaId", (req, res, next) => {
  res.send(req.idea);
});

ideasRouter.put("/:ideaId", (req, res, next) => {
  const updatedIdea = updateInstanceInDatabase("ideas", req.body);
  res.send(updatedIdea);
});

ideasRouter.delete("/:ideaId", (req, res, next) => {
  const deleted = deleteFromDatabasebyId("ideas", req.params.ideaId);
  res.status(deleted ? 204 : 500).send();
});

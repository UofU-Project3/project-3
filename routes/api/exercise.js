const router = require("express").Router();
const exerciseController = require("../../controllers/exerciseController");

// Matches with "/api/exercises"
router.route("/")
  .get(exerciseController.findAll)
  .post(exerciseController.create);

// Matches with "/api/exercises/:id"
router
  .route("/:id")
  .get(exerciseController.findById)
  .put(exerciseController.update)
  .delete(exerciseController.remove);

module.exports = router;

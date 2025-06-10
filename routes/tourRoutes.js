const fs = require("fs");
const express = require("express");
const tourController = require("../controllers/tourController");

// Middleware for the tour router - no longer need to specify the router as the router is in it's own file
const router = express.Router();

// Param middleware, which has a fourth argument - val
// val parameter is used to access the id parameter of the route
router.param("id", tourController.checkId);

// Tour routes
router
  .route("/")
  .get(tourController.getAllTours)
  .post(tourController.createTour);
router
  .route("/:id")
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;

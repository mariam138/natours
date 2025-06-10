const express = require("express");

// Middleware for the tour router - no longer need to specify the router as the router is in it's own file
const router = express.Router();

// Tour routes
// Chain on the methods that use the same URL
router.route("/").get(getAllTours).post(createTour);
router.route("/:id").get(getTour).patch(updateTour).delete(deleteTour);

module.exports = router;

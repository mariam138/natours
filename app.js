const express = require("express");
const morgan = require("morgan");

// Router imports
const tourRouter = require("./routes/tourRoutes");
const userRouter = require("./routes/userRoutes");

const app = express();

//////////////////////////////////////////////////////////////////////////////// MIDDLEWARE

// 3rd party middleware
// Logging to the console using 'dev' format only in dev mode
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// These middleware apply to every single request
app.use(express.json());

// Middleware for serving static files
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  console.log("Hello from the middleware");
  next();
});

// Manipulate the request object
// Adding the request time to the request object using middleware
// NOTE: requestTime is not part of the request object, it is a property we are adding on ourselves
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

//////////////////////////////////////////////////////////////////////////////// ROUTES
// app.get("/api/v1/tours", getAllTours);
// app.get("/api/v1/tours/:id", getTour);
// app.post("/api/v1/tours", createTour);
// app.patch("/api/v1/tours/:id", updateTour);
// app.delete("/api/v1/tours/:id", deleteTour);

// Mounting a new router onto a route
// Has the base url, the below route url's are then added onto this route url
// Created a sub-app for each resource
app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);

module.exports = app;

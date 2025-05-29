const fs = require("fs");
const express = require("express");
const morgan = require("morgan");

const app = express();

//////////////////////////////////////////////////////////////////////////////// MIDDLEWARE

// 3rd party middleware
// Logging to the console using 'dev' format
app.use(morgan("dev"));

// These middleware apply to every single request
app.use(express.json());

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

//////////////////////////////////////////////////////////////////////////////// ROUTE HANDLERS

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

const getAllTours = (req, res) => {
  console.log(req.requestTime);

  res.status(200).json({
    // Format data in JSend data specification
    status: "success",
    requestedAt: req.requestTime,
    results: tours.length,
    data: {
      // If key-value pairs have same name, it doesn't need to be declared twice
      tours,
    },
  });
};

const getTour = (req, res) => {
  // automatically converts string to a number if the string looks like a number
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);

  // if (id > tours.length)
  if (!tour) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid ID",
    });
  }

  res.status(200).json({
    status: "success",
    data: {
      tour,
    },
  });
};

const createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: "success",
        data: {
          tour: newTour,
        },
      });
    }
  );
};

const updateTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid ID",
    });
  }

  res.status(200).json({
    status: "success",
    data: {
      tour: "<Updated tour here...>",
    },
  });
};

const deleteTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid ID",
    });
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
};

const getAllUsers = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not yet defined",
  });
};

const getUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not yet defined",
  });
};

const createUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not yet defined",
  });
};

const updateUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not yet defined",
  });
};

const deleteUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not yet defined",
  });
};

//////////////////////////////////////////////////////////////////////////////// ROUTES

// Middleware for the tour router
const tourRouter = express.Router();

// Middleware for user router
const userRouter = express.Router();

// app.get("/api/v1/tours", getAllTours);
// app.get("/api/v1/tours/:id", getTour);
// app.post("/api/v1/tours", createTour);
// app.patch("/api/v1/tours/:id", updateTour);
// app.delete("/api/v1/tours/:id", deleteTour);

// Tour routes
// Chain on the methods that use the same URL
tourRouter.route("/").get(getAllTours).post(createTour);
tourRouter.route("/:id").get(getTour).patch(updateTour).delete(deleteTour);

// User routes
userRouter.route("/").get(getAllUsers).post(createUser);
userRouter.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);

// Mounting a new router onto a route
// Has the base url, the below route url's are then added onto this route url
// Created a sub-app for each resource
app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);

//////////////////////////////////////////////////////////////////////////////// START SERVER

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

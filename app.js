const fs = require("fs");
const express = require("express");
const app = express();

//////////////////////////////////////////////////////////////////////////////// MIDDLEWARE
app.use(express.json());

// // Getting the root URL
// app.get("/", (req, res) => {
//   res
//     .status(200)
//     // using json method automatically defines content type as json
//     .json({ message: "Hello from the server side!", app: "Natours" });
// });

// app.post("/", (req, res) => {
//   res.send("You can post to this endpoint...");
// });

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

// callback is called the route handler
//////////////////////////////////////////////////////////////////////////////// GET
app.get("/api/v1/tours", (req, res) => {
  res.status(200).json({
    // Format data in JSend data specification
    status: "success",
    results: tours.length,
    data: {
      // If key-value pairs have same name, it doesn't need to be declared twice
      tours,
    },
  });
});

//////////////////////////////////////////////////////////////////////////////// GET by id
app.get("/api/v1/tours/:id", (req, res) => {
  console.log(req.params);
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
});

//////////////////////////////////////////////////////////////////////////////// POST
app.post("/api/v1/tours", (req, res) => {
  // console.log(req.body);

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
});

//////////////////////////////////////////////////////////////////////////////// PATCH
app.patch("/api/v1/tours/:id", (req, res) => {
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
});

//////////////////////////////////////////////////////////////////////////////// DELETE
app.delete("/api/v1/tours/:id", (req, res) => {
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
});

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

const fs = require("fs");
const express = require("express");
const app = express();

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
app.get("/api/v1/tours", (req, res) => {
  res.status(200).json({
    // Format data in JSend data specification
    status: "success",
    data: {
      // If key-value pairs have same name, it doesn't need to be declared twice
      tours,
    },
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

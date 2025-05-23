const express = require("express");

const app = express();

// Getting the root URL
app.get("/", (req, res) => {
  res
    .status(200)
    // using json method automatically defines content type as json
    .json({ message: "Hello from the server side!", app: "Natours" });
});

app.post("/", (req, res) => {
  res.send("You can post to this endpoint...");
});

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

const mongoose = require("mongoose");
const dotenv = require("dotenv");
// Reads variables in config.env and add them to node environment variables
dotenv.config({ path: "./config.env" });

const app = require("./app");

// Mongoose Driver Setup
const DB = process.env.DATABASE.replace(
  "<db_password>",
  process.env.DATABASE_PASSWORD,
);

mongoose.connect(DB).then(() => console.log("DB connection successful"));

// schema is created as on object, and mongoose uses native JS datatypes to describe each field
// schema type options inside name objects to add more information
const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    // Comment is for error catching. if the tour has no name, this message will appear
    required: [true, "A tour must have a name"],
    unique: true,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  price: {
    type: Number,
    required: [, "A tour must have a price"],
  },
});

// Create model from tour schema, named with capital (like in django), then define which schema is to be used
const Tour = mongoose.model("Tour", tourSchema);

// Creating a document using the Tour model
const testTour = new Tour({
  name: "The Forest Hiker",
  rating: 4.7,
  price: 497,
});
// saves document to database which returns a promise to be consumed
testTour
  .save()
  .then((doc) => {
    console.log(doc);
  })
  .catch((err) => {
    console.log("ERROR!:", err);
  });

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

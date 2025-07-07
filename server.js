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

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindandModify: false,
  })
  .then((con) => {
    console.log(con.connections);
    console.log("DB connection successful");
  });

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

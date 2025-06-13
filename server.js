const dotenv = require("dotenv");
// Reads variables in config.env and add them to node environment variables
dotenv.config({ path: "./config.env" });

const app = require("./app");

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

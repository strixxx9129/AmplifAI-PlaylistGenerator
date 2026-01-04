const path = require("path");
const mongoose = require("mongoose");

require("dotenv").config({
  path: path.resolve("config/.env"),
});

const getRoutes = require("./routes/getRoutes");
const postRoutes = require("./routes/postRoutes");
const app = require("./config/init");

getRoutes();
postRoutes();

const PORT = process.env.PORT || 8000;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

module.exports = app;

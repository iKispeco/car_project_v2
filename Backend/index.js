require("dotenv").config();
const express = require("express");
const routes = require("./routes/api");
const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://tester:Tester2803@raptor.dqmbqba.mongodb.net/carVendor",
    { useNewUrlParser: true }
  )
  .then(() => {
    const app = express();

    // CORS policy
    app.use((req, res, next) => {
      res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
      res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, PATCH"
      );
      res.setHeader("Access-Control-Allow-Headers", "Content-Type");
      next();
    });

    app.use(express.json());

    // initialize routes
    app.use(routes);

    app.listen(process.env.PORT, () => {
      console.log("Server je startao na portu 8000...");
    });
  })
  .catch(() => {
    console.log("DB connection failed");
  });

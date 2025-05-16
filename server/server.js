const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const expenseRoutes = require("./routes/expenseRoutes");

require("dotenv").config();

const app = express();

//middelware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// //error handler middleware
// app.use(errorHandler);

//root route
app.get("/", (req, res) => res.send("Expenses API working!"));

// auth api routes
app.use("/api/expenses", expenseRoutes);

// Serve static files from the React frontend app
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "client/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

//connect to mongodb
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully!");
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () =>
      console.log(`Example app listening on port ${PORT}!`)
    );
  })
  .catch((err) => {
    console.log("MongoDB connection failed!", err.message);
    process.exit(1);
  });

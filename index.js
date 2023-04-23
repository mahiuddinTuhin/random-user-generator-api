const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/v1/users.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1/users", userRoutes);

app.get("/", (req, res) => {
  res.send("Home page");
});

app.get("*", (req, res) => {
  res.send("No route found");
});

app.listen(5001, () => {
  console.log("server is running on port: 5001");
});

const express = require("express");
const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.send("Hello employees!");
});

app.use("/employees", require("./api/employees"));

app.use((req, res, next) => {
  next({ status: 404, message: "Sorry, this doesn't exist." });
});

app.listen(PORT, () => {
  `Listening on port ${PORT}...`;
});

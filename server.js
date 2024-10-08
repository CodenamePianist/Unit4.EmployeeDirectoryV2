const express = require("express");
const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.send("Hello employees!");
});

const employees = require("./employees");

app.get("/employees", (req, res) => {
  res.json(employees);
});

app.get("/employees/random", (req, res) => {
  const i = Math.floor(Math.random() * employees.length);
  res.json(employees[i]);
});

app.get("/employees/:id", (req, res, next) => {
  const { id } = req.params;
  const employee = employees.find((e) => e.id === +id);
  if (employee) {
    res.json(employee);
  } else {
    next({ status: 404, message: `There is no employee with id ${id}.` });
  }
});

app.use((req, res, next) => {
  next({ status: 404, message: "Sorry, this doesn't exist." });
});

app.listen(PORT, () => {
  `Listening on port ${PORT}...`;
});

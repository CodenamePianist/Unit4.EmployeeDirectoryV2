// This employees.js file will be the ROUTER file.

const express = require("express");
const router = express.Router();
module.exports = router;

const employees = require("../employees");

router.get("/", (req, res) => {
  res.json(employees);
});

router.get("/random", (req, res) => {
  const i = Math.floor(Math.random() * employees.length);
  res.json(employees[i]);
});

router.get("/:id", (req, res, next) => {
  const { id } = req.params;
  const employee = employees.find((e) => e.id === +id);
  if (employee) {
    res.json(employee);
  } else {
    res.status(404).send(`There is no employee with id ${id}.`);
  }
});

router.post("/", (req, res, next) => {
  const { name } = req.body;
  if (name) {
    const newEmployee = { id: employees.length + 1, name };
    employees.push(newEmployee);
    res.status(201).json(newEmployee);
  } else {
    next({ status: 400, message: "New employee must have a name." });
  }
});

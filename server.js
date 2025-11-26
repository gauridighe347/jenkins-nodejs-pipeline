const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello from Node.js + Docker + Kubernetes + Jenkins CI/CD!");
});

module.exports = app; 
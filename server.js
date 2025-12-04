const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello from Node.js + Jenkins CI/CD!");
});

module.exports = app; 

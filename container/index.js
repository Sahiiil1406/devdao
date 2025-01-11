const express = require("express");
const runner = require("./runner");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/invoke",runner)

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});

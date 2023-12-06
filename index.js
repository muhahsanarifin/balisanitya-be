require("dotenv").config();

const express = require("express");
const cors = require("cors");

const mainRouter = require("./src/routes/main");

const server = express();

const port = process.env.PORT || 3001;

server.use(cors());

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use(mainRouter);

server.listen(port, () => {
  console.log(`Server listening on port ${port}.`);
});

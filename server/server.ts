import { app } from "./app";
import http from "http";
import connectDB from "./utils/db";
require("dotenv").config();

const server = http.createServer(app);

// create server
server.listen(process.env.PORT, () => {
  console.log(`server is connected with port ${process.env.PORT}`);
  connectDB();
});

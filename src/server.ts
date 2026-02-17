import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import db = require("./config/db.js");
 
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await db.connectDB();

  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
};

startServer();

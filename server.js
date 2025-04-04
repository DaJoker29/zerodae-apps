import express from "express";
import cors from "cors";
import helmet from "helmet";
import bodyParser from "body-parser";

import weatherAPI from "./apps/weather/routes.mjs";

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "localhost";
const DB_URL = process.env.MONGO_URI;

app.disable("x-powered-by");

app.use(cors());
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));

// Import Routes Here

app.use("/weather/api", weatherAPI);

app.listen(PORT, () => {
  console.group("\nStarting ZeroDae Apps Server...\n");
  console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
  console.log(`Hostname (Default: localhost): ${HOST}`);
  console.log(`Port (Default: 3000): ${PORT}`);
  console.log(`Database: ${DB_URL}`);
  console.log("\nLISTENING...\n");
  console.groupEnd();
});

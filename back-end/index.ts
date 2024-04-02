import express, { Express, Request, Response, Application } from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import morganMiddleware from "./src/configs/morganMiddleware";
import helmet from "helmet";
import compression from "compression";
import { json } from "body-parser";
import testConnection from "./src/database/portgres/connect.portgres";
import userRouter from "./src/router/user.router/User.router";
import appRouter from "./src/router/index.router";
import { connectDB } from "./src/database/mongodb/connect.mongo";

// * innitialization
const app: Application = express();
const PORT = process.env.PORT || 5000;
const api_version = process.env.API_VERSION || "/api/v1";

// * middleware
app.use(morganMiddleware);
app.use(helmet());
app.use(compression());
app.use(json());
app.use(express.urlencoded({ extended: true })); // support encoded bodies

// * connect to db

connectDB();

// * api version
app.use(api_version, appRouter);
// * server running
const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

process.on("unhandledRejection", (error, promise) => {
    console.log(`Logged Error: ${error}`);
    server.close(() => process.exit(1));
});

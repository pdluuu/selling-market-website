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
import authRouter from "./src/router/auth/auth.route";
import { connectDB } from "./src/database/mongodb/connect.mongo";
import productRouter from "./src/router/product.router/product.router";
//For env File
dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5000;

// * middleware
app.use(morganMiddleware);
app.use(helmet());
app.use(compression());
app.use(json());

connectDB();

//connect to db
app.use(userRouter);
app.use('/auth', authRouter);
app.use('/product',productRouter)



const api_version = process.env.API_VERSION || '/api/v1';


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

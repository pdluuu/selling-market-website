import express, { Express, Request, Response, Application } from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import morganMiddleware from './src/configs/morganMiddleware';
import helmet from 'helmet';
import compression from 'compression';
import { json } from 'body-parser';
import userRouter from './src/router/User.router';
import { connectDB } from './src/database/mongodb/connect.mongo';
import productRouter from './src/router/Product.router';
//For env File
dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5000;
var cookieParser = require('cookie-parser');
// * middleware
app.use(cookieParser());
app.use(morganMiddleware);
app.use(helmet());
app.use(compression());
app.use(json());
//connect to db
app.use(userRouter);
app.use(productRouter);

connectDB();
// * router
const api_version = process.env.API_VERSION || "/api/v1";

// * handle Error
// testConnection();
// * server running
const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

process.on("unhandledRejection", (error, promise) => {
    console.log(`Logged Error: ${error}`);
    server.close(() => process.exit(1));
});

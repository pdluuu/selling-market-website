import { Response, Request, NextFunction } from "express";

import jwt from "jsonwebtoken";
import { IToken, JwtPayLoad } from "../utils/auth.interface";
import { config } from "dotenv";
import Logger from "../lib/logger";
import UserModel from "../models/User.model";
config();

export function authenticateToken(
    req: Request<any, any, any>,
    res: Response,
    next: NextFunction
) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null)
        return res.status(401).json({
            message: "Un-verified",
        });
    console.log("Token: " + token);

    jwt.verify(
        token,
        // process.env.ACCESS_TOKEN_SECRET || "",
        "kkk",
        (err: any, payload: JwtPayLoad | any) => {
            if (err) {
                console.log(err);
                return res.status(403).json({
                    message: "Un-verified",
                });
            }

            req.user = payload;
            req.body.userId = payload._id;
            // console.log(req.user);
            next();
        }
    );
}
export async function isAdmin(
    req: Request<any, any, any>,
    res: Response,
    next: NextFunction
) {
    try {
        const {userId} = req.body;
        console.log(userId);
        const user = await UserModel.findById(userId); 
        if(!user){
            return res.status(401).json({
                success: false,
                mes: ' user null'
            });
        }
        // console.log(userId, user.role);
        if (!user || user.role !== 'admin') 
            return res.status(401).json({
                success: false,
                mes: ' REQUIRE ADMIN ROLE'
            });

        next();
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({
            success: false,
            mes: 'Internal server error'
        });
    }
}




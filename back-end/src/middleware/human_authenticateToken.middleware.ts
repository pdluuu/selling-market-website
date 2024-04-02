import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import UserModel from '../models/User.model';

function human_authenticateToken(req: any, res: any, next: any) {
    try {
        var token = req.cookies.token;
        var ketqua = jwt.verify(token, "xxx");
        UserModel.findOne({
            _id: ketqua
        }).then(data=>{
            if(data !== null && (data.role === "admin" || data.role === "staff")){
                next()
            }else{
                res.json("not permission")
            }
        })
        
    } catch (error) {
        return res.redirect("value");
    }
}

module.exports = human_authenticateToken;
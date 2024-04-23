import exp from "constants";

export interface ISignUp {
    email: string;
    password: string;
    username: string;
}
export interface ISignIn {
    email: string;
    password: string;
}
export interface ISignUp {
    email: string;
    password: string;
    username: string;
}

export interface ISuccessRes {
    message: "successful";
    data: any;
}

export interface IFailRes {
    message: string;
}

export interface IToken {
    userId: string;
    refreshToken: string;
}

export interface ITokenWithRole{
    userId: string;
    role: string;
    refreshToken: string;
}

export interface JwtPayLoad {
    userId: string;
    email: string;
}

export interface IForgotPassEmail {
    email: string;
}

export interface IVertifyUser {
    email: string;
    code: string;
}

export interface IResetPass {
    email: string;
    resetCode: string;
    password: string;
}

export interface IResultResetPass {
    message: "Successful";
    data: any;
}

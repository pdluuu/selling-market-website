import { Router } from "express";
import passport from "../../lib/passport";
const CLIENT_URL = "http://localhost:3000/";
const router = Router();

router.get("/login/success", (req, res) => {
    if (req.user) {
        res.status(200).json({
            success: true,
            message: "successful",
            data: req.user,
            //cookies: req.cookies,
        });
    }
});

router.get("/login/failed", (req, res) => {
    res.status(401).json({
        success: false,
        message: "failure",
    });
});

router.get("/logout", (req: any, res) => {
    req.logout();
    res.redirect(CLIENT_URL);
});

router.get(
    "/google",
    passport.authenticate("google", { scope: ["email", "profile"] })
);

router.get(
    "/google/callback",
    passport.authenticate("google", {
        session: true,
    }),
    (_, res) => {
        res.redirect(CLIENT_URL);
    }
);

export default router;

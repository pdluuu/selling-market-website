import passport, { Profile } from "passport";
import jwt from "jsonwebtoken";

import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import auhtService from "../services/auth.service";

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.CLIENT_ID as string,
            clientSecret: process.env.CLIENT_SECRET as string,
            callbackURL: process.env.GOOGLE_CALLBACK_URL as string,
        },
        async function (
            accessToken: any,
            refreshToken: any,
            profile: Profile,
            done: any
        ) {
            const email = profile.emails?.shift()?.value;
            const name = profile.name?.givenName;
            const image = profile.photos?.shift()?.value;
            if (email && name && image) {
                const user = await auhtService.authGoogle(email, name, image);

                const payload = {
                    _id: user._id,
                    email: user.email,
                };

                // * accesstoken la dang ma hoa cua { id, email } can co khoa

                const accessToken = jwt.sign(
                    payload,
                    process.env.ACCESS_TOKEN_SECRET || "",
                    { expiresIn: process.env.EXPIRES_TOKEN_TIME }
                );

                const refreshToken = jwt.sign(
                    payload,
                    process.env.REFRESH_TOKEN_SECRET || ""
                );

                await auhtService.addTokens(refreshToken, user._id);

                done(null, {
                    accessToken,
                    refreshToken,
                });
            }

            done(null, profile);
        }
    )
);

passport.serializeUser((user: any, done) => {
    done(null, user);
});

passport.deserializeUser((user: any, done) => {
    done(null, user);
});

export default passport;

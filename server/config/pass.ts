import passportJWT, { ExtractJwt } from "passport-jwt";
import passportLocal from "passport-local";
import User from "../models/User";
import passport from "passport";
import { UserObj } from "../interfaces";

// const JwtStrategy = passportJWT.Strategy;
const LocalStrategy = passportLocal.Strategy;

var opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
};

// passport.use(
//     new JwtStrategy(opts, function (jwt_payload, done) {
//         User.findOne({ _id: jwt_payload.sub })
//             .then((data) => {
//                 console.log("JWT Strategy: ", jwt_payload.sub, data);
//                 if (!data) return done(null, false);
//                 return done(null, true);
//             })
//             .catch((err) => {
//                 console.log("JWT Strategy", err);
//                 done(null, false);
//             });
//     })
// );

passport.use(
    new LocalStrategy(
        { usernameField: "email", passwordField: "pwd" },
        (email, pwd, done) => {
            User.findOne({
                email: { $regex: new RegExp(`^${email}$`, "i") },
                // Normalize the email in DB
                pwd,
            }, "-pwd")
                .then((data: UserObj | any) => {
                    console.log("data", data);
                    if (!data) {
                        console.log("PSS: User not found", data, email, pwd);
                        done(null, false);
                        return;
                    }
                    console.log("PSS: User found");
                    done(null, data);
                })
                .catch((err) => {
                    console.log("Err", err);
                    done(null, false);
                });
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user);
});

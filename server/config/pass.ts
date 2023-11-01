import passportJWT, { ExtractJwt } from "passport-jwt";
import passportLocal from "passport-local";
import User from "../models/User";
import passport from "passport";

const JwtStrategy = passportJWT.Strategy;
const LocalStrategy = passportLocal.Strategy;

var opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
};

passport.use(
    new JwtStrategy(opts, function (jwt_payload, done) {
        User.findOne({ _id: jwt_payload.sub })
            .then((data) => {
                console.log("JWT Strategy: ", jwt_payload.sub, data)
                if (!data) return done(null, false);
                return done(null, true);
            })
            .catch((err) => {
                console.log("JWT Strategy", err)
                done(null, false);
            });
    })
);

passport.use(
    new LocalStrategy(
        { usernameField: "email", passwordField: "pwd" },
        (email, pwd, done) => {
            User.findOne({ email, pwd })
                .then((data) => {
                    if (!data) {
                        done(null, false);
                        return;
                    }
                    done(null, data);
                })
                .catch((err) => {
                    console.log(err);
                    done(null, false);
                });
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user);
});

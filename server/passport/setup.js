const bcrypt = require("bcryptjs");
const Roommate = require("../models/Roommates");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    Roommate.findById(id, (err, user) => {
        done(err, user);
    });
});

passport.use(new LocalStrategy( (name, password, done) => {
    Roommate.findOne({name: name})
        .then(roommate => {
            if(!roommate) {
                //create new roommate
                const newRoommate = new Roommate({name, password});
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newRoommate.password, salt, (err, hash) => {
                        if (err) throw err;
                        newRoommate.password = hash;
                        newRoommate
                            .save()
                            .then(roommate => {
                                return done(null, roommate);
                            })
                            .catch(err => {
                                return done(null, false, {message: err});
                            })
                    })
                })
            }
            else {
                bcrypt.compare(password, roommate.password, (err, isMatch) => {
                    if (err) throw err;
                    if (isMatch) {
                        return done(null, roommate);
                    }
                    else {
                        return done(null, false, {message: "Wrong password"});
                    }
                });
            }
            
        })
        .catch(err => {
            return done(null, false, {message: err});
        });
    })
);

module.exports = passport;
const express = require("express");
const router = express.Router();
const passport = require("passport");
const Roommate = require("../models/Roommates");

router.post("/register_login", (req, res, next) => {
    var absurd = req.body;
    console.log(absurd.tags);
    //console.log(req.body);
    passport.authenticate("local", function(err, user, info) {
        if (err) {
            return res.status(400).json({errors: err});
        }
        if (!user) {
            return res.status(400).json({errors: "No user found"});
        }
        req.logIn(user, function(err) {
            if (err) {
                return res.status(400).json({errors: err});
            }
            const newRoommate = user;
            newRoommate.room = absurd.room;
            newRoommate.tags = absurd.tags;
            newRoommate.save();
            
            return res.status(200).json({success: `logged in ${user.id}`});
        });
    })(req, res, next);
});

module.exports = router;
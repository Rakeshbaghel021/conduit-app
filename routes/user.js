var express = require("express");
var auth = require("../middleware/auth");
var User = require("../models/user");
var router = express.Router();

router.use(auth.validToken);

// get a single user

router.get("/",(req,res,next)=>{
    User.findById(req.user.userId,(err,user)=>{
        if(err) return next(err);
        res.json({user})
    })
})


router.put("/",(req,res,next)=>{
    User.findByIdAndUpdate(req.user.userId,req.body, {new:true},(err,user)=>{
        if(err) return next(err);
        res.json({user});
    })
})

module.exports = router;
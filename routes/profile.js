var express = require("express");
var User = require("../models/user");
var auth = require("../middleware/auth");
var router = express.Router();

router.use(auth.validToken);


// to get single profile

router.get("/:username" , (req,res)=>{
    User.findOne({username :req.params.username},(err,user)=>{
        if(err) return res.json({err});
        res.json({user});
    })
})


//follow user


router.post("/:username/follow",(req,res)=>{
    var username=req.params.username;
    User.findOne({username},(err,user)=>{
        if(err) return res.json({err});
        if(!user.followers.includes(username)){
            User.findOneAndUpdate({username},{$push : {followers : req.user.username}},(err,followinguser)=>{
                if(err) return res.json({err});
                User.findOneAndUpdate(req.user.userId,{$push : {following:followinguser.username}},(err,currentuser)=>{
                    if(err) return res.json({err});
                    res.json({currentuser,followinguser});
                })
            })
        }

    })
})

// unfollow user

router.post("/:username/follow",(req,res)=>{
    var username=req.params.username;
    User.findOne({username},(err,user)=>{
        if(err) return res.json({err});
        if(!user.followers.includes(username)){
            User.findOneAndUpdate({username},{$pull : {followers : req.user.username}},(err,followinguser)=>{
                if(err) return res.json({err});
                User.findOneAndUpdate(req.user.userId,{$pull : {following:followinguser.username}},(err,currentuser)=>{
                    if(err) return res.json({err});
                    res.json({currentuser,followinguser});
                })
            })
        }

    })
})

module.exports = router;
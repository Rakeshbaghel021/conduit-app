var express = require('express');
var router = express.Router();
var User = require('../models/user');
var jwt = require('jsonwebtoken');
const auth = require("../middleware/auth");
const logged = auth.validToken;

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });


// registration

router.post('/',(req,res , next)=>{
  User.create(req.body ,(err, createdUser)=>{
    if(err) return next(err);
    res.json({success:true,msg:"register successfully"});
  });
});

// to get list of all users

router.get('/', (req,res,next)=>{
  User.find({}, (err,UserList)=>{
    if(err) return next(err);
    res.json(UserList);

  })
})

// to get single user

router.get('/:id',(req, res, next)=>{
  User.findById(req.params.id , req.body,(err, SingleUser)=>{
    if(err) return next(err);
    res.json(SingleUser);
  })
})

//login

router.post('/login',(req, res)=>{
  User.findOne({email:req.body.email},(err, user)=>{
    if(err) return next(err);
    if(!user) res.json({success:false,msg:"invalid email"});
    if(!user.matchPassword(req.body.password)){
      res.send("wrong password");
    }
    jwt.sign({userId:user._id, email:user.email},"jaishreeram",(err,token)=>{
      if(err) return res.json({success: false, msg:"token not generated"});
      res.json({ token});
    })
  });
});




module.exports = router;

const jwt = require('jsonwebtoken');

exports.validToken = (req, res ,next)=>{
    var token = req.headers.authorization;

    if(token){
        jwt.verify(token, "jaishreeram",(err, payload)=>{
            if(err) return res.status(500).json({
                err,
                success:false,
                message:"something went wrong"
            })
            req.user = payload;
            var user = req.user;
            console.log(user);
            next();
        })
    }else{
        res.status(401).json({
            success:false,
            msg:"token not found"
        })
    }
}
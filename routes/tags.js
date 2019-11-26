var express = require('express');
var Tag = require('../models/tag');
var router = express.Router();


router.get("/", (req,res)=> {
    Tag.find({}).populate({path :"articleId"}).exec((err,tags)=>{
        console.log(tags);
        if(err) return res.json({success:false,err});
        if(!tags) return res.json({success:false,msg :"no tag found"})
        return res.json({tags})
    })
})

module.exports = router;
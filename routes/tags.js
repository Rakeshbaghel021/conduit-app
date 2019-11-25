var express = require('express');
var Tag = require('../models/tag');
var router = express.Router();


router.get("/", (req,res) => {
    Tag.find({}, (err, tags) => {
        if(err) return res.json({err});
        return res.json({tags});
    })
})

module.exports = router;
const express = require("express");
const Article = require("../models/article");
const router = express.Router();
const auth = require("../middleware/auth");
const Comment = require("../models/comment");


// create article

router.post("/", (req,res,next)=>{
    Article.create(req.body,(err ,CreatedArticle)=>{
        if(err) return next(err);
        if(!CreatedArticle)
        return res.json({
            success : false,
            msg: "article is not created"
        });
        res.json(CreatedArticle);

    });
});

// to get all articles list

router.get("/",(req,res,next)=>{
    Article.find({},(err,ArticleList)=>{
        if(err) return next(err)
        res.json(ArticleList);
    })

})

// to get single article

router.get("/:slug",(req,res,next)=>{
    var slug = req.params.slug;
    Article.findOne({slug},req.body,(err,singleArticle)=>{
        if(err) return next(err);
        res.json(singleArticle);
    })
})

// to update article

router.put("/:slug",(req, res, next)=>{
    var slug = req.params.slug;
    Article.findOneAndUpdate({slug}, req.body,(err, updatedArticle)=>{
        if(err) return next(err);
        res.json(updatedArticle);
    })
})

// to delete article

router.delete("/:slug",(req, res, next)=>{
    var slug = req.params.slug;
    Article.findOneAndDelete({slug},(err,article)=>{
        if(err) return next(err);
        res.json({
            success:true,
            msg: "deleted successfully"
        });
        next();
    })
})
  

// post comments
router.post("/:slug/comments", (req, res, next) => {
    Comment.create(req.body, (err, comment) => {
      if (err) return next(err);
      if (!comment) return res.json({
          success:false, 
          message:"no comment !"});
      res.json(comment);
    });
  });
  
  // get comments
  router.get("/:slug/comments", (req, res, next) => {
    Comment.find({}, (err, comments) => {
      if (err) return next(err);
      if (!comments)
        return res.json({
          success: false,
          message: "no comments found!"
        });
      res.json({ comments });
    });
  });
  
  // get comment
  router.get("/:slug/comments/:id", (req, res, next) => {
    let id = req.params.id;
    Comment.findById(id, (err, comment) => {
      if (err) return next(err);
      if (!comment)
        return res.json({ 
            success: false,
             message: "commentId not found!"
           });
      res.json(comment);
    });
  });
  
  // update comment
  router.put("/:slug/comments/:id", (req, res, next) => {
    let id = req.params.id;
    Comment.findByIdAndUpdate(id, req.body, (err, comment) => {
      if (err) return next(err);
      if (!comment)
        return res.json({
          success: false,
          message: "no comments to update!"
        });
      res.json(comment);
    });
  });
  
  // delete comment
  router.delete("/:slug/comments/:id", (req, res, next) => {
    let id = req.params.id;
    Comment.findByIdAndDelete(id, (err, comment) => {
      if (err) return next(err);
      if (!comment)
        return res.json({
          success: false,
          message: "no comments to Delete!"
        });
      res.json({
        succes: true,
        message: "comment deleted succesfully"
      });
    });
  });
  
  
router.use(auth.validToken);

module.exports = router;
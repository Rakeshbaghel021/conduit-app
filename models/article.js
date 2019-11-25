var mongoose = require('mongoose');
var slug = require('slug');

var Schema = mongoose.Schema;
var articleSchema = new Schema({
    title:{
        type: String,
        required:true
    },
    description:{
        type: String,
        required:true
    },
    slug:{
        type:String
    },
    body:{
        type:String
    },
    tags:[{
        type: String
    }],
    favorite:{
        type:Boolean
    },
    favoriteCount:{
        type:Number,
        default:0
    },
    author:{
        type:Schema.Types.ObjectId,
        ref: "User"
    },
    comment: {
        type: Schema.Types.ObjectId,
        ref: "Comment"
      },
    favorites: {
        type: [Schema.Types.ObjectId],
        ref: "User"
    }

},{timestamps:true})

articleSchema.pre("save", function(next){
    if(this.title && this.isModified('title')){
        var slugged = slug(this.title,{lower:true})
        this.slug = slugged;
        next();}
        else{
            next();
        }
    
})

module.exports = mongoose.model("Article", articleSchema);
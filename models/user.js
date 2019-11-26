var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var Schema = mongoose.Schema;
 var userSchema = new Schema({
     username : {
         type : String,

         unique : true
     },
     email : {
         type : String,
         required : true,
         unique : true,
         match : /@/
     },
     password : {
         type : String,
         required:true
     },
     bio:{
         type:String
     },
     image:{
         type : String
     },
     following :{
         type: [String]
     },
     followers:{
         type:[String]
     },
     favorited:{
         type:[Schema.Types.ObjectId],
         ref:"Article"
     },
     article :{
         type : Schema.Types.ObjectId,
         ref :'Article'
     },
     comments :{
         type :Schema.Types.ObjectId,
         ref : 'Comment'
     }



 },
 {  timestamps : true

 })

userSchema.pre('save', function(next){
    this.password = bcrypt.hashSync(this.password , 15);
    console.log(this);
    next();
})

userSchema.methods.matchPassword = function(plainPassword){
    return bcrypt.compareSync(plainPassword , this.password);
}


 module.exports = mongoose.model("User", userSchema);
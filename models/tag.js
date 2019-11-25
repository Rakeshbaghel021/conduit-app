var mongoose = require('mongoose');
var Schema  = mongoose.Schema;

var tagSchema = new Schema ({
    articleId: [{
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Article'
    }],
    tagName: {
        type: String
    }
})


module.exports = mongoose.model("Tag", tagSchema);
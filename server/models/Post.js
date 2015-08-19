var mongoose = require('mongoose');
var options = { autoIndex: false };

var PostSchema = mongoose.Schema({
    _id: {
        type: String,
        required: true,
        index: {
            unique: true
        }
    },

    dislikeCount: Number,

    dislikes: Array

}, options);

module.exports = mongoose.model('Post', PostSchema);

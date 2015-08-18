var mongoose = require('mongoose');
var uri = require('./credentials').uri;
var db;

module.exports = {
    connect: function(callback) {
        mongoose.connect(uri);

        db = mongoose.connection;
        db.on('error', function(error) {
            callback.error(error);
        });

        db.once('open', function(cb) {
            callback.success();
        });
    },

    dislike: function(postId, user) {
        var options = { autoIndex: false };

        var Schema = mongoose.Schema({
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

        var Post = mongoose.model('Post', Schema);

        var dislike = new Post({ _id: postId, dislikeCount: 0 });

        // Post isn't in the db, save it
        dislike.save(function(error) {
            if(!error) {
                // success
                console.log("success");
            }
            else {
                // error
                console.log(error);
            }
        });
    }
};

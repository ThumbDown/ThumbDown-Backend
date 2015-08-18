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
        var schema = mongoose.Schema({ postId: String, dislikeCount: Number, dislikes: Array });
        var Post = mongoose.model('Post', schema);

//      console.log(db.find({ _id: "postId" }, { _id: postId }));

        var dislike = new Post({ postId: "0", dislikeCount: 0 });
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

var mongoose = require('mongoose');
var Post = require('../models/Post');
var uri = require('../config/credentials').uri;
var db;

function appendDislike(post, user) {
    // Only push if it is not in there
    if(post.dislikes.indexOf(user) != -1) {
        return;
    }

    // Update the dislikes for this post
    post.dislikes.push(user);

    // Execute the update replacing the dislikes
    post.update({
        dislikeCount: ++post.dislikeCount,
        dislikes: post.dislikes
    }).exec();
}

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

    dislike: function(postId, user, callback) {
        // Create a new post
        var dislikedPost = new Post({ _id: postId, dislikeCount: 0 });

        // Post isn't in the db, save it
        dislikedPost.save(function(error) {
            if(!error) {
                // success
                appendDislike(dislikedPost, user);
                callback.success();
            }
            else {
                // error, assume that post exists
                Post.findById(postId, function(err, existingPost) {
                    if(existingPost == null) {
                        /* We assumed that the post exists because there was an _id conflict in the db,
                        it ended up not existing already */
                        callback.error("Post doesn't exist");
                        return;
                    }

                    // Append this user to the dislikes
                    appendDislike(existingPost, user);

                    callback.success();
                });
            }
        });
    }
};

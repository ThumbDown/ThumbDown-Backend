var db = require('./dbclient');

module.exports.dislike = function(req, res) {
    var user = req.body.user;
    var postId = req.body.postId;

    db.connect({
        success: function() {
            console.log("connected to db");

            db.dislike(postId, user, {
                success: function() {
                    res.status(200);
                    res.send({ code: 200, message: "Dislike successful" });
                },

                error: function(error) {
                    res.status(500);
                    res.send({ code: 500, error: "Dislike was unsuccessful" });
                }
            });
        },

        error: function(error) {
            res.status(500);
            res.send({ code: 500, error: error });
        }
    });
};

module.exports.undislike = function(req, res) {
    res.end();
};

var db = require('../controllers/dbclient');

module.exports.dislike = function(req, res) {
    var user = req.body.user;
    var postId = req.body.postId;

    db.dislike(postId, user, {
        success: function() {
            res.status(200);
            res.send({ code: 200, message: "Dislike successful" });
        },

        error: function(error) {
            console.log(error);
            res.status(500);
            res.send({ code: 500, error: "Dislike was unsuccessful" });
        }
    });
};

module.exports.undislike = function(req, res, db) {
    res.end();
};

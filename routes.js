var db = require('./dbclient');

module.exports = function(express) {
    var router = express.Router();

    router.get('/dislike', function(req, res) {
        var user = req.params.user;
        var postId = req.params.postId;

        db.connect({
            success: function() {
                console.log("success");

                db.dislike("15", "daniel");
            },

            error: function(error) {
                console.log(error);
            }
        });

        res.end();
    });

    router.get('/undislike', function(req, res) {
        res.end();
    });

    return router;
};

var dislikeHandler = require('../handlers/DislikeHandler');

module.exports = function(express, mongodb) {
    var router = express.Router();

    router.post('/dislike', dislikeHandler.dislike);

    router.post('/undislike', dislikeHandler.undislike.bind(null, mongodb));

    return router;
};

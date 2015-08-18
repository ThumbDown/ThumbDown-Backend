var handler = require('./handler');

module.exports = function(express) {
    var router = express.Router();

    router.post('/dislike', handler.dislike);

    router.get('/undislike', handler.undislike);

    return router;
};

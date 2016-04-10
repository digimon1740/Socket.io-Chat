var express = require('express');
var router = express.Router();

var app = require('../app');

router.get('/admission', function (req, res, next) {
	res.sendFile(app.get('views') + '/chat.html');
});

module.exports = router;
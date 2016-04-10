var express = require('express');
var router = express.Router();

var app = require('../app');

router.get('/', function (req, res, next) {
	res.sendFile(app.get('views') + '/index.html');
});

module.exports = router;
var express = require('express');
var router = express.Router();
var burger = require("../models/burger.js");

// Create routes with logic
// Displays all burgers
router.get('/', function (req, res) {
    burger.selectAll(function (data) {
        var hbsObject = {
            burgers: data
        };
        res.render('index', hbsObject);
    });
});

// Allows user to create a new burger yet to be eaten
router.post('/createburger', function (req, res) {
    burger.createBurger(['burger_name', 'devoured'], [req.body.userBurger, 0], function (result) {
        res.redirect('/');
    });
});

// Changes burger to devoured
router.post('/devourBurger/:id', function (req, res) {
    var condition = 'id = ' + req.params.id;
    burger.devourBurger({
        devoured: 1
    }, condition, function (result) {
        // If no user input, throw 404 error
        if (result.changedRows == 0) {
            return res.status(404).end();
        } else {
            res.redirect('/');
        }
    });
});

module.exports = router;
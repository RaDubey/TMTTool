var express = require('express');
var router = express.Router();
var dataController = require('./Controllers/show.controller');

router.route('/shows').get(function(req, res){
    dataController.getShows(req, res , function(result){
        res.send(result);
    });
});

router.route('/dates').post(function(req, res){
    dataController.getDates(req, res , function(result){
        res.send(result);
    });
});

router.route('/demos').post(function(req, res){
    dataController.getDemos(req, res , function(result){
        res.send(result);
    });
});

router.route('/categories').post(function(req, res){
    dataController.getCategories(req, res , function(result){
        res.send(result);
    });
});

router.route('/data').post(function(req, res){
    dataController.getData(req, res , function(result){
        res.send(result);
    });
});
module.exports = router;
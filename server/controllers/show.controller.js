var dl = require('../dl/show.dl');

module.exports = {
    getShows : getShows,
    getDates : getDates,
    getDemos : getDemos,
    getCategories : getCategories,
    getData : getData
}

function getShows(req, res, callback){
    dl.getShows(function(data){
        callback(data);
    });
}

function getDates(req, res, callback){
    dl.getDates(req.body ,function(data){
        callback(data);
    });
}

function getDemos(req, res, callback){
    dl.getDemos(req.body ,function(data){
        callback(data);
    });
}

function getCategories(req, res, callback){
    dl.getCategories(req.body ,function(data){
        callback(data);
    });
}

function getData(req, res, callback){
    dl.getData(req.body ,function(data){
        callback(data);
    });
}
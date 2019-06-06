const csvFilePath = './source.csv'
const lineChartCSVFilePath = './lineChartSource.csv';
const csv = require('csvtojson');
const helpers = require('../infrastructure/helpers');

module.exports = {
    getShows: getShows,
    getDates: getDates,
    getDemos: getDemos,
    getCategories: getCategories,
    getData: getData,
    getMOPData: getMOPData
}

function getShows(callback) {
    csv()
        .fromFile(csvFilePath)
        .then((jsonObj) => {
            var data = helpers.getUniqueValues('Show', jsonObj)
            callback(data);
        });
}

function getDates(request, callback) {
    csv()
        .fromFile(csvFilePath)
        .then((jsonObj) => {
            jsonObj = jsonObj.filter(function (item) {
                return item.Show == request.show
            })
            var data = helpers.getUniqueValues('Air_Date', jsonObj)
            callback(data);
        });
}

function getDemos(request, callback) {
    csv()
        .fromFile(csvFilePath)
        .then((jsonObj) => {
            jsonObj = jsonObj.filter(function (item) {
                return item.Show == request.show && item.Air_Date == request.date;
            })
            var data = helpers.getUniqueValues('Demo', jsonObj)
            callback(data);
        });
}

function getCategories(request, callback) {
    csv()
        .fromFile(csvFilePath)
        .then((jsonObj) => {
            jsonObj = jsonObj.filter(function (item) {
                return item.Show == request.show && item.Air_Date == request.date && item.Demo == request.demo;
            })
            var data = helpers.getUniqueValues('Physcogenic_Cat', jsonObj)
            callback(data);
        });
}

function getData(request, callback) {
    csv()
        .fromFile(csvFilePath)
        .then((jsonObj) => {
            console.log(jsonObj);
            jsonObj = jsonObj.filter(function (item) {
                return item.Show == request.show && item.Air_Date == request.date && item.Demo == request.demo &&
                item.Physcogenic_Cat == request.category;
            })
            var subCats = helpers.getUniqueValues('Sub_Cat', jsonObj);
            var distributors = helpers.getUniqueValues('Distributor', jsonObj);
            callback({data: jsonObj, subCats:subCats, distributors: distributors});
        });
}

function getMOPData(request, callback) {
    csv()
        .fromFile(lineChartCSVFilePath)
        .then((jsonObj) => {
            jsonObj = jsonObj.filter(function (item) {
                return item.Show == request.show && item.Air_Date == request.date && item.Demo == request.demo &&
                item.Physcogenic_Cat == request.category && item.Distributor == request.distributor;
            })
            var subCats = helpers.getUniqueValues('Sub_Cat', jsonObj);
            callback({data: jsonObj, subCats:subCats});
        });
}
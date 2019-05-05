module.exports = {
    getUniqueValues: getUniqueValues
}

function getUniqueValues(propertyName, array) {
    var lookup = {};
    var items = array;
    var result = [];
    for (var item, i = 0; item = items[i++];) {
        var name = item[propertyName];

        if (!(name in lookup)) {
            lookup[name] = 1;
            result.push(name);
        }
    }
    return result;
}
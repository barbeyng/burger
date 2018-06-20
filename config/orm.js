var dbConnection = require('../config/connection.js');

// Helper function for SQL by generating ?'s where needed
function printQuestionMarks(num) {
    var arr = [];
    for (var i = 0; i < num; i++) {
        arr.push('?');
    };
    return arr.toString();
};

// Helper function to convert object key/value pairs to SQL syntax
function objToSql(ob) {
    var arr = [];

    // Loop through the keys and push the key/value as a string into arr
    for (var key in ob) {
        var value = ob[key];
        // checks for hidden properties and skips over them
        if (Object.hasOwnProperty.call(ob, key)) {
            // if string has spaces, add quotations
            if (typeof value === 'string' && value.indexOf(' ') >= 0) {
                value = "'" + value + "'";
            };
            arr.push(key + '=' + value);
        };
    };
    return arr.toString();
};

// ORM object with selectAll, insertOne and updateOne functions
var orm = {

    selectAll: function (table, callback) {
        let query = 'SELECT * FROM ' + table;
        dbConnection.query(query, function (err, result) {
            if (err) {
                throw err;
            }
            callback(result);
        });
    },

    insertOne: function (table, cols, vals, callback) {

        let query = 'INSERT INTO ' + table;
        query += ' (';
        query += cols.toString();
        query += ') ';
        query += 'VALUES (';
        query += printQuestionMarks(vals.length);
        query += ') ';

        dbConnection.query(query, vals, function (err, result) {
            if (err) {
                throw err;
            }
            callback(result);
        });
    },

    updateOne: function (table, colVal, condition, callback) {
        var query = 'UPDATE ' + table;

        query += ' SET ';
        query += objToSql(colVal);
        query += ' WHERE ';
        query += condition;

        dbConnection.query(query, function (err, result) {
            if (err) {
                throw err;
            }
            callback(result);
        });
    }
}

module.exports = orm;
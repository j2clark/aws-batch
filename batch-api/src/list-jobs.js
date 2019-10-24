const AWS = require('aws-sdk');
exports.handler = function (event, context, callback) {
    console.log('get executed');
    callback(null, {
        statusCode: '200',
        body: JSON.stringify({}),
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": "true"
        }
    });
}
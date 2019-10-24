process.env.ENVIRONMENT = 'test';

const AWS = require('aws-sdk');
var credentials = new AWS.SharedIniFileCredentials({profile: 'profile-name'});
AWS.config.credentials = credentials;

let f = require('../src/list-jobs');

let event = {
    path: '/',
    httpMethod: 'GET',
    queryStringParameters: {
        paramKey1: 'v1'
    },
    multiValueQueryStringParameters: {
        paramKey1: ['v1']
    },
    pathParameters: null,
    requestContext: {
        accountId: '123abc',
        stage: 'test',
        identity: {
            cognitoIdentityPoolId: null,
            accountId: null,
            cognitoIdentityId: null,
            apiKey: null,
            sourceIp: '127.0.0.1',
            cognitoAuthenticationType: null,
            cognitoAuthenticationProvider: null,
            userArn: null,
            userAgent: 'PostmanRuntime/2.4.5',
            user: null
        },
        resourcePath: '/{proxy+}',
        httpMethod: 'GET',
        apiId: 'xyz890'
    }
};

let context = {

};

let callback = function(err, res) {
    if (err) console.error(err);
    else console.log(JSON.stringify(res));
}

f.handler(event, context, callback);
let lambda = require('../src/batch');

let record = {
    "id": "cdc73f9d-aea9-11e3-9d5a-835b769c0d9c",
    "detail-type": "Scheduled Event",
    "source": "aws.events",
    "account": "{{{account-id}}}",
    "time": "1970-01-01T00:00:00Z",
    "region": "us-east-1",
    "resources": [
        "arn:aws:events:us-east-1:123456789012:rule/ExampleRule"
    ],
    "detail": {
        "source": {
            "name": "userproject",
            "version": "v1"
        },
        "duration": {
            "unit": "MINUTES",
            "amount": 15
        },
        "delay": {
            "seconds": 60
        },
        "batch": {
            "jobDefinition": "sleep60",
            "jobName": "example",
            "jobQueue": "HighPriority"
        }
    }
};

lambda.handler(record, {});
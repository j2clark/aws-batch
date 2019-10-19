let lambda = require('../src/list-s3');

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

/*{
    "jobDefinitionName": "batch-test",
    "jobDefinitionArn": "arn:aws:batch:us-west-1:089600871681:job-definition/batch-test:1",
    "revision": 1,
    "status": "ACTIVE",
    "type": "container",
    "parameters": {},
    "retryStrategy": {
    "attempts": 1
},
    "containerProperties": {
    "image": "089600871681.dkr.ecr.us-west-1.amazonaws.com/batch-test:latest",
        "vcpus": 1,
        "memory": 128,
        "command": [],
        "jobRoleArn": "arn:aws:iam::089600871681:role/aws-batch-101",
        "volumes": [],
        "environment": [],
        "mountPoints": [],
        "ulimits": [],
        "resourceRequirements": []
},
    "timeout": {
    "attemptDurationSeconds": 60
}
}*/

lambda.handler(
    record,
    {},
    function(data,ss) {  //callback function with two arguments
        console.log(data);
    }
);
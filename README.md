# aws-batch
AWS-Batch example using Docker Image and Lambda

## CodePipeline
https://docs.aws.amazon.com/codebuild/latest/userguide/concepts.html#concepts-how-it-works


## Docker Image
###build from project root dir.
`docker build -f build/Dockerfile -t j2clark/aws-batch:latest .`

###Test locally
`docker run --rm j2clark/aws-batch`

###Tag and upload to ECR
#### Tag image with ECR name
`docker tag j2clark/aws-batch:latest 089600871681.dkr.ecr.us-west-1.amazonaws.com/batch-test:latest`
#### Log in to ECR
`aws ecr get-login`
AWS responds with a command to copy and paste
* Note - AWS responds with invalid variable `-e none` at the end. Simply remove
#### Push image to ECR
`docker push 089600871681.dkr.ecr.us-west-1.amazonaws.com/batch-test:latest`


## AWS Batch Job


## Lambda Trigger
tons of trouble getting lambda trigger to work.
IAM batch policy is:
```
{
    "Effect": "Allow",
    "Action": "batch:*",
    "Resource": "*"
}
```

### CodePipeline

java code -> docker deploy
lambda code -> lambda deploy
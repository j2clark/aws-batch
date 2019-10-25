# CloudFormation

This folder contains all the cloudformation templates required for the application,
including a codepipeline template, which coordinates build and release of project

Some of the work here is based off of this: https://aws.amazon.com/blogs/devops/continuous-delivery-of-nested-aws-cloudformation-stacks-using-aws-codepipeline/


I think All of this needs to be in a separate repo, 
unless I can figure out how to trigger the pipeline based on 
code changes only

Deployment Order:

1. Code Build(s)
 - Build and Test Java 
 - Test javascript
 
2. Application Environment:
 - ECR Repository
 - Batch Setup
 - SNS Topics
 - API Gateway (stubbed out, resources)
 
3. Deployment
 - Build and deploy Docker Image
 - Deploy API Gateway Methods
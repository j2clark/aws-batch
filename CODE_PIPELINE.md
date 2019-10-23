# AWS Code Pipeline

# Java/Docker Pipeline

https://docs.aws.amazon.com/lambda/latest/dg/build-pipeline.html

# Deploy Cloudformation

Took me a couple of tries to get this working.
Couple of notes:
    
   1. I had the incorrect Role - I was using `*AdministrationRole`, instead of `*ExecutionRole`
    
   2. After the first failed attempt, I needed to manually delete stack before I could try again.
    This probably has to do with AWS Cloudformation behavior when creating stack for first time
    
    
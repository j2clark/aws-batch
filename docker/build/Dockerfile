# to build docker image:
# docker build -f build/Dockerfile -t j2clark.com/aws-batch:1.0

# tag image for AWS ECR
# docker tag j2clark.com/aws-batch:1.0 089600871681.dkr.ecr.us-west-1.amazonaws.com/batch-test:1.0

# log in to ECR (copy and paste response)
# aws ecr get-login --region $AWS_DEFAULT_REGION --no-include-email

# push image
# docker push 089600871681.dkr.ecr.us-west-1.amazonaws.com/batch-test:1.0
# docker push 089600871681.dkr.ecr.us-west-1.amazonaws.com/batch-test:latest

FROM openjdk:8

MAINTAINER Jamie Clark <j2clark@gmail.com>

LABEL container.base.image="openjdk:8"
LABEL tags="AWS-BATCH"

# Local directory containing source
ENV DOCKYARD_SRC=.
# COntainer directory for all project files
ENV DOCKYARD_HOME=/srv
# Conatiner directory for source files
ENV DOCKYARD_SRVPROJ=/srv/batch
# Home directory
ENV BATCH_HOME=$DOCKYARD_SRVPROJ

#RUN apt-get update && \
#    apt-get install -y python-pip && \
#    apt-get install -y sudo && \
#    pip install awscli && \
#    apt-get clean && \
#    rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# install python dependencies
#RUN mkdir -p $DOCKYARD_SRVPROJ/build
#COPY $DOCKYARD_SRC/build/requirements.txt $DOCKYARD_SRVPROJ/build/requirements.txt

#RUN pip install --ignore-installed "setuptools>=3.4.4"; \
#    pip install -r $DOCKYARD_SRVPROJ/build/requirements.txt

# copy config files
COPY $DOCKYARD_SRC/docker/bin $DOCKYARD_SRVPROJ/bin

# copy jar
COPY $DOCKYARD_SRC/batch/target/batch-1.0.jar $DOCKYARD_SRVPROJ/jars/batch.jar

# create user
RUN useradd --create-home --shell /bin/bash batch
RUN chown -R batch: $BATCH_HOME
USER batch

ENTRYPOINT ["/srv/batch/bin/batch.sh"]
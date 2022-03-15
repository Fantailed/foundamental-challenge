
# Dockerfile

# base image
FROM node:alpine

# create & set working directory
RUN mkdir -p /app
WORKDIR /app

# copy package.json files
COPY package*.json /app

# install dependencies
RUN yarn install
RUN yarn global add next
# copy app files
COPY . /app

# start app
EXPOSE 3000
# CMD ls
CMD yarn dev
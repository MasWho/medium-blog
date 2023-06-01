FROM node:18-alpine
 
WORKDIR /worker
COPY package.json yarn.lock ./
RUN yarn

COPY . .
RUN yarn build
CMD [ "yarn", "start" ]
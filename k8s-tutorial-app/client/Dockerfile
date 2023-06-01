FROM node:18-alpine
 
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn

COPY . .
RUN yarn build
CMD [ "yarn", "start" ]
EXPOSE 3000
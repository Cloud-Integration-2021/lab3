FROM node:14.18.1-alpine as build
WORKDIR /app

ENV BACKEND_URL http://localhost:8080
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
RUN yarn install
COPY . ./

EXPOSE 3000
CMD ["yarn", "start"]

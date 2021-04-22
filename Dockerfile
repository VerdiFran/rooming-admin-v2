### STAGE 1: Build ###
FROM node:latest as build
RUN mkdir /usr/src/app
WORKDIR /usr/src/app
ENV PATH /usr/src/app/node_modules/.bin:$PATH
COPY package.json /usr/src/app/package.json
COPY tsconfig.json /usr/src/app/tsconfig.json
COPY craco.config.js /usr/src/app/craco.config.js
COPY yarn.lock /usr/src/app/yarn.lock
COPY .env /usr/src/app/.env
RUN npm install --legacy-peer-deps
COPY ./public/. /usr/src/app/public/
COPY ./src/. /usr/src/app/src/
RUN npm run-script build
RUN ls build

### STAGE 2: Production Environment ###
FROM nginx:1.13.12-alpine
COPY --from=build /usr/src/app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
FROM node:14.15.0 as build

RUN npm version

WORKDIR /usr/src/app
COPY package*.json /usr/src/app/package.json
RUN npm install
COPY . .
RUN npm run build

FROM nginx:1.13.12-alpine
COPY --from=build /usr/src/app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

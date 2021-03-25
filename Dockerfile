FROM node:13.12.0-alpine
WORKDIR /usr/src/web
ENV PATH /app/node_modules/.bin:$PATH
RUN apk update && apk add git
COPY package.json .
RUN npm install --silent
COPY . .
CMD ["npm", "start"]
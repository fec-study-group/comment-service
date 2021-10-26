FROM node:16-alpine

WORKDIR /app

# RUN apk add git

# RUN git clone ...

COPY ./package.json ./

RUN npm install

RUN npm i -g nodemon

COPY . .

EXPOSE 3000

CMD ["nodemon", "index.js"]

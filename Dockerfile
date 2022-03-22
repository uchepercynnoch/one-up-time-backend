FROM node:16

WORKDIR /app

COPY package.json .

EXPOSE 5000

EXPOSE 5001

RUN npm install

COPY . .

CMD ["node","bin/www"]



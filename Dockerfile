FROM node:18

WORKDIR /app

COPY . .

RUN npm install
RUN npm run build

CMD [ "node", "dist/index.js" ]

EXPOSE 5000

FROM node:alpine

WORKDIR /app

COPY server/package*.json ./

RUN npm install  --omit=dev && npm cache clean --force

COPY server/ .

EXPOSE 3001

CMD ["npm", "start"]
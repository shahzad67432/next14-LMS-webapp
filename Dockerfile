FROM node:20-alpine

WORKDIR /lms

COPY . .

RUN npm install
RUN npm run db:push
RUN npm run build

EXPOSE 3000

CMD [ "npm", "run", "dev" ]

FROM node:latest
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --only=prod
COPY . .
RUN npm run build
EXPOSE 4000
CMD ["npm", "start"]
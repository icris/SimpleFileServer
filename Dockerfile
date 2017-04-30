FROM node:alpine
EXPOSE 8000


RUN mkdir /data

WORKDIR /usr/src/app

COPY . /usr/src/app
RUN npm install && npm cache clean

CMD [ "npm", "start" ]
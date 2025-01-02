FROM node:latest

WORKDIR /backend-work-dir

COPY package*.json .

RUN npm install 

COPY . .

EXPOSE 5000

ENTRYPOINT [ "npm" ]

CMD [ "start" ]


# Dockerfile, отвечающий за бэк
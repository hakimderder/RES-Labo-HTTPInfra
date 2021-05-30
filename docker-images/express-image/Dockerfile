FROM node:14.17.0

RUN apt-get update && \
   apt-get install -y nano

COPY src /opt/app

CMD ["node", "/opt/app/index.js"]
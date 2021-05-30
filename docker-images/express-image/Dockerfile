FROM node:14.17.0

COPY src /opt/app

RUN apt-get update && \
	apt-get install -y vim

CMD ["node", "/opt/app/index.js"]
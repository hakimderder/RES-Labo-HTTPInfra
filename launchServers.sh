#!/bin/bash

#Tue tous les conteneurs en cours
docker kill $(docker ps -qa)
#Remove tout les containers
docker rm $(docker ps -qa)

#Variable pour les addresses ip des serveurs
static_ip="172.17.0.2:80"
static_ip1="172.17.0.3:80"
dynamic_ip="172.17.0.4:3000"
dynamic_ip1="172.17.0.5:3000"

#build les images
docker build -t res/apache_php ./docker-images/apache-php-images/
docker build -t res/express_dynamic ./docker-images/express-image/
docker build -t res/apache_rp ./docker-images/apache-reverse-proxy/

#Run les containers dans le bon ordre
docker run -d --name apache_static res/apache_php
docker run -d --name apache_static1 res/apache_php
docker run -d --name express_dynamic res/express_dynamic
docker run -d --name express_dynamic1 res/express_dynamic

docker run -d -e STATIC_APP="${static_ip}" -e STATIC_APP1="${static_ip1}" -e DYNAMIC_APP="${dynamic_ip}" -e DYNAMIC_APP1="${dynamic_ip1}" -p 8081:80 --name apache_rp res/apache_rp

#docker volume create portainer_data
#docker run -d -p 8000:8000 -p 9000:9000 --name=portainer --restart=always -v /var/run/docker.sock:/var/run/docker.sock -v portainer_data:/data portainer/portainer-ce
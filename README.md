# RES - Laboratoire HTTP Infra

## Etape 1 - Serveur statique

Dans cette étape nous allons configurer un serveur HTTP statique avec une image Docker et une page HTML basique. Nous avons utilisé un [template](https://startbootstrap.com/template/full-width-pics) du framework Bootstrap.

### Contenu

Voici le contenu du Dockerfile :

```dockerfile
FROM php:7.4-apache

COPY content/ /var/www/html/
```

Nous construisons notre image sur la base d'une image Apache php et la version 7.4. Ensuite, on copie le contenu du dossier content, qui contient les informations du site statique, dans le dossier /var/www/html/ de l'image Docker.

### Utilisation

Pour lancer le container, il faut se trouver dans le répertoire `apache-php-image` et entrer les commande : `docker build -t res/apache_static .` pour construire l'image et `docker run -d -p 9090:80 res/site-static` pour lancer le container. Pour accéder au site, il faut ouvrir un navigateur et d'entrer comme URL : `localhost:9090`.



## Etape 2 - Serveur dynamique

Dans cette étape, nous implémentons une application dynamique qui retourne des données en plus du contenu HTML. Pour cela, nous utilisons Node.js, ainsi qu'une image Docker. 

### Contenu

Les données sont celles du script `index.js` qui génère une liste aléatoire d'animaux et la renvoie sous forme de tableau avec Chancejs.

Le Dockerfile :

```dockerfile
FROM node:14.17.0

COPY src /opt/app

RUN apt-get update && \
   apt-get install -y vim

CMD ["node", "/opt/app/index.js"]
```

Comme à l'étape 1, nous nous basons sur une image déjà existante, celle de node en version 14.17.0, puis copions le contenu de src/ dans /opt/app. La dernière ligne fait en sorte que le script `index.js` s'exécute à chaque lancement du container.

### Utilisation

En se trouvant dans le dossier `express-image`, entrer la commande `docker build -t res/express .` pour construire l'image, et `docker run -p 8080:3000 res/express`. Pour accéder au site, 

Pour accéder au site, il faut ouvrir un navigateur et d'entrer comme URL : `localhost:9090`.



### Etape 3 - Reverse proxy

Dans cette étape, nous avons mis en place un reverse proxy avec apache et Docker. Il sera dans un container séparé.

### Contenu 

Il y a deux fichiers de configuration, `000-default.conf`et `001-reverse-proxy.conf`, qui indiquent la configuration du serveur proxy.

Il y a aussi un Dockerfile :

```dockerfile
FROM php:7.4-apache


RUN apt-get update && \
   apt-get install -y vim

COPY conf/ /etc/apache2

RUN a2enmod proxy proxy_http
RUN a2ensite 000-* 001-*
```

Nous utilisons la même image php qu'à l'étape 1. On installe vim dans l'image, puis copie le contenu du dossier conf, qui contient donc la configuration du reverse proxy, dans le dossier /etc/apache2 de l'image Docker. Les commandes RUN permettent d'activer des modules apache nécessaires à la configuration du proxy.

### Utilisation

Puisque le reverse est encore statique, il faut lancer les containers dans le bon ordre afin qu'ils aient les bonnes adresses IP avec les commande suivantes, après avoir construit les images aux étapes précédentes :

`docker run -d res/apache_static`

`docker run -d res/express`

Puis, depuis le répertoire `apache-reverse-proxy`, on build l'image 

`docker build -t res/apache_rp .`

Et on lance le container

`docker run -p 8080:80 -d res/apache_rp`

Pour accéder au site, ouvrir un navigateur et entrer dans l'URL `demo.res.ch:8080/`.

Pour accéder a l'application dynamique, entrer `demo.res.ch:8080/api/animals`. 



## Etape 4 - Requêtes AJAX


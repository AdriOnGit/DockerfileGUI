FROM ubuntu:latest

# Per non aspettare input utente durante apt-get
ENV DEBIAN_FRONTEND=noninteractive
# Timezone del container
ENV TZ=Europe/Rome

# Installa PHP e Apache 
RUN apt-get update && apt-get install -y php apache2 
# Crea la directory /var/www/api
RUN mkdir /var/www/api/
# Consente ad Apache di riscrivere URL
RUN a2enmod rewrite

# Copia il file config e ports di Apache nel container
COPY ./apache-conf/000-default.conf /etc/apache2/sites-available/000-default.conf
COPY ./apache-conf/ports.conf /etc/apache2/ports.conf

# Frontend su localhost
EXPOSE 80
# Backend
EXPOSE 8080

# Apache viene eseguito nel foreground 
CMD ["apache2ctl", "-D", "FOREGROUND"]
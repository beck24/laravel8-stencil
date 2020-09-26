FROM php:7.3-apache-stretch

#Surpresses debconf complaints of trying to install apt packages interactively
#https://github.com/moby/moby/issues/4032#issuecomment-192327844

ARG DEBIAN_FRONTEND=noninteractive

# Install important libraries
RUN apt-get -y update --fix-missing --no-install-recommends \
    && apt-get -y upgrade \
    && apt-get -y install --fix-missing --no-install-recommends apt-utils nano wget dialog build-essential git curl \
    libcurl3 libcurl3-dev zip unzip libzip-dev openssl zlib1g-dev libicu-dev libfreetype6-dev libjpeg62-turbo-dev libpng-dev \
    libsqlite3-dev libsqlite3-0 mysql-client


# Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Other PHP7 Extensions

RUN docker-php-ext-install curl tokenizer json zip mbstring gettext pdo_mysql pdo_sqlite mysqli
RUN docker-php-ext-install -j$(nproc) intl
RUN docker-php-ext-configure gd --with-freetype-dir=/usr/include/ --with-jpeg-dir=/usr/include/ \
    && docker-php-ext-install gd

# Enable apache modules
RUN a2enmod rewrite headers

# Install Node - 14.6.0
RUN set -ex \
  && apt-get update \
  && curl -o nodejs.deb https://deb.nodesource.com/node_14.x/pool/main/n/nodejs/nodejs_14.6.0-deb-1nodesource1_amd64.deb \
  && apt-get install -y ./nodejs.deb \
  && rm nodejs.deb \
  && rm -rf /var/lib/apt/lists/*
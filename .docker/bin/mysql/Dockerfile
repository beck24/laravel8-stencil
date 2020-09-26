FROM mysql:5.7

RUN apt-get update && apt-get install pv

COPY config/mysql/mysqld.cnf /etc/mysql/conf.d/mysqld.cnf
RUN chmod 644 /etc/mysql/conf.d/mysqld.cnf
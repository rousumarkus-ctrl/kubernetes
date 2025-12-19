FROM google/cloud-sdk:slim

RUN apt install -y postgresql-common ca-certificates
RUN /usr/share/postgresql-common/pgdg/apt.postgresql.org.sh -y
RUN apt update && apt install -y postgresql-client-18

RUN pg_dump --version
RUN gcloud --version

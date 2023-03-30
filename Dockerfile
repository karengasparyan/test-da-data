FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

ENV PGUSER myusername
ENV PGHOST mypostgresqlhost
ENV PGPASSWORD mysecretpassword
ENV PGDATABASE mydatabasename
ENV PGPORT 5432

CMD ["npm", "start"]
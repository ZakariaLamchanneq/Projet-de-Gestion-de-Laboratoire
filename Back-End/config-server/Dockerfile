FROM maven:3.8.5-openjdk-17 AS build


WORKDIR /Back-End/config-server

COPY . .

RUN mvn clean package -DskipTests
CMD mvn spring-boot:run



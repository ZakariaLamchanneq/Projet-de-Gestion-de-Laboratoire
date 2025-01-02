FROM maven:3.8.5-openjdk-17
# FROM maven:3.8.2-jdk-8

WORKDIR /Back-End/analyse
COPY . .
RUN mvn clean package -DskipTests

CMD mvn spring-boot:run


# Stage 1: Build the backend module
FROM maven:3.9.4-eclipse-temurin-21 AS build
WORKDIR /app
COPY . .
RUN mvn -f backend/pom.xml clean package -DskipTests

# Stage 2: Run the app
FROM eclipse-temurin:21-jdk
WORKDIR /app
COPY --from=build /app/backend/target/*SNAPSHOT.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]

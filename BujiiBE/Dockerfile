# Step 1: Build the project using Maven
FROM maven:3.9.9-eclipse-temurin-17 AS build
WORKDIR /app

# Copy the pom.xml and source code to the container
COPY pom.xml ./
COPY src ./src

# Package the application without running tests
RUN mvn clean package -DskipTests

# Step 2: Create a minimal image for running the application
FROM eclipse-temurin:17-jdk-jammy
WORKDIR /app

# Copy the packaged jar file from the build stage
COPY --from=build /app/target/*.jar app.jar

# Expose the application port
EXPOSE 8082

# Set environment variables for Supabase PostgreSQL connection and JWT secret
ENV SPRING_DATASOURCE_URL=jdbc:postgresql://aws-0-eu-central-1.pooler.supabase.com:6543/postgres
ENV SPRING_DATASOURCE_USERNAME=postgres.ptujmdjnfxzwakdwwrjo
ENV SPRING_DATASOURCE_PASSWORD=ihaveapassword!!
ENV SPRING_DATASOURCE_DRIVER_CLASS_NAME=org.postgresql.Driver
ENV SPRING_DATASOURCE_HIKARI_CONNECTION_TIMEOUT=20000
ENV SPRING_DATASOURCE_HIKARI_MAXIMUM_POOL_SIZE=5
ENV SPRING_JPA_HIBERNATE_DDL_AUTO=update
ENV SPRING_JPA_PROPERTIES_HIBERNATE_DIALECT=org.hibernate.dialect.PostgreSQLDialect
ENV JWT_SECRET=MXXKQyyDdB3SpNow7CZ1IXkXDQ8JeaaNJZ1bFhVddZ77yZNY+a8Vi+ToGs6keTWnvEWmLLdvM9ww5N6+KF1ygQ==

# Run the Spring Boot application
ENTRYPOINT ["java", "-jar", "app.jar"]

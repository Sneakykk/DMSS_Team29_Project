# Start with a base image that includes Maven and JDK 17
FROM maven:3.8.3-openjdk-17 as build

# Set the working directory in the container
WORKDIR /app

# Copy the pom.xml file and restore dependencies for caching
COPY pom.xml .
RUN mvn dependency:go-offline

# Copy the project files into the working directory
COPY src ./src

# Package the application
RUN mvn clean package -DskipTests

# Start a new stage from the JDK 17 standard image
FROM openjdk:17

# Add Maintainer Info
LABEL maintainer="cqbashuqin@gmail.com"

# Volume pointing to /tmp, can be used for storing files in the temp directory
VOLUME /tmp

# Expose the port the app runs on
EXPOSE 8080

# Copy the jar file from the build stage into this image
COPY --from=build /app/target/*.jar app.jar

# Command to execute the application
ENTRYPOINT ["java", "-Djava.security.egd=file:/dev/./urandom", "-jar", "/app.jar"]

# Use the official OpenJDK base image
FROM openjdk:20

# Set the working directory in the container
WORKDIR /app

# Copy the packaged JAR file into the container
COPY target/task-api-0.0.1-SNAPSHOT.jar /app/app.jar

# Expose the port on which the application will run
EXPOSE 8080

# Specify the command to run your application
CMD ["java", "-jar", "app.jar"]

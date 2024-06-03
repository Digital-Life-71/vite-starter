# Use the official Node.js 18.13.0 Alpine image
FROM node:18.13.0-alpine

RUN apk update && apk add xdg-utils

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port your app runs on (if necessary)
EXPOSE 8080

# Command to run your application
CMD ["npm", "run", "dev"]

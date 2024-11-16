# Use official node image as the base image
FROM node:18 AS build

# Set the working directory
WORKDIR /Front-End

# Install Angular CLI globally
RUN npm install -g @angular/cli

# Copy package.json and package-lock.json first to install dependencies separately
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy the rest of the application files
COPY . .

# Serve the application
CMD ["ng", "serve", "--host", "0.0.0.0"]



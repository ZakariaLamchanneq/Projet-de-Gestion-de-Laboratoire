FROM node:20-alpine AS build

WORKDIR /Front-End

# Install dependencies
COPY package.json package-lock.json ./

RUN npm install --legacy-peer-deps

# Copy the Angular app source code
COPY . .

# Build the Angular app
RUN npm run build
# Stage 2: Serve the Angular app with Nginx
FROM nginx:alpine
WORKDIR /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the built Angular app from the build stage
COPY --from=build /Front-End/dist/front-end/browser .
# Expose the default Nginx port
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]





# # Use official node image as the base image
# FROM node:18 AS build

# # Set the working directory
# WORKDIR /Front-End

# # Install Angular CLI globally
# RUN npm install -g @angular/cli

# # Copy package.json and package-lock.json first to install dependencies separately
# COPY package*.json ./

# # Install dependencies
# RUN npm install --legacy-peer-deps

# # Copy the rest of the application files
# COPY . .

# # Serve the application
# CMD ["ng", "serve", "--host", "0.0.0.0"]



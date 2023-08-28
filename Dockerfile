# Use an official Node.js runtime as a parent image
# syntax=docker/dockerfile:1

FROM node:18-alpine

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json files to the working directory
COPY ["package.json", "package-lock.json*", "./"]

# Install any needed packages specified in package.json
RUN npm install

# Copy the rest of the application files to the working directory
COPY . .

RUN npm run prebuild && npm run build

EXPOSE 3456

# Run the app
CMD ["/bin/sh", "entrypoint.sh"]

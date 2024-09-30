# Use an appropriate Node.js base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application code
COPY . .

# Expose the port your app listens on
EXPOSE 3000

# Define the command to run your app
CMD ["node", "server.js"]
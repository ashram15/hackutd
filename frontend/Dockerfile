# # Use an official Node.js image
# FROM node:20-alpine

# # Set working directory inside the container
# WORKDIR /app

# # Copy package files and install dependencies
# COPY package*.json ./
# RUN npm install

# # Copy the rest of the app
# COPY . .

# # Expose the Vite development server port
# EXPOSE 5173

# # Run the app
# CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
FROM node:20-alpine

WORKDIR /app

# Copy package files first
COPY package*.json ./

# Install dependencies (including dev)
RUN npm install

# Copy the rest of the code
COPY . .

EXPOSE 5173

# Start the dev server
CMD ["npm", "run", "dev"]

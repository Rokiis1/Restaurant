FROM node:18-alpine as build

# Create a non-root user
RUN adduser -D myuser

# Create app directory
WORKDIR /usr/src/app

# Copy package*.json* and package-lock.json
COPY package*.json* ./

# Install production dependencies
RUN npm ci --only=production

# Copy app source code
COPY . .

# Change owner for the app directory
RUN chown -R myuser:myuser /usr/src/app

# Use non-root user
USER myuser

# Start the app
CMD [ "npm", "start" ]

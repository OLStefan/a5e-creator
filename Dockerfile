# ==== CONFIGURE =====
# Use a Node 16 base image
FROM node:16-alpine 
# Set the working directory to /app inside the container
WORKDIR /app
# Copy app files
COPY . .
# ==== BUILD =====
# Set the env to "production"
ENV NODE_ENV production
# Install dependencies (npm ci makes sure the exact versions in the lockfile gets installed)
RUN yarn install --frozen-lockfile 
# Build the app
RUN yarn build
# ==== RUN =======
# Expose the port on which the app will be running
EXPOSE 3000
# Start the app
CMD [ "npx", "serve", "dist" ]
# ==== CONFIGURE =====
# Use a Node 16 base image
FROM node:16-alpine as builder
# Set the working directory to /app inside the container
WORKDIR /app
# Copy app files
COPY . .
# ==== BUILD =====
# Install dependencies (npm ci makes sure the exact versions in the lockfile gets installed)
RUN yarn install
# Build the app
RUN yarn build
# ==== RUN =======
FROM node:16-alpine
# Set the working directory to /app inside the container
WORKDIR /app
# Copy only the build artifact
COPY --from=builder app/dist ./dist
COPY --from=builder app/static ./static
# Set the env to "production"
ENV NODE_ENV production
# Expose the port on which the app will be running
EXPOSE 3000
# Start the app
CMD [ "npx", "serve", "dist" ]
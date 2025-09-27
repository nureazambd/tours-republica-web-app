# ----------------------------------------------------------------------
# 1. Build Stage (Builder)
# Creates a production build of the Next.js application
# ----------------------------------------------------------------------
FROM node:20-alpine AS builder

# Set working directory inside the container
WORKDIR /app

# Copy package.json to install dependencies
COPY package.json ./

# Install dependencies (including devDependencies for build)
RUN npm install

# Copy all source files (including src/, next.config.js, etc.)
COPY . .

# Run the Next.js production build
# This creates the optimized build files in the .next directory
RUN npm run build

# ----------------------------------------------------------------------
# 2. Production Runtime Stage (Runner)
# A minimal image containing only the necessary files to run the app
# ----------------------------------------------------------------------
FROM node:20-alpine AS runner

# Set working directory
WORKDIR /app

# Install only production dependencies
COPY package.json ./
RUN npm install --only=production

# Copy necessary build artifacts from the builder stage
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/next.config.js ./

# Expose the port Next.js runs on
EXPOSE 3000

# Set the command to start the application (uses the 'start' script from package.json)
CMD ["npm", "start"]

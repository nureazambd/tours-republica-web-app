# ----------------- Builder Stage -----------------
FROM node:20-alpine AS builder
WORKDIR /app

COPY package.json ./
RUN npm install
COPY . .
RUN npm run build

# ----------------- Runner Stage -----------------
FROM node:20-alpine AS runner
WORKDIR /app

# Copy only production dependencies
COPY package.json ./
RUN npm install --only=production

# Copy built app from builder
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/next.config.js ./

# Copy wait-for-it script
COPY wait-for-it.sh /wait-for-it.sh
RUN chmod +x /wait-for-it.sh

EXPOSE 3000

# Wait for MongoDB to be ready before starting
CMD ["./wait-for-it.sh", "mongodb:27017", "--timeout=30", "--strict", "--", "npm", "start"]

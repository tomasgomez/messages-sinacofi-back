# Step 1: Build the Next.js application
FROM node:alpine AS builder

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install && npm update && npm install -g ts-node

# Copy the rest of your app's source code from your host to your image filesystem.
COPY . .

# Build your Prisma client and Next.js app
RUN npx prisma generate && npm run build

# Step 2: Serve the Next.js application
FROM node:alpine AS runner

WORKDIR /usr/src/app

# Copy the built assets from the builder stage
COPY --from=builder /usr/src/app/.next ./.next
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/package.json ./package.json
COPY --from=builder /usr/src/app/prisma ./prisma
COPY --from=builder /usr/src/app/assets ./assets
COPY --from=builder /usr/src/app/.env ./.env
COPY --from=builder /usr/src/app/tsconfig.json ./tsconfig.json

# Expose port 3000
EXPOSE 3000

# Start the application
CMD ["npm", "run", "start"]

# Step 1: Build the Next.js application
FROM node:20-alpine AS builder

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install
RUN npm install -g ts-node

# Build your Prisma client during the build
RUN npx prisma generate

# Copy the rest of your app's source code from your host to your image filesystem.
COPY . .

# Build your Next.js app using the environment variables from the file
RUN source .env 
RUN npm run build

# Step 2: Serve the Next.js application
FROM node:20-alpine AS runner

WORKDIR /usr/src/app

# Copy the built assets from the builder stage
COPY --from=builder /usr/src/app/.next ./.next
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/package.json ./package.json
COPY --from=builder /usr/src/app/prisma ./prisma
COPY --from=builder /usr/src/app/assets ./assets
COPY --from=builder /usr/src/app/.env ./.env
COPY --from=builder /usr/src/app/src ./src
# COPY --from=builder /usr/src/app/public ./public
COPY --from=builder /usr/src/app/tsconfig.json ./tsconfig.json

# Your app binds to port 3000 so you'll use the EXPOSE instruction to have it mapped by the docker daemon
EXPOSE 3000

# Here we will use the Next.js start script which starts the development server
CMD ["npm", "run", "dev"]

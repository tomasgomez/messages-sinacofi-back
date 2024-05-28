# Step 1: Build the Next.js application
FROM node:alpine AS builder

# Define build arguments
ARG DB_USER
ARG DB_PASS
ARG DB_HOST
ARG DB_NAME
ARG FILES_PATH
ARG LOG_FILENAME
ARG PORT
ARG ADMIN_CLIENT_URL
ARG RULE_CLIENT_URL

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install -g ts-node && npm cache clean --force

# Copy the rest of your app's source code from your host to your image filesystem.
COPY . .

# Set the DATABASE_URL environment variable
ENV DATABASE_URL=postgresql://$DB_USER:$DB_PASS@$DB_HOST:5432/$DB_NAME
# Set FILES_PATH environment variable
ENV FILES_PATH=$FILES_PATH
# Set LOGS_PATH environment variable
ENV LOG_FILENAME=$LOG_FILENAME
# Set PORT enviroment variable
ENV PORT=$PORT
# Set RULE_CLIENT enviroment variable
ENV RULE_CLIENT_URL=$RULE_CLIENT_URL
# Set ADMIN_CLIENT_URL enviroment variable
ENV ADMIN_CLIENT_URL=$ADMIN_CLIENT_URL

# Build your Prisma client and Next.js app
RUN npx prisma generate && npm run build

# Step 2: Serve the Next.js application
FROM node:alpine AS runner

WORKDIR /usr/src/app

# Copy the files
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/.next ./.next
COPY --from=builder /usr/src/app/public ./public
COPY --from=builder /usr/src/app/prisma ./prisma
COPY --from=builder /usr/src/app/package*.json ./

# Set the environment variables using ARG and ENV
ARG DB_USER
ARG DB_PASS
ARG DB_HOST
ARG DB_NAME
ARG FILES_PATH
ARG LOG_FILENAME
ARG PORT
ARG ADMIN_CLIENT_URL
ARG RULE_CLIENT_URL

# Set the DATABASE_URL environment variable
ENV DATABASE_URL=postgresql://$DB_USER:$DB_PASS@$DB_HOST:5432/$DB_NAME
# Set FILES_PATH environment variable
ENV FILES_PATH=$FILES_PATH
# Set LOGS_PATH environment variable
ENV LOG_FILENAME=$LOG_FILENAME
# Set PORT enviroment variable
ENV PORT=$PORT
# Set RULE_CLIENT enviroment variable
ENV RULE_CLIENT_URL=$RULE_CLIENT_URL
# Set ADMIN_CLIENT_URL enviroment variable
ENV ADMIN_CLIENT_URL=$ADMIN_CLIENT_URL

# Expose port
EXPOSE $PORT

# Start the application
CMD ["npx", "next", "start", "-p", "$PORT"]


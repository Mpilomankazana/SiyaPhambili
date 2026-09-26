# Use Node LTS (v24) as the base image for stability
FROM node:24-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package files first to leverage Docker layer caching
COPY package.json package-lock.json* ./

# Install dependencies, including Tailwind v4 and Axios
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose Vite's default port
EXPOSE 5173

# Start the Vite development server and expose it to the network
CMD ["npm", "run", "dev", "--", "--host"]
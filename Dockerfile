# Study Buddy AI - Dockerfile
# Uses a Debian-based Node image (not Alpine) because bcrypt compiles a
# native addon on install, and Alpine's musl libc causes build issues
# with some native modules unless extra build tools are added.
FROM node:20-bookworm-slim

WORKDIR /app

# Install dependencies first (separate layer so `npm install` is only
# re-run when package.json actually changes, not on every code edit).
COPY package*.json ./
RUN npm install --omit=dev

# Now copy the rest of the application source.
COPY . .

EXPOSE 3000

CMD ["node", "server.js"]

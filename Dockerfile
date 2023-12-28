FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

# Copy the rest of the application code
COPY . .

# RUN npm install --omit=dev
RUN npm install

RUN npm run build

USER node


CMD ["npm","start"]

EXPOSE 5001
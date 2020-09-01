FROM node:13.12.0-alpine

WORKDIR /usr/src/app

# ENV PATH /app/node_modules/.bin:$PATH

# Only copy the package.json file to work directory
COPY package.json .
# Install all Packages
RUN npm install
# Copy all other source code to work directory
ADD . /usr/src/app
# TypeScript
RUN npm run tsc
# Start
CMD [ "npm", "start" ]
EXPOSE 7001
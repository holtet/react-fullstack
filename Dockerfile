# specify the node base image with your desired version node:<version>
FROM node:12
# replace this with your application's default port
EXPOSE 8080
WORKDIR /home/node/app
COPY --chown=node .babelrc package.json index.html webpack.config.js /home/node/app/
COPY --chown=node src /home/node/app/src
COPY --chown=node node_modules /home/node/app/node_modules
ENTRYPOINT [ "npm", "run", "dev" ]
# COPY . .
#VOLUME [ "/home/node/app" ]
#ENV NODE_ENV=production

# dockerStrategy:
#       from:
#         kind: ImageStreamTag
#         namespace: openshift
#         name: 'node:12'
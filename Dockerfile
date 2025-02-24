#image node

FROM node:current-alpine3.20 as node_son
WORKDIR /app
RUN apk add --no-cache bash
RUN apk add --no-cache socat
#on copie les packages
COPY interface_graphique/back/package*.json ./ 
COPY start.sh .
RUN chmod +x start.sh
RUN npm install
COPY interface_graphique/index.html /app/public/index.html
COPY interface_graphique/src /app/public/src

COPY interface_graphique/back/server.js .
RUN touch /dev/ttyS3
EXPOSE 65535 

CMD [ "./start.sh" ]



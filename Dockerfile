from node:10.16.0-alpine as node 

WORKDIR /node
COPY * ./
RUN npm install
RUN npm run build


from nginx:latest

MAINTAINER linc lg@harmonycloud.cn
COPY --from=node /node/build /usr/share/nginx/html
COPY config/default.conf /etc/nginx/conf.d/default.conf
COPY config/upstream.conf /etc/nginx/conf.d/upstream.conf
# CMD ['/bin/bash','-c','nginx -g "deamon off;"']
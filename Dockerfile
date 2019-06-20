from node:10.16.0-alpine as node 

WORKDIR /node
ADD edgeplatform ./
RUN npm install -f
RUN npm run build


from nginx:latest

MAINTAINER linc lg@harmonycloud.cn
COPY --from=node /node/build /usr/share/nginx/html
COPY edgeplatform/config/default.conf /etc/nginx/conf.d/default.conf
COPY edgeplatform/config/upstream.conf /etc/nginx/conf.d/upstream.conf
# CMD ['/bin/bash','-c','nginx -g "deamon off;"']
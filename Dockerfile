from node:10.16.0-alpine as node 

WORKDIR /node
ADD edgeplatformtest2 ./
RUN npm install -f
RUN npm run build


from nginx:latest

MAINTAINER linc lg@harmonycloud.cn
COPY --from=node /node/build /usr/share/nginx/html
COPY edgeplatformtest2/config/default.conf /etc/nginx/conf.d/default.conf
COPY edgeplatformtest2/config/upstream.conf /etc/nginx/conf.d/upstream.conf
# CMD ['/bin/bash','-c','nginx -g "deamon off;"']
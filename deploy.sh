#!/usr/bin/env bash

server='root@giova.fun'
deploy_directory=/srv/blog

if [ -x "$(command -v figlet)" ]; then
  scream="figlet"
else
  scream="echo"
fi


yarn build
yarn staticize
rm -r ./build/static

rsync -vrz ./deploy/nginx.conf $server:$deploy_directory/
rsync -vrz ./deploy/docker-compose.yml $server:$deploy_directory/
rsync -vrz ./build/ $server:$deploy_directory/web/

if [[ $1 == "--restart" ]]; then

ssh $server 'bash -s' <<'ENDSSH'
cd /srv/blog
docker-compose down
docker-compose up -d
ENDSSH

fi

$scream "Deploy Gio Va Blog"

echo 'https://giova.fun'
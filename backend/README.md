# Graphql Chat Api

## setup babel
```
npm install -D @babel/core @babel/cli @babel/preset-env @babel/node
```

```
{
  "presets": ["@babel/preset-env"]
}
```

## eslint
```
npm i eslint
./node_modules/.bin/eslint --init
```

## Run server  on docker
```
$ docker build -t node-web-app 
$ docker run -p 4000:4000 -d node-web-app node
```

## Start Mongo and Redis
```
docker-compose up
docker-compose down
```

## Bash container
```
docker exec -i -t container_name bash
redis-cli -a 'this_is_my_Pass'
```


## Access Redis

install redis-cli:

```
$ brew tap ringohub/redis-cli

$ brew update && brew doctor

$ brew install redis-cli

redis-cli -h xxxx.cloud.redislabs.com -p 13388 -a xxxx

```

> scan 0  (list sessions)

> get "id....."


## Tutorials
https://www.youtube.com/watch?v=yDN8h8snNG4&list=PLcCp4mjO-z9_y8lByvIfNgA_F18l-soQv&index=5

https://www.youtube.com/watch?v=hP77Rua1E0c

https://www.youtube.com/watch?v=U4R4kG7F9y8&list=PLcCp4mjO-z9_y8lByvIfNgA_F18l-soQv&index=15
function cleanup()
{
    docker-compose -f docker-compose.yml stop library-mysql
    docker-compose -f docker-compose.yml stop library-redis
}
trap cleanup SIGINT

# init dbs
docker-compose -f docker-compose.yml up --detach library-mysql
docker-compose -f docker-compose.yml up --detach library-redis

# init app
docker-compose -f docker-compose.yml up --build library-app

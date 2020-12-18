function cleanup()
{
    docker-compose -f docker-compose.yml stop library-mysql
    docker-compose -f docker-compose.yml stop library-redis
    docker-compose -f docker-compose.yml stop library-rabbitmq
}
trap cleanup SIGINT

# init dbs
docker-compose -f docker-compose.yml up --detach library-mysql
docker-compose -f docker-compose.yml up --detach library-redis
docker-compose -f docker-compose.yml up --detach library-rabbitmq

# init app
docker-compose -f docker-compose.yml up --build library-app

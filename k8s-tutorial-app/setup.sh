#! /bin/bash

# Build the docker images
echo -e "\n************************* Building client *************************\n"
cd client
docker build -t k8s-client .
cd ..

echo -e "\n************************* Building worker *************************\n"
cd worker
docker build -t k8s-worker .
cd ..

# Setup namespace for project and set it as default context
echo -e "\n************************* Creating namespace *************************\n"
kubectl apply -f k8s/cluster/namespace.yaml

# Setup Redis
echo -e "\n************************* Creating Redis *************************\n"
kubectl apply -f k8s/redis

# Setup Postgres
echo -e "\n************************* Creating Postgres *************************\n"
kubectl create secret generic dbpassword --from-literal DB_PASSWORD=1234  # This is to create the secret for the postgres password, do not do this in production and run the command manually
kubectl apply -f k8s/postgres


# Setup cluster configs
echo -e "\n************************* Creating cluster objects *************************\n"
kubectl apply -f k8s/cluster

# Setup client
echo -e "\n************************* Creating client *************************\n"
kubectl apply -f k8s/client

# Setup worker
echo -e "\n************************* Creating worker *************************\n"
kubectl apply -f k8s/worker
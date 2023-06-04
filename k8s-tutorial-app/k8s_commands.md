<!-- Apply all configs in a directory -->
k apply -f [DIR] --recursive

<!-- Execute a command in a pod and attach to the pod environment -->
k exec -it [POD] -- [COMMAND]

<!-- Create secrets manually -->
k create secret generic [secret_name] --from-literal [key]=[value]
<!-- k create secret generic dbpassword --from-literal DB_PASSWORD=postgres -->
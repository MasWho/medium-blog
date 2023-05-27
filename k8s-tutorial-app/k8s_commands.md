<!-- Apply all configs in a directory -->
k apply -f [DIR] --recursive

<!-- Execute a command in a pod and attach to the pod environment -->
k exec -it [POD] -- [COMMAND]
# Iniciando com o Docker na aplicação RENTALX

## Comandos com o docker e docker-compose

- docker ps: Mostrar uma lista de todos os container rodando;

- docker ps -a: Mostrar todos os container que estiverem rodando ou não;

- docker rm "container_id": Remover o container;

- docker start "container_id": Iniciar o container;

- docker stop "container_id": Parar o container;

- docker-compose up: Subir o container e os serviços;

- docker-compose stop: Parar o serviço criado pelo docker-compose;

- docker-compose down: Remover o container e os serviços criados;

- docker exec -it "container_id" / "container_name" /bin/bash: Acessar a maquina do container;

- docker logs "container_name" -f: Mostrar os logs do container;
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


## Requisitos da Aplicação

**RF** => Requisitos funcionais;

**RNF** => Requisitos não funcionais; 

**RN**=> Regra de Negócio;


### Cadastro de carro

  **RF**
  - Deve ser possível cadastrar um novo carro;
  - Deve ser possível listar todas as categorias do carro;

  **RN**
  - Não deve ser possível cadastrar um carro com uma placa já existente;
  - Não deve ser possível alterar a placa de um carro ja cadastrado;
  - O carro deve ser cadastrado com disponibilidade para alugar;
  - O carro só pode ser cadastrado por um usuário admin;


### Listagem de carros

  **RF**
  - Deve ser possível listar todos os carros disponíveis;
  - Deve ser possível listar todos os carros disponíveis pelo nome da categoria;
  - Deve ser possível listar todos os carros disponíveis pelo nome da marca;
  - Deve ser possível listar todos os carros disponíveis pelo nome do carro;



  **RN**
  - O usuário não precisa estar logado no sistema;


### Cadastro de Especificação do carro

  **RF**
  - Deve ser possível cadastrar uma especificação para um carro;
  - Deve ser possível listar todas as especificações;
  - Deve ser possível listar todos os carros;

  **RN**
  - Não deve ser possível cadastrar uma especificação para um carro não cadastrado;
  - Não deve ser possível cadastrar a mesma especificação para um carro que ja tem essa especificação existente;
  - A especificação do carro só pode ser cadastrado por um usuário admin;


### Cadastro de imagens do carro
  **RF**
  - Deve ser possível cadastrar a imagem do carro;

  **RNF**
  - Utilizar o multer para upload dos arquivos;

  **RN**
  - O usuário deve poder cadastrar mais de uma imagem para o mesmo carro;
  - O carro só pode ser cadastrado por um usuário admin;
  - As imagens do carro só pode ser cadastrado por um usuário admin;


### Aluguel de carro

**RF**
- Deve ser possível cadastrar um aluguel;

**RNF**

**RN**
- O aluguel deve ter duração minima de 24 horas;
- Não deve ser possível cadastrar um novo aluguel caso ja exista um aberto para o mesmo usuário;
- Não deve ser possível cadastrar um novo aluguel caso ja exista um aberto para o mesmo carro;
- Ao realizar um aluguel, o status do carro deverá ser alterado para indisponível;


### Devolução de carro

**RF**
- Deve ser possível realizar a devolução de um carro;

**RN**
- Se o carro for devolvido com menos de 24 horas, deverá ser cobrado diária completa;
- Ao realizar a devolução, o carro deverá ser liberado para outro aluguel;
- Ao realizar a devolução, o usuário deverá ser liberado para outro aluguel;
- Ao realizar a devolução, deverá ser calculado o total do aluguel;
- Caso o horário de devolução seja superior ao horário previsto de entrega, deverá ser cobrado multa proporcional aos dias de atraso;
- Caso haja multa, deverá ser somado ao total do aluguel;

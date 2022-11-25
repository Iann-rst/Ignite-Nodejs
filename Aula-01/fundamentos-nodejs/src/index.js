const express = require('express');


const app = express();

//receber json no corpo da requisição
app.use(express.json())


/** Métodos HTTP
 * 
 * GET - Buscar uma informação dentro do servidor;
 * POST - Inserir uma informação dentro do servidor;
 * PUT - Alterar uma informação no servidor;
 * PATCH - Alterar uma informação específica;
 * DELETE - Deletar uma informação no servidor;
 */

/** Tipos de parâmetros
 * 
 * Route Params => Identificar um recurso editar/deletar/buscar
 * Query Params => Paginação / Filtro
 * Body Params => Os objetos para Inserção / Alteração
 */

app.get("/courses", (request, response) => {
  const query = request.query;
  console.log(query)
  return response.json(["curso 1", "Curso 2", "Curso 3"]);
})

app.post("/courses", (request, response) => {
  const body = request.body;
  console.log(body);
  return response.json(["curso 1", "Curso 2", "Curso 3", "Curso 4"])
})

app.put("/courses/:id", (request, response) => {
  const { id } = request.params;
  console.log(id)
  return response.json(["curso 6", "Curso 2", "Curso 3", "Curso 4"])
})

app.patch("/courses/:id", (request, response) => {
  return response.json(["curso 6", "Curso 7", "Curso 3", "Curso 4"])
})

app.delete("/courses/:id", (request, response) => {
  return response.json(["curso 6", "Curso 7", "Curso 3"]);
})



app.listen(3333);

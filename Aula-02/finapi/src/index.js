const express = require('express');
const { v4: uuidv4 } = require('uuid');

const app = express();

app.use(express.json());

const customers = [];


/**
 * cpf - string
 * name - string
 * id - uuid
 * statement []
 */


/* Middleware */
function verifyIfExistsAccountCPF(request, response, next) {
  const { cpf } = request.headers;//recebendo o cpf que foi passado pelos headers
  const customer = customers.find((customer) => customer.cpf === cpf);

  if (!customer) {
    return response.status(404).json({
      error: "Customer not found!",
    })
  }

  request.customer = customer;

  return next();
}


function getBalance(statement) {
  const balance = statement.reduce((acc, operation) => {
    if (operation.type === 'credit') {
      return acc + operation.amount;
    } else {
      return acc - operation.amount;
    }
  }, 0);
  return balance;
}

//Criar uma conta
app.post('/account', (req, res) => {
  const { cpf, name } = req.body;

  const customerAlreadyExists = customers.some((customer) => customer.cpf === cpf);

  if (customerAlreadyExists) {
    return res.status(400).json({
      error: "Customer already exists!",
    })
  }

  customers.push({
    id: uuidv4(),
    cpf,
    name,
    statement: []
  });

  return res.status(201).send();
});

//Buscar o Extrato bancário do cliente
app.get('/statement', verifyIfExistsAccountCPF, (request, response) => {

  const { customer } = request; //Recebe o customer que vou enviado do middleware de verificar se a conta existe

  return response.json(customer.statement);
})

//Realizar um depósito
app.post('/deposit', verifyIfExistsAccountCPF, (request, response) => {
  const { customer } = request;
  const { description, amount } = request.body;

  const statementOperation = {
    description,
    amount,
    created_at: new Date(),
    type: "credit"
  }

  customer.statement.push(statementOperation);
  return response.status(201).send();
});

//Realizar um saque
app.post('/withdraw', verifyIfExistsAccountCPF, (request, response) => {
  const { customer } = request;
  const { amount } = request.body;


  const balance = getBalance(customer.statement);

  if (balance < amount) {
    return response.status(400).json({
      error: "Insufficient funds!"
    })
  }

  const statementOperation = {
    amount,
    created_at: new Date(),
    type: "debit"
  }

  customer.statement.push(statementOperation);

  return response.status(201).send();

})

//Realizar o extrato por data
app.get("/statement/date", verifyIfExistsAccountCPF, (request, response) => {
  const { customer } = request;
  const { date } = request.query;



  const dateFormat = new Date(date + " 00:00");
  console.log(dateFormat);
  const statement = customer.statement.filter((statement) => statement.created_at.toDateString() === new Date(dateFormat).toDateString());


  return response.status(200).json(statement);
})

//Atualizar dados da conta
app.put("/account", verifyIfExistsAccountCPF, (request, response) => {
  const { name } = request.body;
  const { customer } = request;

  customer.name = name;

  return response.status(201).send();
})

//Obter dados da conta
app.get("/account", verifyIfExistsAccountCPF, (request, response) => {
  const { customer } = request;

  return response.status(200).json(customer);
})

//Deletar uma conta
app.delete("/account", verifyIfExistsAccountCPF, (request, response) => {
  const { customer } = request;

  customers.splice(customer, 1)

  return response.status(200).json(customers);
})

//Buscar o extrato da conta
app.get("/balance", verifyIfExistsAccountCPF, (request, response) => {
  const { customer } = request;

  const balance = getBalance(customer.statement);

  return response.status(200).json({
    "saldo": balance
  });
})

app.listen(3331); 
const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const { generateToken } = require('./auth');
const { checkToken, getAddresses, addAddress } = require('./delivery');

const app = express();
app.use(bodyParser.json());

// Carrega o arquivo Swagger.yaml
const swaggerDocument = YAML.load('./swagger.yaml');

// Rota para acessar a documentação
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Roteamento da API
app.post('/api/auth/token', generateToken);
app.get('/api/delivery/addresses', checkToken, getAddresses);
app.post('/api/delivery/addresses', checkToken, addAddress);

// Inicia o servidor
app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});

module.exports = app;

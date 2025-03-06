const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express'); // Importa o Swagger UI
const yaml = require('yamljs'); // Importa o YAMLJS
const { generateToken } = require('./auth');
const { checkToken, getAddresses, addAddress } = require('./delivery');

// Carregar o arquivo swagger.yaml
const swaggerDocument = yaml.load('./swagger.yaml'); // Aponte para o caminho correto do seu arquivo YAML

const app = express();
app.use(bodyParser.json());

// Roteamento
app.post('/api/auth/token', generateToken);
app.get('/api/delivery/addresses', checkToken, getAddresses);
app.post('/api/delivery/addresses', checkToken, addAddress);

// Rota para a documentação do Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Inicia o servidor
app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});

module.exports = app; // Exporta para deploy no Vercel

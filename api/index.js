const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express'); // Importa o Swagger UI
const fs = require('fs');
const path = require('path'); // Necessário para resolver o caminho do arquivo no Vercel
const { generateToken } = require('./auth');
const { checkToken, getAddresses, addAddress } = require('./delivery');

const app = express();
app.use(bodyParser.json());

// Carregar o arquivo swagger.yaml de forma robusta
const swaggerDocument = fs.readFileSync(path.join(__dirname, '..', 'swagger.yaml'), 'utf8');

// Roteamento
app.post('/api/auth/token', generateToken);
app.get('/api/delivery/addresses', checkToken, getAddresses);
app.post('/api/delivery/addresses', checkToken, addAddress);

// Rota para a documentação do Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(JSON.parse(swaggerDocument)));

// Inicia o servidor
app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});

module.exports = app; // Exporta para deploy no Vercel

const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const path = require('path');
const { generateToken } = require('./auth');
const { checkToken, getAddresses, addAddress } = require('./delivery');

const app = express();
app.use(bodyParser.json());

// ✅ Carrega o arquivo Swagger corretamente no Vercel
const swaggerDocument = YAML.load(path.join(__dirname, '../swagger.yaml'));

// Rota para acessar a documentação
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Roteamento da API
app.post('/api/auth/token', generateToken);
app.get('/api/delivery/addresses', checkToken, getAddresses);
app.post('/api/delivery/addresses', checkToken, addAddress);

// Inicia o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

module.exports = app;

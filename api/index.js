const express = require('express');
const bodyParser = require('body-parser');
const { generateToken } = require('./auth');
const { checkToken, getAddresses, addAddress } = require('./delivery');

const app = express();
app.use(bodyParser.json());

// Roteamento
app.post('/api/auth/token', generateToken);

app.get('/api/delivery/addresses', checkToken, getAddresses);
app.post('/api/delivery/addresses', checkToken, addAddress);

// Inicia o servidor
app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});

module.exports = app; // Exporta para deploy no Vercel
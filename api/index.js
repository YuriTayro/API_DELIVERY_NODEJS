const express = require('express');
const bodyParser = require('body-parser');
const { generateToken } = require('./auth');
const { checkToken, getAddresses, addAddress } = require('./delivery');
const swaggerDocument = require('./swagger.json');

const app = express();
app.use(bodyParser.json());

// Roteamento
app.post('/api/auth/token', generateToken);
app.get('/api/delivery/addresses', checkToken, getAddresses);
app.post('/api/delivery/addresses', checkToken, addAddress);

// Porta dinâmica (para deploy no Vercel)
const PORT = process.env.PORT || 3000; // Vercel define automaticamente a porta
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

module.exports = app; // Exporta para deploy no Vercel

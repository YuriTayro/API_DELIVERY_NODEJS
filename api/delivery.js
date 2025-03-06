const jwt = require('jsonwebtoken');

const secretKey = "chave_secreta_super_segura";

// Dados fictícios para os endereços
const enderecos = [
    { id: 1, rua: "Rua das Flores", numero: "123", bairro: "Centro", cidade: "São Paulo", estado: "SP", cep: "01001-000" },
    { id: 2, rua: "Avenida Paulista", numero: "1000", bairro: "Bela Vista", cidade: "São Paulo", estado: "SP", cep: "01311-000" }
];

// Função para verificar o token JWT
function checkToken(req, res, next) {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return res.status(401).json({ error: "Token não fornecido" });
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: "Token inválido" });
        }
        req.user = decoded; // Salva o usuário no request para uso posterior
        next();
    });
}

// Função para listar os endereços
function getAddresses(req, res) {
    res.json(enderecos);
}

// Função para adicionar um novo endereço
function addAddress(req, res) {
    const { rua, numero, bairro, cidade, estado, cep } = req.body;
    const novoEndereco = {
        id: enderecos.length + 1,
        rua,
        numero,
        bairro,
        cidade,
        estado,
        cep
    };
    enderecos.push(novoEndereco);
    res.json({ message: "Endereço criado com sucesso", endereco: novoEndereco });
}

module.exports = { checkToken, getAddresses, addAddress };

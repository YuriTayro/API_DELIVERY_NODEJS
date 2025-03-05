const jwt = require('jsonwebtoken');

const secretKey = "chave_secreta_super_segura";

// Função para gerar token
function generateToken(req, res) {
    const { login, password } = req.body;
    
    const inputLogin = login || '';
    const inputPassword = password || '';

    const validLogin = 'admin@delivery.com';
    const validPassword = 'admin123'; // Senha simples sem hash

    if (inputLogin === validLogin && inputPassword === validPassword) {
        const token = createToken(inputLogin);
        return res.json({ token });
    }

    return res.status(401).json({ error: "Credenciais inválidas" });
}

// Função para criar o token JWT
function createToken(login) {
    const issuedAt = Math.floor(Date.now() / 1000);
    const expirationTime = issuedAt + 3600; // Token expira em 1 hora
    const payload = { iat: issuedAt, exp: expirationTime, login };

    return jwt.sign(payload, secretKey);
}

module.exports = { generateToken };
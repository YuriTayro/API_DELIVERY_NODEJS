const jwt = require('jsonwebtoken');
const md5 = require('md5'); // Adicionar a biblioteca MD5 para o hash

const secretKey = "chave_secreta_super_segura";

// Função para gerar token
function generateToken(req, res) {
    const { login, password } = req.body;
    
    const inputLogin = login || '';
    const inputPassword = password || '';

    const validLogin = 'admin@delivery.com';
    const validPasswordHash = '0192023a7bbd73250516f069df18b500'; // Senha MD5 exemplo

    // Verificação do hash da senha
    if (inputLogin === validLogin && md5(inputPassword) === validPasswordHash) {
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

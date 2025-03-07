const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ error: "Acesso negado. Nenhum token fornecido." });
  }

  try {
    const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    console.error("Erro ao verificar token:", err.message);
    res.status(400).json({ error: "Token inválido" });
  }
};

module.exports = authMiddleware;

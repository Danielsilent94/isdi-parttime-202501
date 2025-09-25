import jwt from "jsonwebtoken";

export default function authMiddleware(req, res, next) {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(401).json({ error: "No estás autenticado. Falta header Authorization." });
  }

  // Formato esperado: "Bearer <token>"
  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Token no válido o ausente." });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "secreto_super_seguro" // 👈 mismo secreto que en userRoutes
    );

    // Guardamos datos del token para usarlos en rutas
    req.user = { id: decoded.id, email: decoded.email };
    next();
  } catch (err) {
    console.error("❌ Error al verificar token:", err);
    return res.status(403).json({ error: "Token inválido o expirado." });
  }
}
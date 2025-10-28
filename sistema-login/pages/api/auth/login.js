import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET;

const users = [
  { id: 1, email: "admin@example.com", password: "admin123", role: "admin" },
  { id: 2, email: "user@example.com", password: "user123", role: "user" },
];

export default function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { email, password } = req.body;
  const user = users.find((u) => u.email === email && u.password === password);

  if (!user) {
    return res.status(401).json({ message: "Credenciales inválidas" });
  }

  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    SECRET,
    { expiresIn: "8h" }
  );

  res.setHeader(
    "Set-Cookie",
    `token=${token}; HttpOnly; Path=/; SameSite=Lax; Max-Age=${8 * 3600}`
  );

  res.status(200).json({ message: "Login exitoso" });
}

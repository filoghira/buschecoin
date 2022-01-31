import jwt from "jsonwebtoken";

export function verifyToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.log(err);
      return res.sendStatus(403);
    }
    req.user = user;
    next();
  });
}

export function generateToken(username, authlevel) {
  return jwt.sign(
    { username: username, authlevel: authlevel },
    process.env.JWT_SECRET,
    { expiresIn: "3000s" }
  );
}

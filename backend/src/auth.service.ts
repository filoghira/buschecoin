import jwt from "jsonwebtoken";

export function verifyUser(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err || user.username !== req.params.username || user.authlevel > 1) {
      if (err instanceof jwt.TokenExpiredError)
        res.status(401).send({ success: false, message: "Token expired" });
      else
        res
          .status(403)
          .send({ success: false, message: "Authorization level is too low" });
    }
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

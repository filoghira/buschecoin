import express, { json } from "express";
import dotenv from "dotenv";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import multer from "multer";
import * as CSV from "csv-string";

let storage = multer.memoryStorage();
let upload = multer({ storage: storage });

import pkg from "@prisma/client";
const { PrismaClient } = pkg;

function verifyToken(req, res, next) {
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

dotenv.config();

const prisma = new PrismaClient();

const app = express();
app.use(json());

app.get("/api/login", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const user = await prisma.users.findFirst({
    where: {
      username: username,
    },
  });

  const hash = crypto.createHash("sha512").update(password).digest("hex");

  if (user == null)
    res.status(401).send({ success: false, message: "User not found" });
  else if (user.password != hash)
    res.status(401).send({ success: false, message: "Wrong password" });
  else {
    await prisma.users.updateMany({
      where: {
        username: username,
      },
      data: {
        last_login: new Date(),
      },
    });

    const token = jwt.sign(
      { username: username, authlevel: user.authlevel },
      process.env.JWT_SECRET,
      { expiresIn: "3000s" }
    );
    res
      .status(200)
      .send({ success: true, message: "Login success", token: token });
    console.log(`${username} logged in`);
  }
});

app.post(
  "/api/register",
  [verifyToken, upload.single("file")],
  async (req, res) => {
    const data = CSV.parse(req.file["buffer"].toString());

    for (let i = 0; i < data.length; i++) {
      const user = await prisma.users.create({
        data: {
          username: data[i][0],
          name: data[i][1],
          surname: data[i][2],
          password: crypto
            .createHash("sha512")
            .update(data[i][3])
            .digest("hex"),
          email: data[i][4],
          class: data[i][5],
          authlevel: parseInt(data[i][6]),
        },
      });
      console.log(`${user.username} registered`);
    }

    res.status(200).send({ success: true, message: "Registration success" });
  }
);

app.listen(process.env.SERVER_PORT, () => {
  console.log(`Server is running on port ${process.env.SERVER_PORT}`);
});

import express, { json } from "express";
import dotenv from "dotenv";
import crypto from "crypto";
import multer from "multer";
import cors from "cors";
import * as CSV from "csv-string";
import { generateToken, verifyUser } from "./auth.service";
import { PrismaClient } from "@prisma/client";

dotenv.config();

let storage = multer.memoryStorage();
let upload = multer({ storage: storage });

var corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
};

const prisma = new PrismaClient();

const app = express();
app.use(json());

app.options("*", cors(corsOptions));

app.post("/api/login", cors(corsOptions), async (req, res) => {
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

    const token = generateToken(username, user.authlevel);

    res
      .status(200)
      .send({ success: true, message: "Login success", token: token });
    console.log(`${username} logged in`);
  }
});

app.post(
  "/api/register",
  [verifyUser, upload.single("file")],
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

app.get(
  "/api/user/:username",
  [cors(corsOptions), verifyUser],
  async (req, res) => {
    const user = await prisma.users.findFirst({
      where: {
        username: req.params.username,
      },
    });

    const data = {
      username: user.username,
      name: user.name,
      surname: user.surname,
      email: user.email,
      class: user.class,
    };

    res.status(200).send(data);
  }
);

app.get(
  "/api/user/:username/inventory",
  [cors(corsOptions), verifyUser],
  async (req, res) => {
    const user = await prisma.users.findFirst({
      where: {
        username: req.params.username,
      },
      select: { id: true },
    });

    if (user) {
      const objects = await prisma.objects.findMany({
        where: {
          ownerId: user.id,
        },
        select: {
          id: true,
          objecttypes: {
            select: {
              name: true,
            },
          },
          name: true,
          currValue: true,
        },
      });

      res.status(200).send({
        success: true,
        message: "Inventory successfully retrieved",
        data: objects,
      });
    } else {
      res.status(400).send({ success: false, message: "User not found" });
    }
  }
);

app.listen(process.env.SERVER_PORT, () => {
  console.log(`Server is running on port ${process.env.SERVER_PORT}`);
});

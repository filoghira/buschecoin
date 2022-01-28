import express, {json} from 'express';
import mysql from 'mysql';
import dotenv from 'dotenv';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';

import pkg from '@prisma/client';
const { PrismaClient } = pkg;

dotenv.config();

const prisma = new PrismaClient()

const app = express();
app.use(json());

app.get('/api/login', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const user =  await prisma.users.findFirst({
        where: {
            username: username,
        },
    });

    const hash = crypto.createHash('sha512').update(password).digest('hex');

    if (user == null)
        res.status(401).send({success: false, message: 'User not found'});
    else if (user.password != hash)
        res.status(401).send({success: false, message: 'Wrong password'});
    else {
        await prisma.users.updateMany({
            where: {
                username: username,
            },
            data: {
                last_login: new Date(),
            },
        });
        const token = jwt.sign({username: username, authLevel: user.authLevel}, process.env.JWT_SECRET);
        res.status(200).send({success: true, message: 'Login success',token: token});
        console.log(`${username} logged in`);
    }
});
    
app.listen(process.env.SERVER_PORT, () => {console.log(`Server is running on port ${process.env.SERVER_PORT}`)});
import express from 'express';
import { PrismaUsersRepository } from './repositories/prisma/prisma-users-repository';
import { SubmitUserUseCase } from './use-cases/submit-user-use-case';
export const routes = express.Router();

routes.post('/users/create', async (req, res) => {
    const { usuario, nome, senha } = req.body;

    const prismaUsersRepository = new PrismaUsersRepository();
    const submitUserUseCase = new SubmitUserUseCase(prismaUsersRepository);

    await submitUserUseCase.execute({
        usuario,
        nome,
        senha   
    });

    res.status(201).send();
})


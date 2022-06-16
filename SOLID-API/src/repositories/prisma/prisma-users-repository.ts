import { prisma } from "../../prisma";
import { UserCreateData, UsersRepository } from "../users-repository";

export class PrismaUsersRepository implements UsersRepository {
    async create({ usuario, nome, senha }: UserCreateData) {
        await prisma.usuario.create({
            data: {
                usuario,
                nome,
                senha
            }

        });
    };
}
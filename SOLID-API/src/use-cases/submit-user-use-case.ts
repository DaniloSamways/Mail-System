import { UsersRepository } from "../repositories/users-repository";

interface SubmitUserUseCaseRequest {
    usuario: string,
    nome: string,
    senha: string
}

export class SubmitUserUseCase {
    constructor(
        private usersRepository: UsersRepository
    ) {}

    async execute(request: SubmitUserUseCaseRequest) {
        const { usuario, nome, senha } = request;

        await this.usersRepository.create({
            usuario,
            nome,
            senha
        })
    }
}
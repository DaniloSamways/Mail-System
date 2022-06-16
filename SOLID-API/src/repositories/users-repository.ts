export interface UserCreateData {
    usuario: string,
    nome: string,
    senha: string
}

export interface UsersRepository {
    create: (data: UserCreateData) => Promise<void>;
}
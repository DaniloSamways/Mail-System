const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

class UserController {

    async show(req, res) {
        try {
            var users = await prisma.usuario.findMany();

        } catch (e) {
            res.status(400).json({
                error: true,
                message: "Não foi possível carregar os usuários"
            })
        }
        res.status(200).json({
            error: false,
            users
        })

    }

    async store(req, res) {
        let { usuario, nome, senha } = req.body

        // verifica se o usuário já existe
        let userVerify = await prisma.usuario.findUnique({
            where: {
                usuario
            }
        })
        if (!userVerify) {
            try {
                await prisma.usuario.create({
                    data: {
                        usuario,
                        nome,
                        senha
                    }
                })
            } catch (e) {
                return res.status(400).json({
                    error: true,
                    message: "Erro ao tentar cadastrar o usuário"
                })
            }

            return res.status(200).json({
                error: false,
                message: "Usuário cadastrado com Sucesso"
            })
        } else {
            res.status(400).json({
                error: true,
                message: "Usuário já cadastrado"
            })
        }
    }

    async update(req, res) {
        let { usuario, nome, senha } = req.body;
        try {
            await prisma.usuario.update({
                where: {
                    usuario
                },
                data: {
                    nome,
                    senha
                }
            })

        } catch (e) {
            res.status(400).json({
                error: true,
                message: "Não foi possível editar o usuário"
            })
        }
        res.status(200).json({
            error: false,
            message: "Usuário editado com sucesso"
        })
    }

    async delete(req, res) {
        let { usuario } = req.body;
        try {
            await prisma.usuario.delete({
                where: {
                    usuario
                }
            })

        } catch (e) {
            res.status(400).json({
                error: true,
                message: "Não foi possível deletar o Usuário"
            })
        }
        res.status(200).json({
            error: false,
            message: "Usuário excluido com sucesso"
        })
    }

    async login(req, res) {
        let { usuario, senha } = req.body;

        // verifica se os campos estão vazios
        if (usuario != "" || senha != "") {
            let user = await prisma.usuario.findFirst({
                where: {
                    usuario,
                    senha
                }
            })
            console.log(usuario, senha)
            if (user) {
                res.status(200).json({
                    error: false,
                    message: "Conectado"
                })
            } else {
                res.status(400).json({
                    error: true,
                    message: "Usuário ou Senha incorretos"
                })
            }
        } else {
            res.status(400).json({
                error: true,
                message: "Preencha todos os campos"
            })
        }
    }
}

module.exports = new UserController();
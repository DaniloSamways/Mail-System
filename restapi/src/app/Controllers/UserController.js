const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const jwt = require('jsonwebtoken')

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
        if ((nome == "" || senha == "") || (nome == null || senha == null)) {
            res.status(400).json({
                error: true,
                message: "Preencha todos os campos"
            })
        } else {
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
    }

    async delete(req, res) {
        let { usuario, usuarioAtivo } = req.body;
        if (usuario == usuarioAtivo) {
            res.status(400).json({
                error: true,
                message: "Não é possível excluir a si mesmo"
            })
        } else {
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
    }

    async login(req, res) {
        let { usuario, senha } = req.body;

        // verifica se os campos estão vazios
        if ((usuario != "" || senha != "") && (usuario != undefined || senha != undefined)) {
            let user = await prisma.usuario.findFirst({
                where: {
                    usuario,
                    senha
                }
            })
            if (user) {
                const token = jwt.sign({
                    usuario: usuario
                },
                    process.env.privateKEY,
                    {
                        expiresIn: "1h"
                    });

                return res.status(200).json({
                    error: false,
                    message: "Conectado",
                    token: token
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
        };

    }

    verifyJWT(req, res, next) {
        var token = req.headers['x-access-token'];
        if (!token) {
            return res.status(401).json({
                error: true,
                message: "Token não encontrado"
            })
        }

        jwt.verify(token, process.env.privateKEY, (err, decoded) => {
            if (err) {
                return res.status(401).json({
                    error: true,
                    message: "Token inválido",
                })
            } else {

                next()
            }
        })
    }

    auth(req, res) {
        var token = req.headers['x-access-token'];
        if (!token) {
            return res.status(401).json({
                error: true,
                message: "Token não encontrado"
            })
        } else {
            jwt.verify(token, process.env.privateKEY, (err, decoded) => {
                if (err) {
                    return res.status(401).json({
                        error: true,
                        message: "Token inválido"
                    })
                } else {
                    return res.status(200).json({
                        error: false,
                        message: "Token válido",
                        decoded
                    })
                }
            })
        }

    };
}

module.exports = new UserController();
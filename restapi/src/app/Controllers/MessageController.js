const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

class MessageController {

    async show(req, res) {
        let { usuario } = req.body
        try {
            var messages = await prisma.mensagem.findMany({
                where: {
                    destinatario: usuario
                }
            });
        } catch (e) {
            res.status(400).json({
                error: true,
                message: "Não foi possível carregar as mensagens"
            })
        }

        res.status(200).json({
            error: false,
            messages
        })
    }

    async store(req, res) {
        let { usuario, destinatario, assunto, mensagem } = req.body
        // verifica se os campos estão preenchidos
        if (destinatario != "" && assunto != "" && mensagem != "") {
            // verifica se o destinatario existe
            let destinatariosExists = await prisma.usuario.findUnique({
                where: {
                    usuario: destinatario
                }
            })
            if (destinatariosExists) {
                if(usuario != destinatario){
                    try {
                        await prisma.mensagem.create({
                            data: {
                                remetente: usuario,
                                destinatario,
                                assunto,
                                mensagem
                            }
                        })
    
                        res.status(200).send({
                            error: false,
                            message: "Mensagem enviada"
                        })
                    } catch (e) {
                        res.status(400).send({
                            error: true,
                            message: "Não foi possível enviar a mensagem"
                        })
                    }
                } else {
                    res.status(400).send({
                        error: true,
                        message: "Não é possível enviar mensagem para si mesmo"
                    })
                }
                
            } else {
                res.status(400).send({
                    error: true,
                    message: "Destinatário não encontrado"
                })
            }
        } else{
            return res.status(400).send({
                error:true,
                message: "Preencha todos os campos"
            })
        }
    }
}

module.exports = new MessageController();
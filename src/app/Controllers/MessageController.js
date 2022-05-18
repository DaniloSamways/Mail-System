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

    async store(req, res){
        let { usuario, destinatario, assunto, mensagem } = req.body

        // verifica se o destinatario existe
        let destinatariosExists = await prisma.usuario.findUnique({
            where: {
                usuario: destinatario
            }
        })
        if(destinatariosExists && usuario != destinatario){
            try{
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
            }catch(e){
                res.status(400).send({
                    error: true,
                    message: "Não foi possível enviar a mensagem"
                })
            }
        } else{
            res.status(400).send({
                error: true,
                message: "Destinatário não encontrado"
            })
        }
    }
}

module.exports = new MessageController();
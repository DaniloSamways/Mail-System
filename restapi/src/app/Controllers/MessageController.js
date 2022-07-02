const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

class MessageController {

    async show(req, res) {
        const { usuario, orderby, search } = req.body;
        try {
            if (orderby == "data") {
                var messages = await prisma.mensagem.findMany({
                    where: {
                        destinatario: usuario,
                        assunto: {
                            contains: search
                        }
                    },
                    orderBy: {
                        data: "desc"
                    }
                });
            } else {
                const messages = await prisma.mensagem.findMany({
                    where: {
                        destinatario: usuario,
                        assunto: {
                            contains: search
                        }
                    },
                    orderBy: {
                        assunto: "desc"
                    }
                });
            }
        } catch (e) {
            return res.status(400).json({ error: true, message: "Não foi possível carregar as mensagens" });
        }

        return res.status(200).json({ error: false, messages });
    }

    async store(req, res) {
        const { usuario, destinatario, assunto, mensagem } = req.body
        // verifica se os campos estão preenchidos
        if (destinatario && assunto && mensagem) {
            // verifica se o destinatario existe
            const destinatariosExists = await prisma.usuario.findUnique({
                where: {
                    usuario: destinatario
                }
            })
            if (destinatariosExists) {
                if (usuario !== destinatario) {
                    try {
                        let data = new Date().toLocaleDateString('pt-BR', {
                            timeZone: 'America/Sao_Paulo'
                        }).split('/');
                        const time = new Date().toLocaleTimeString('pt-BR', {
                            timeZone: 'America/Sao_Paulo'
                        }).split(':');
                        data = `${data[2]}-${data[1]}-${data[0]}T${time[0]}:${time[1]}:${time[2]}Z`

                        await prisma.mensagem.create({
                            data: {
                                remetente: usuario,
                                destinatario,
                                assunto,
                                mensagem,
                                data
                            }
                        })

                        return res.status(200).json({ error: false, message: "Mensagem enviada" });
                    } catch (e) {
                        return res.status(400).json({ error: true, message: "Não foi possível enviar a mensagem" });
                    }
                } else {
                    return res.status(400).json({ error: true, message: "Não é possível enviar mensagem para si mesmo" });
                }

            } else {
                return res.status(400).json({ error: true, message: "Destinatário não encontrado" });
            }
        } else {
            return res.status(400).json({ error: true, message: "Preencha todos os campos" });
        }
    }

    async delete(req, res) {
        const { messageId } = req.body;
        try {
            await prisma.mensagem.delete({
                where: {
                    id: messageId
                }
            });

        } catch (e) {
            return res.status(400).json({ error: true, message: "Não foi possível apagar a mensagem" });
        }
        return res.status(200).json({ error: false, message: "Mensagem apagada com sucesso" });
    }
}

module.exports = new MessageController();

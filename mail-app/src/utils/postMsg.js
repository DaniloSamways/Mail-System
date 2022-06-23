const axios = require('axios');

export default async function postMsg(usuario, destinatario, assunto, mensagem, token) {
    let post = axios.post('http://localhost:8080/message/store', {
        usuario,
        destinatario,
        assunto,
        mensagem,
    },
        {
            headers: {
                "x-access-token": token
            }
        })
        .then((res) => {
            return res.data
        })
        .catch((e) => {
            return e.response.data
        })
    return post
}
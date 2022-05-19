const axios = require('axios');

export default(usuario) => {
    let post = axios.post('http://localhost:8080/message/show', {
        usuario
    })
        .then((res) => {
            return res.data
        })
        .catch((e) => {
            return e.response.data
        })
    return post
}
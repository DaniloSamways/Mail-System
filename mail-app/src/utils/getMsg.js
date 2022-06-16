const axios = require('axios');

export default(usuario, token, orderby, search) => {
    let post = axios.post('http://localhost:8080/message/show', {
        usuario,
        orderby,
        search
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
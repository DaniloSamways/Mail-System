const axios = require('axios');

export default async function login(user, password) {
    let post = await axios.post('http://localhost:8080/user/login', {
        usuario: user,
        senha: password
    })
        .then((res) => {
            return res.data
        })
        .catch((e) => {
            return e.response.data
        })
    return post
}
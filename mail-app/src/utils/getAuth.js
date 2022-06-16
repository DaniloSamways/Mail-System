export default function getAuth(token) {
    axios.get('http://localhost:8080/user/auth',{
        headers: {
            "x-access-token": token
        }
    }).then((res) => {
        return res
    })
}
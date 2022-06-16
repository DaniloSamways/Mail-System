import axios from "axios";
import { useEffect, useState } from "react";
import Index from "../components/Index";


export default function Inbox() {
    const [usuario, setUsuario] = useState();
    const [logged, setLogged] = useState(false);
    const authParams = async () => {
        const token = localStorage.getItem("authToken");
        if (token) {
            const handle = await axios.get("http://localhost:8080/user/auth", {
                headers: {
                    'x-access-token': token
                }
            }).then((res) => {
                if (res.data.error == false) {
                    let user = res.data.decoded.usuario
                    setUsuario(user)
                    setLogged(true)
                    if(user === "admin"){
                        window.location.assign('/users')
                    }
                } else {
                    window.location.assign('/login')
                }
            }).catch((err) => {
                window.location.assign('/login')
            })
        } else {
            window.location.assign('/login')
        }
    }

    useEffect(() => {
        authParams();
    }, [])

    return (
        <>
            {logged && usuario != "admin" ? <Index usuario={usuario} /> : null}
        </>
    )
}   
import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import User from "../components/Users";

export default function Users() {
    const [usuario, setUsuario] = useState("");
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
                    setUsuario(res.data.decoded.usuario)
                    setLogged(true)
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
            {logged ? <><Navbar usuario={usuario} selected="users" /> <User usuario={usuario} /></> : null}
        </>
    );
}
import axios from "axios";
import { useEffect, useState } from "react";
import { useToasts } from "react-toast-notifications";
import styles from "../styles/Login.module.css";
import login from '../utils/login';

export default function Login() {
    let [user, setUser] = useState("");
    let [password, setPassword] = useState("");
    const { addToast } = useToasts()

    async function handleSubmit() {
        let handle = await login(user, password);
        // se retornar algum erro:
        if (handle.error == true) {
            addToast(handle.message, {
                appearance: 'error',
                autoDismiss: true,
            })
        } else {
            localStorage.setItem("authToken", handle.token);
            verifyToken()
        }

    }

    const verifyToken = async () => {
        let token = localStorage.getItem("authToken");
        if (token) {
            const handle = await axios.get("http://localhost:8080/user/auth", {
                headers: {
                    'x-access-token': token
                }
            }).then((res) => {
                if (res.data.error == false) {
                    console.log("logged in")
                    window.location.assign('/')
                } else {
                    console.log("not logged in")
                }
            }).catch((err) => {
                if (err.response.data) {
                    console.log("not logged in")
                }
            })
        }

    }

    useEffect(() => {
        verifyToken();
    }, [])

    return (
        <>
            <section className="w-4/6 mt-20 mx-auto h-full">
                <div className="border border-gray-300">
                    <div className="grid grid-cols-[35vw_auto]">
                        <div className={styles.login_img}></div>
                        <div className="mt-2">
                            <header>
                                <p className="text-center font-bold text-xl">Login</p>
                                <hr className={styles.hr} />
                            </header>
                            <main className="text-center mx-auto mb-5">
                                <input type="text" className={styles.input_login} placeholder="User" onChange={(e) => setUser(e.target.value)} />
                                <br />
                                <input type="password" className={styles.input_login} placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                                <br />
                                <input type="button" value="Login" className={styles.form_button} onClick={handleSubmit} />
                            </main>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
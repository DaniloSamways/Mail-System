import { useState } from "react";
import { useToasts } from 'react-toast-notifications';
import postMsg from "../utils/postMsg";
import styles from "../styles/Login.module.css";

export default function PostForm(props: any) {
    const { addToast } = useToasts()

    let [usuario, setUsuario] = useState(props.usuario);
    let [destinatario, setDestinatario] = useState("");
    let [assunto, setAssunto] = useState("");
    let [mensagem, setMensagem] = useState("");
    let [formModal, setFormModal] = useState("hidden");
    let [buttonModal, setButtonModal] = useState("");

    const handleSubmit = async () => {
        let token = localStorage.getItem("authToken");
        let handle = await postMsg(usuario, destinatario, assunto, mensagem, token)
        if (handle.error == true) {
            addToast(handle.message, {
                appearance: 'error',
                autoDismiss: true,
            })
        } else {
            addToast(handle.message, {
                appearance: 'success',
                autoDismiss: true,
            })
        }
    }

    return (
        <>
            <button onClick={() => {setFormModal(''), setButtonModal('hidden')}}
                className={`${buttonModal} border bottom-0 right-8 absolute px-10 py-2 rounded-tr-xl rounded-tl-xl bg-gray-100 border-gray-300 hover:bg-gray-300 transition duration-300`}>
                <div>
                    <div className="flex">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z">
                            </path>
                        </svg>
                        <b>New Mail</b>
                    </div>
                </div>
            </button>

            <div className={`${formModal} bottom-0 right-8 absolute border rounded border-indigo-200 w-1/4`}>
                <div className="mx-10 my-3">
                    <header className="text-center">
                        <p className="text-indigo-700">New Mail</p>
                        <hr/>
                    </header>
                    <main>
                        <div className="flex border rounded px-2">
                            <p className="font-semibold italic text-gray-500">To:</p>
                            <input type="text" className="ml-2 w-11/12 focus:outline-none" value={destinatario} onChange={(e) => setDestinatario(e.target.value)} />
                        </div>
                        <div className="flex border rounded px-2 mt-2">
                            <p className="font-semibold italic text-gray-500">Subject:</p>
                            <input type="text" className="ml-2 w-11/12 focus:outline-none" value={assunto} onChange={(e) => setAssunto(e.target.value)} />
                        </div>
                        <div className="flex border rounded px-2 mt-2">
                            <p className="font-semibold italic text-gray-500">Message:</p>
                            <textarea rows={4} className="text-sm pt-0.5 ml-2 w-11/12 focus:outline-none resize-none" value={mensagem} onChange={(e) => setMensagem(e.target.value)} ></textarea>
                        </div>
                        <div className="flex justify-end">
                            <button className={styles.form_button} onClick={() => {setButtonModal(""), setFormModal("hidden")}}>Cancel</button>
                            <button className={`${styles.form_button} !bg-indigo-700`} onClick={() => {setButtonModal(""), setFormModal("hidden"), handleSubmit()}}>Send</button>
                        </div>
                    </main>
                </div>
            </div>
        </>
    )
}
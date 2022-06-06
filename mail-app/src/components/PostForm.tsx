import { useState } from "react";
import { useToasts } from 'react-toast-notifications';
import postMsg from "../utils/postMsg";

export default function PostForm(props: any) {
    const { addToast } = useToasts()

    let [usuario, setUsuario] = useState(props.usuario);
    let [destinatario, setDestinatario] = useState("");
    let [assunto, setAssunto] = useState("");
    let [mensagem, setMensagem] = useState("");

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
            Destinatário <input type="text" onChange={(e) => setDestinatario(e.target.value)} /> <br />
            Assunto <input type="text" onChange={(e) => setAssunto(e.target.value)} /> <br />
            Mensagem <input type="text" onChange={(e) => setMensagem(e.target.value)} /> <br />
            <button onClick={() => handleSubmit()}>Enviar</button>
        </>
    )
}
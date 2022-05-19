import { useState } from "react";
import Swal from "sweetalert2";
import postMsg from "../utils/postMsg";

export default function PostForm(props: any) {
    let [usuario, setUsuario] = useState(props.usuario);
    let [destinatario, setDestinatario] = useState("");
    let [assunto, setAssunto] = useState("");
    let [mensagem, setMensagem] = useState("");

    const handleSubmit = async () => {
        let handle = await postMsg(usuario, destinatario, assunto, mensagem)
        if (handle.error == true) {
            Swal.fire({
                icon: 'error',
                text: handle.message
            })
        } else {
            Swal.fire({
                icon: 'success',
                text: handle.message
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
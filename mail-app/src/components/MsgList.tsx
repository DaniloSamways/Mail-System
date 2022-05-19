import { useEffect, useState } from "react";
import getMsg from "../utils/getMsg";

type Message = {
    usuario: string,
    id: number,
    remetente: string,
    destinatario: string,
    assunto: string,
    mensagem: string
}

export default function MsgList(props: any) {
    let [usuario, setUsuario] = useState(props.usuario);
    let [messages, setMessages] = useState<Message[]>([])

    const handleGetMsg = async () => {
        let get = await getMsg(usuario);
        setMessages(get.messages)
        console.log(get.messages)
    }

    useEffect(() => {
        handleGetMsg();
    }, [])

    return (
        <>
            {messages.map((msg) => (
                <div key={msg.id}>
                    <h3>From: {msg.remetente}</h3>
                    <h3>{msg.assunto}</h3>
                </div>
            ))
            }
        </>
    )
}
import { useEffect, useState } from "react";
import styles from '../styles/MsgList.module.css';
import getMsg from "../utils/getMsg";

export default function MsgList(props: any) {
    let [usuario, setUsuario] = useState(props.usuario);
    let [messages, setMessages] = useState([])

    const handleGetMsg = async () => {
        let token = localStorage.getItem("authToken");
        let get = await getMsg(usuario, token);
        setMessages(get.messages)
    }

    useEffect(() => {
        handleGetMsg();
    }, [])

    return (
        <>
            <main className={styles.main_height}>
                <div>
                    {messages.map((msg: any) => (
                        <div key={msg.id}
                            className="cursor-default grid text-lg grid-cols-[8rem_auto_6vw] transition-all hover:bg-[#f8f8f8] duration-300">
                            <p className={`pl-2 truncate font-semibold ${styles.message_border}`}>{msg.remetente}</p>
                            <p className={`truncate w-full font-semibold ${styles.message_border}`}>{msg.assunto}
                                <b className="font-normal text-gray-400 "> - {msg.mensagem}</b>
                            </p>
                            <p className={`pl-2 w-auto ${styles.message_border}`}><b className="text-xs font-semibold">{msg.data}</b></p>
                        </div>
                    ))}

                </div>

            </main>
        </>
    )
}
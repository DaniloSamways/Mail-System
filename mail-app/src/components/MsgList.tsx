import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import styles from '../styles/MsgList.module.css';
import getMsg from "../utils/getMsg";
import Modal from "react-modal";

export default function MsgList(props: any) {
    let [usuario, setUsuario] = useState(props.usuario);
    let [messages, setMessages] = useState([])
    let [token, setToken] = useState('')

    let [messageData, setMessageData] = useState({})

    const handleGetMsg = async () => {
        let token = localStorage.getItem("authToken") || '';
        setToken(token)
        let get = await getMsg(usuario, token, props.orderby, props.search);
        setMessages(get.messages)
    }

    useEffect(() => {
        handleGetMsg();
    }, [props.orderby, props.search])

    const formatDate = (date: string) => {
        date = date.slice(0, -14);
        let year = date.substring(0, 4);
        let month = date.substring(7, 5);
        let day = date.substring(10, 8);

        return `${day}/${month}/${year}`;
    }

    const handleDeleteMsg = (msgId: string) => {
        console.log(msgId)
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })

        Swal.fire({
            title: 'Are you sure?',
            text: "Are you sure you want to delete this message?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete('http://localhost:8080/message/delete', {
                    headers: {
                        'x-access-token': token
                    },
                    data: {
                        messageId: msgId
                    }
                }).then((res) => {
                    Toast.fire({
                        icon: 'success',
                        title: 'Message deleted successfully'
                    })
                    handleGetMsg();
                }).catch((e) => {
                    Toast.fire({
                        icon: 'error',
                        title: `${e.response.data.message}`
                    })
                })
            }
        })
    }

    const [viewMessageModalIsOpen, SetViewMessageModalIsOpen] = useState(false);
    function openViewMessageModal(remetente, assunto, mensagem, data) {
        setMessageData({
            remetente,
            assunto,
            mensagem,
            data
        })
        SetViewMessageModalIsOpen(true);
    }
    function closeViewMessageModal() {
        SetViewMessageModalIsOpen(false);
        setMessageData({})
    }

    return (
        <>
            <main className={styles.main_height}>
                <div>
                    {messages.map((msg: any) => (
                        <>
                            <Modal
                                isOpen={viewMessageModalIsOpen}
                                onRequestClose={closeViewMessageModal}
                                style={{
                                    content: {
                                        width: "50%",
                                        height: "50%",
                                        top: "50%",
                                        left: "50%",
                                        right: "auto",
                                        bottom: "auto",
                                        marginRight: "-50%",
                                        transform: "translate(-50%, -50%)"
                                    }
                                }}
                            >
                                <h1><b>Sender</b></h1>
                                <p>{messageData.remetente}</p>
                                <br/>
                                <h1><b>Subject</b></h1>
                                <p>{messageData.assunto}</p>
                                <br/>
                                <h1><b>Message</b></h1>
                                <p>{messageData.mensagem}</p>
                                <br/>
                                <h1><b>Date</b></h1>
                                <p>{Intl.DateTimeFormat('pt-BR', {timeZone: 'UTC'}).format(messageData.date)}</p>
                                <br/>
                            </Modal>
                            <div key={msg.id}
                                className="cursor-default grid text-lg grid-cols-[2rem_8rem_auto_6vw] transition-all hover:bg-[#e4e4e4] duration-300 items-center"
                            >

                                <button onClick={() => handleDeleteMsg(msg.id)} className="ml-1"><svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg></button>
                                <p className={`truncate font-semibold ${styles.message_border}`}
                                    onClick={() => openViewMessageModal(msg.remetente, msg.assunto, msg.mensagem, msg.data)}
                                >
                                    {msg.remetente}
                                </p>
                                <p className={`truncate w-full font-semibold ${styles.message_border}`}
                                    onClick={() => openViewMessageModal(msg.remetente, msg.assunto, msg.mensagem, msg.data)}
                                >{msg.assunto}
                                    <b className="font-normal text-gray-400 "> - {msg.mensagem}</b>
                                </p>
                                <p className={`pl-1 w-auto ${styles.message_border}`}
                                    onClick={() => openViewMessageModal(msg.remetente, msg.assunto, msg.mensagem, msg.data)}
                                >
                                    <b className="text-xs font-semibold">{formatDate(msg.data)}</b>
                                </p>
                            </div>
                        </>
                    ))}

                </div>

            </main>
        </>
    )
}
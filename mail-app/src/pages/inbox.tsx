import { useState } from "react";
import MsgList from "../components/MsgList";
import PostForm from "../components/postForm";

export default function Inbox() {
    const [usuario, setUsuario] = useState('admin')

    return (
        <>
            <h3>@{usuario}</h3>
            <h1>Inbox</h1>
            <MsgList usuario={usuario} />
            <div>
                <PostForm usuario={usuario} />
            </div>
            {usuario == "admin" ? <button>Novo Usuario</button> : null}
        </>
    )
}   
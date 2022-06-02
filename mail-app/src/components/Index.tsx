import Navbar from "./Navbar";
import PostForm from "./PostForm";

export default function Index(props: any) {
    return (
        <>
            <Navbar usuario={props.usuario} />
            {/* <Inbox usuario={usuario}/> */}
            <div>
                <PostForm usuario={props.usuario} />
            </div>
            {props.usuario == "admin" ? <button>Novo Usuario</button> : null}
        </>
    )
}


import Inbox from "./Inbox";
import Navbar from "./Navbar";
import PostForm from "./PostForm";

export default function Index(props: any) {
    return (
        <>
            <Navbar usuario={props.usuario} selected="inbox"/>
            <Inbox usuario={props.usuario} />
            <div>
                <PostForm usuario={props.usuario} />
            </div>
        </>
    )
}
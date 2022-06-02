    
export default function Inbox(props: any) {
    return (
        <div className={styles.center_div}>
            <h1>Inbox</h1>
            <MsgList usuario={props.usuario} />
        </div>
    )
}
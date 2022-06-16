import Link from "next/link"
import styles from "../styles/Login.module.css"

export default function Navbar(props: any) {
    let admin = "admin"

    return (
        <header className="h-16 flex items-center border-b border-gray-200">
            <aside className="px-4 flex items-center justify-center">
                <svg className="w-6 h-6 text-indigo-700" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                </svg>
                <h1 className="text-xl text-indigo-700">YourMail</h1>
            </aside>
            <nav className="h-full flex-1 flex items-center justify-center">
                <ul className="flex space-x-3 h-16">


                    {props.usuario == admin ? (
                        <li className={props.selected == "users" ? "h-16 flex border-b-2 border-indigo-700 items-center" : "text-gray-300 h-16 flex items-center"}>
                            <Link href="users">
                                <a>Users</a>
                            </Link>
                        </li>
                    ) : <li className={props.selected == "inbox" ? "h-16 flex border-b-2 border-indigo-700 items-center" : "text-gray-300 h-16 flex items-center"}>
                        <Link href="/">
                            <a>Inbox</a>
                        </Link>
                    </li>}

                </ul>
            </nav>
            <aside className="px-4 flex items-center justify-center">
                <h1><b className="text-indigo-300 mr-1">@</b>{props.usuario}</h1>
                <Link href="login"><button className={`${styles.form_button} !m-0 !ml-1 flex !px-1 !bg-red-500`} onClick={() => localStorage.removeItem('authToken')}><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg></button>
                </Link>
            </aside>
        </header>
    )
}
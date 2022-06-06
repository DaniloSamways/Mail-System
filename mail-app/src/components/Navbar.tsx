import Link from "next/link"

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
                    <li className={props.selected == "inbox" ? "h-16 flex border-b-2 border-indigo-700 items-center" : "text-gray-300 h-16 flex items-center"}>
                        <Link href="/">
                            <a>Inbox</a>
                        </Link>
                    </li>

                    {props.usuario == admin ? (
                        <li className={props.selected == "users" ? "h-16 flex border-b-2 border-indigo-700 items-center" : "text-gray-300 h-16 flex items-center"}>
                            <Link href="users">
                                <a>Users</a>
                            </Link>
                        </li>
                    ) : null}

                </ul>
            </nav>
            <aside className="px-4 flex items-center justify-center">
                <h1><b className="text-indigo-300 mr-1">@</b>{props.usuario}</h1>
            </aside>
        </header>
    )
}
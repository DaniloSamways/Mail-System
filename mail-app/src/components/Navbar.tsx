import styles from './Navbar.module.css'

export default function Navbar(props: any) {
    return (
        <nav>
            <div className={styles.navbar}>
                <div>
                    <li><b>@</b>{props.usuario}</li>
                </div>
                <div className={styles.navbar_center}>
                    <svg fill="currentColor"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" /><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" /></svg>
                    <a href="#" className={styles.logo}>YourMail</a>
                </div>
            </div>
        </nav>
    )
}
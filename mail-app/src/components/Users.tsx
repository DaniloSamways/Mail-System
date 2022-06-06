import axios from 'axios';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import styles from '../styles/Login.module.css';

export default function User(props: any) {
    const [hideText, setHideText] = useState(styles.hidetext);
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    const handleGetUsers = async () => {
        let token = localStorage.getItem('authToken') || '';
        let get = await axios.get('http://localhost:8080/user/show',
            {
                headers: {
                    "x-access-token": token
                }
            })
            .then((res) => {
                return res.data.users
            })
            .catch((e) => {
                return e.response.data
            })
        setUsers(get)
    }

    let handleDelete = (user: string) => {
        let token = localStorage.getItem('authToken') || '';
        Swal.fire({
            title: `Are you sure to delete <b>${user}</b>?`,
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Confirm'
        }).then((result) => {
            if (result.isConfirmed) {
                let token = localStorage.getItem('authToken') || '';
                axios.delete('http://localhost:8080/user/delete',
                    {
                        headers: {
                            "x-access-token": token
                        },
                        data: {
                            "usuario": user,
                            "usuarioAtivo": props.usuario
                        }
                    })
                    .then((res) => {
                        Swal.fire(
                            'Deleted!',
                            `${user} has been deleted.`,
                            'success'
                        )
                        handleGetUsers()
                        return res.data.users
                    })
                    .catch((e) => {
                        Swal.fire(
                            'Error!',
                            `${e.response.data.message}`,
                            'error'
                        )
                        return e.response.data
                    })
                    
            }
        })
    }

    let handleNewUser = async () => {
        setName();
        setPassword();
        setUser();
        Swal.fire({
            title: `New User</b>`,
            html:
                `<input id="swal-input1" placeholder="User" class="swal2-input" value="${user}">` +
                `<input id="swal-input1" placeholder="Name" class="swal2-input" value="${name}">` +
                `<input id="swal-input3" placeholder="Password" class="swal2-input" value="${password}">`,
            showCancelButton: true,
            confirmButtonColor: '#616161',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Confirm',
        }).then(result => {
            if (result.isConfirmed) {
                let token = localStorage.getItem('authToken') || '';
                axios.put('http://localhost:8080/user/update',
                    {
                        headers: {
                            "x-access-token": token
                        },
                        data: {
                            "usuario": user,
                            "usuarioAtivo": props.usuario,
                            "nome": name,
                            "senha": password
                        }
                    })
                    .then((res) => {
                        Swal.fire(
                            'Edited!',
                            `User successfully edited.`,
                            'success'
                        )
                        handleGetUsers()
                        return res.data.users
                    })
                    .catch((e) => {
                        Swal.fire(
                            'Error!',
                            `${e.response.data.message}`,
                            'error'
                        )
                        return e.response.data
                    })
            }
        })
    }

    let handleEdit = async (user: string, name: string, password: string) => {
        setName(name);
        setPassword(password);
        Swal.fire({
            title: `Edit <b>${user}</b>`,
            html:
                `<input id="swal-input1" placeholder="Nome" class="swal2-input" value="${name}">` +
                `<input id="swal-input3" placeholder="Senha" class="swal2-input" value="${password}">`,
            showCancelButton: true,
            confirmButtonColor: '#616161',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Confirm',
        }).then(result => {
            if (result.isConfirmed) {
                let token = localStorage.getItem('authToken') || '';
                axios.put('http://localhost:8080/user/update',
                    {
                        headers: {
                            "x-access-token": token
                        },
                        data: {
                            "usuario": user,
                            "usuarioAtivo": props.usuario,
                            "nome": name,
                            "senha": password
                        }
                    })
                    .then((res) => {
                        Swal.fire(
                            'Edited!',
                            `User successfully edited.`,
                            'success'
                        )
                        handleGetUsers()
                        return res.data.users
                    })
                    .catch((e) => {
                        Swal.fire(
                            'Error!',
                            `${e.response.data.message}`,
                            'error'
                        )
                        return e.response.data
                    })
            }
        })
    }

    useEffect(() => {
        handleGetUsers();
    }, [])

    return (
        <main className="w-4/6 mt-5 m-auto">
            <section>
                <div className="rounded border border-gray-300 p-3">
                    <div className="mx-3">
                        <header className="mb-2 grid-cols-3 grid">
                            <div>
                                <p className="text-2xl font-semibold">Users</p>
                                <p className="font-normal text-gray-400">1 user</p>
                            </div>
                            <div className="text-right mx-8 col-span-2 my-auto">
                                <label htmlFor="search-input" className="text-xs">SEARCH</label>
                                <input id="search-input" type="text" placeholder="Search..."
                                    className="border-2 rounded-lg px-2 mr-4"></input>

                                <label htmlFor="select" className="text-xs">ORDER BY</label>
                                <select id="select" className="border-2 rounded-[10px]">
                                    <option selected>user</option>
                                </select>

                                <button className={`!bg-indigo-700 ${styles.form_button}`} onClick={() => handleNewUser()}>New User</button>
                            </div>
                        </header>
                        <hr />
                        <main className={styles.main_height}>
                            <div>
                                <table className="w-9/12 mx-auto">
                                    <thead className="text-left">
                                        <tr>
                                            <th>User</th>
                                            <th>Username</th>
                                            <th className="flex">Password <svg className="w-6 h-6 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg" onClick={() => hideText == styles.hidetext ? setHideText("") : setHideText(styles.hidetext)}>
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z">
                                                </path>
                                            </svg></th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users.map((user: any) => (
                                            <tr key={user.usuario}>
                                                <td className="py-2">{user.usuario}</td>
                                                <td>{user.nome}</td>
                                                <td className="flex">
                                                    <p className={hideText}>{user.senha}</p>
                                                </td>
                                                <td>
                                                    <button className={`${styles.form_button} !mt-0 !bg-red-400`} onClick={() => handleDelete(user.usuario)}>Delete</button>
                                                    <button className={`${styles.form_button} !mt-0 !bg-blue-400`} onClick={() => handleEdit(user.usuario, user.nome, user.senha)}>Edit</button>
                                                </td>
                                            </tr>
                                        ))}

                                    </tbody>
                                </table>
                            </div>
                        </main>
                    </div>
                </div>
            </section>
        </main>
    )
}
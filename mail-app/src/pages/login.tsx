import type { NextPage } from 'next';
import { useState } from 'react';
import Swal from 'sweetalert2';
import login from '../utils/login';

const Home: NextPage = () => {
  let [user, setUser] = useState("");
  let [password, setPassword] = useState("");

  async function handleSubmit() {
    let handle = await login(user, password);
    // se retornar algum erro:
    if (handle.error == true) {
      Swal.fire({
        icon: 'error',
        text: handle.message
      })
    } else{
      // logado
    }
  }

  return (
    <>
      <input type="text" placeholder='Usuário' onChange={(e) => setUser(e.target.value)} />
      <br />
      <input type="password" placeholder='Senha' onChange={(e) => setPassword(e.target.value)} />
      <br />
      <button onClick={handleSubmit}>Entrar</button>
    </>
  )
}

export default Home

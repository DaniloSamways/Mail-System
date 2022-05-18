import axios from 'axios';
import type { NextPage } from 'next';
import { useState } from 'react';

const Home: NextPage = () => {
  let [user, setUser] = useState("");
  let [password, setPassword] = useState("");

  async function handleSubmit() {
    axios.post('http://localhost:8080/user/login', {
      usuario: user,
      senha: password
    })
      .then((res) => {
        console.log(res.data)
      })
      .catch((e) => {
        console.log(e.response.data);
      })
      .then(() => {

      })
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

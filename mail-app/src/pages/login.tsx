import axios from 'axios';
import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { useToasts } from 'react-toast-notifications';
import login from '../utils/login';

const Home: NextPage = () => {
  let [user, setUser] = useState("");
  let [password, setPassword] = useState("");
  const { addToast } = useToasts()

  async function handleSubmit() {
    let handle = await login(user, password);
    // se retornar algum erro:
    if (handle.error == true) {
      addToast(handle.message, {
        appearance: 'error',
        autoDismiss: true,
      })
    } else {
      localStorage.setItem("authToken", handle.token);
      verifyToken()
    }
  }

  const verifyToken = async () => {
    let token = localStorage.getItem("authToken");
    if(token){
      const handle = await axios.get("http://localhost:8080/user/auth", {
        headers: {
          'x-access-token': token
        }
      }).then((res) => {
        if(res.data.error == false){
          console.log("logged in")
          window.location.assign('/')
        }else{
          console.log("not logged in")
        }
      }).catch((err) => {
        if(err.response.data){
          console.log("not logged in")
        }
      })
    }
    
  }

  useEffect(() => {
    verifyToken();
  }, [])

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

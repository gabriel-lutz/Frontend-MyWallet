import styled from "styled-components"
import axios from "axios"
import { Link, useHistory } from "react-router-dom"
import {useState, useContext, useEffect} from "react"
import UserContext from "../../contexts/UserContext"

export default function Login(){
    const {setUserData} = useContext(UserContext)
    const [data, setData] = useState({})
    const history = useHistory()

    useEffect(() => {
        if(JSON.parse(localStorage.getItem('mywalletUserData'))!==null){
            setUserData(JSON.parse(localStorage.getItem('mywalletUserData')))
            history.push("/balance")
        }
	}, [history,setUserData]);

    function login(e){
        e.preventDefault()
        if(!data.email || !data.password){
            return alert("Preencha o campo de E-mail e Senha")
        
        }
        const promisse = axios.post("http://192.168.0.106:4000/login", data)
        promisse.then(data=>{
            setUserData({name: data.data.name, token: data.data.token})
            localStorage.setItem('mywalletUserData', JSON.stringify(data.data));
            history.push('/balance')
        })
        promisse.catch(()=>{
            alert("email ou senha incorretos, tente novamente.")
        })
    }

    return(
        <Conteiner>
            <h1>
                MyWallet
            </h1>
            <form onSubmit={login}>
                <Input placeholder='E-mail' onChange={e=>setData({...data, email: e.target.value})}></Input>
                <Input type='password' placeholder='Senha' onChange={e=>setData({...data, password: e.target.value})}></Input>
                <Button onClick={login}>Entrar</Button>
            </form>
            <Link to='/register'>
                Primeira vez? Cadastre-se!
            </Link>
        </Conteiner>
    )
}

const Conteiner = styled.div`
    display: flex;
    flex-direction: column;
    align-items:center;
    h1{
        color:white;
        font-size: 34px;
        font-family: 'Saira Stencil One';
        margin-top:159px;
        margin-bottom:35px;
    }
    form{
        width: 100%;
        display:flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 36px ;
    }
    a{
    text-decoration: none;
    color:white;
    font-family: 'Raleway', sans-serif;
}
`

const Input = styled.input`
    width: 100%;
    max-width: 326px;
    padding: 15px;
    height:58px;
    margin-bottom:13px;
    border-radius: 5px;
    border: none;
    font-size: 20px;
    outline: none;
    color:black;
    &::placeholder{
        color:#bbbbbb;
    }
`

const Button = styled.button`
    width: 100%;
    max-width: 326px;
    height:46px;
    border-radius:5px;
    background-color:#A328D6;
    border:none;
    outline:none;
    font-size: 20px;
    color:white;
    font-weight: 700;
`
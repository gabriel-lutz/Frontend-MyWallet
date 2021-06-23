import styled from "styled-components"
import { Link, useHistory } from "react-router-dom"
import { useState } from "react"
import axios from "axios"
export default function Register(){
    const [data, setData] = useState({name:'', email:'', password:'', confirmPassword:'' })
    const [disabled, setDisabled] = useState(false)
    const history = useHistory()

    function register(e){
        e.preventDefault()
        if(!data.name || !data.email || !data.password || !data.confirmPassword){
            return alert("Todos os campos precisam ser preenchidos!")
        }else if(data.password !== data.confirmPassword){
            return alert("Você não confirmou a sua senha com sucesso")
        }
        setDisabled(!disabled)
        const promisse = axios.post("http://192.168.2.11:4000/register", data)
        promisse.then(()=>{
            setDisabled(!disabled)
            history.push('/')
        })
        promisse.catch(()=>{
            setDisabled(!disabled)
            alert("Parece que houve um erro ao criar a sua conta. Tente novamente.")
        })

    }

    return(
        <Conteiner>
            <h1>
                MyWallet
            </h1>
            <form onSubmit={register}>
                <Input placeholder='Nome' onChange={e=>setData({...data, name: e.target.value})}></Input>
                <Input placeholder='E-mail' onChange={e=>setData({...data, email: e.target.value})}></Input>
                <Input type='password' placeholder='Senha' onChange={e=>setData({...data, password: e.target.value})}></Input>
                <Input type='password' placeholder='Confirme a senha' onChange={e=>setData({...data, confirmPassword: e.target.value})}></Input>
                <Button onClick={register}>Entrar</Button>
            </form>
            <Link to='/'>
                Ja tem uma conta? Entre agora!
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
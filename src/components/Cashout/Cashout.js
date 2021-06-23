import styled from "styled-components"
import {useState, useContext} from "react"
import { useHistory } from "react-router-dom"
import UserContext from "../../contexts/UserContext"
import axios from "axios"

export default function Cashout(){
    const {userData} = useContext(UserContext)
    const [data, setData] = useState({})
    const history = useHistory()
    const header = {
        headers: {"Authorization": `${userData.token}`}
    }

    function registerCashout(e){
        e.preventDefault()
        const object = {
            ...data, 
            operation: "cashout",
        }
        const promisse = axios.post('http://192.168.2.11:4000/registerOperation', object, header)
        promisse.then(()=>{
            history.push("/balance")
        })
        promisse.catch(()=>{
            alert("Houve um erro ao registrar a operação. Tente novamente")
        })
    }

    return(
        <Conteiner>
            <h1>Nova Saida</h1>
            <form onSubmit={registerCashout}>
                <Input type="number" placeholder='Valor' onChange={e=>setData({...data, ammount: e.target.value})} ></Input>
                <Input placeholder='Descrição' onChange={e=>setData({...data, description: e.target.value})} ></Input>
                <Button onClick={registerCashout}>Salvar saida</Button>
            </form>
                <CancelButton onClick={()=>{history.push("/balance")}}>Cancelar</CancelButton>
        </Conteiner>
    )
}

const Conteiner = styled.div`
    display: flex;
    flex-direction: column;
    align-items:left;
    
    h1{
        color:white;
        font-size: 26px;
        font-family: 'Raleway', sans-serif;
        font-weight: 700;
        margin-top:25px;
        margin-bottom:40px;
        padding-left: 25px;
    }
    form{
        width: 100%;
        display:flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 15px ;
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

const CancelButton = styled.div`
    width: 100%;
    max-width: 326px;
    height:46px;
    border-radius:5px;
    background-color:;
    border:none;
    outline:none;
    font-size: 20px;
    color:white;
    font-weight: 700;
    text-align: center;
    padding:12px;
    margin-left: 25px;;
`
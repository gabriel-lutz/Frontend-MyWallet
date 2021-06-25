import {AiOutlineExport, AiOutlineMinusCircle, AiOutlinePlusCircle} from "react-icons/ai"
import {useState, useContext, useEffect} from "react"
import { useHistory, Link } from "react-router-dom"
import styled from "styled-components"
import axios from "axios"

import UserContext from "../../contexts/UserContext"
import Operation from "./Operation/Operation"

export default function Balance(){
    const {userData, setUserData} = useContext(UserContext)
    const [operationsData, setOperationsData] = useState()
    const [balance, setBalance] = useState(0)
    const [isNegative, setIsNegative] = useState(false)
    const history = useHistory()
    
    useEffect(() => {
        if(JSON.parse(localStorage.getItem('mywalletUserData'))!==null){
            setUserData(JSON.parse(localStorage.getItem('mywalletUserData')))
        }else{
            history.push('/')
        }
	}, [history,setUserData]);
    
    useEffect(()=>{
        const header = {
            headers: {"Authorization": `${userData.token}`}
        }
        const promisse = axios.get('http://192.168.2.11:4000/balance', header)
        promisse.then(data=>{
            setOperationsData(data.data)
            calcBalance(data.data)
        })
        promisse.catch(data=>{
            if(data.response.status === 401){
                localStorage.clear()
                history.push('/')
            }
        })
    }, [history, userData.token])

    function calcBalance(operationsData){
        let total = 0
        operationsData && operationsData.forEach(o => {
            if(o.operation === 'cashin'){
                total += o.ammount
            }else{
                total -= o.ammount
            }    
        })
        total = total/100
        setBalance(total.toLocaleString("pt-BR", {style:"currency", currency:"BRL"}))
        setIsNegative(total<0? true : false)    
    }

    function logout(){
        const header = {
            headers: {"Authorization": `${userData.token}`}
        }
        const promisse = axios.post("http://192.168.2.11:4000/logout", {}, header)
        promisse.then(()=>{
            localStorage.clear()
            history.push('/')
        })
    }

    return(
        <Conteiner>
            <NameWrapper>
                <Name>Olá, {userData.name}</Name>
                <AiOutlineExport onClick={logout} />
            </NameWrapper> 
            <BalanceBox hasOperations={operationsData && operationsData.length && true}  >
                {operationsData && operationsData.length?
                    <>
                        <OperationsWrapper>
                            {operationsData.map(o=> <Operation key={o.id} operation={o}/>)}
                        </OperationsWrapper>
                        <TotalBalance isNegative={isNegative}>
                            <p>SALDO</p>
                            <p> {balance}</p>
                        </TotalBalance>
                    </>
                    :<p>Não há registros de <br/>entrada ou saída </p>
                }
            </BalanceBox>
            <ButtonsWrapper>
                <Link to='/cashin'>
                    <Button>
                        <AiOutlinePlusCircle></AiOutlinePlusCircle>
                        <p>Nova <br/> entrada</p>
                    </Button>
                </Link>
                <Link to='/cashout'>
                    <Button>
                        <AiOutlineMinusCircle></AiOutlineMinusCircle>
                        <p>Nova <br/> saida </p>
                    </Button>
                </Link>
            </ButtonsWrapper>
        </Conteiner>
    )
}

const Conteiner = styled.div`
    display: flex;
    flex-direction: column;
    align-items:center;
    a{
        text-decoration: none;
        color:white;
        font-family: 'Raleway', sans-serif;
    }
`

const NameWrapper = styled.div`
    display:flex;
    justify-content: space-between;
    padding: 0 24px;
    margin: 25px 0;
    height:auto;
    font-family: 'Raleway', sans-serif;
    width:100%;
    max-width: 375px;
    svg{
        color:white;
        font-size:28px;
    }
`

const Name = styled.h1`
    font-size: 26px ;
    font-weight:700;
    color:white;
`
const BalanceBox = styled.div`
    width:326px;
    background:white;
    height: 446px;
    border-radius:5px;
    padding: 20px 10px;
    display:flex;
    flex-direction: column;
    justify-content: ${props => props.hasOperations? "space-between" : "center"};
    align-items: center;
    &>p{
        font-size:23,5px;
        color: #868686;
        font-family: 'Raleway', sans-serif;
        text-align: center;
    }
`
const ButtonsWrapper = styled.div`
    display: flex;
    width:100%;
    max-width: 375px;
    justify-content: space-between;
    padding: 0 25px ;
    margin-top: 13px;
`

const Button = styled.button`
    display:flex;
    padding:10px;
    flex-direction: column;
    justify-content: space-between;
    width:155px;
    height: 114px;
    background: #A328D6;
    border: none;
    outline: none;
    border-radius:5px;
    color:white;
    font-family: 'Raleway', sans-serif;
    font-size:17px;
    font-weight: 700;
    text-align:left;
    svg{
        font-size: 25px;
    }
`

const OperationsWrapper = styled.div`
    width:100%;
    height:100%;
    overflow: scroll;
    &::-webkit-scrollbar{
        display:none;
    }
`

const TotalBalance = styled.div`
    width:100%;
    display:flex;
    margin-top: 15px;
    justify-content: space-between;
    align-items: center;
    font-size:17px;
    p:first-child{
        color:black ;
        font-family: 'Raleway', sans-serif;
        font-weight:700;
    }
    p:last-child{
        color:${props => props.isNegative? "#C70000": "#03AC00"};
        font-family: 'Raleway', sans-serif;
    }
    
`

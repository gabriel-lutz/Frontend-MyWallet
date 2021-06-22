import styled from "styled-components"
import {AiOutlineExport, AiOutlineMinusCircle, AiOutlinePlusCircle} from "react-icons/ai"
import {useState, useContext} from "react"
import { Link } from "react-router-dom"
import UserContext from "../../contexts/UserContext"

export default function Balance(){
    const {userData} = useContext(UserContext)
    return(
        <Conteiner>
            <NameWrapper>
                <Name>Olá, {userData.name}</Name>
                <AiOutlineExport />
            </NameWrapper>
            <BalanceBox>

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
}`

const NameWrapper = styled.div`
    display:flex;
    justify-content: space-between;
    padding: 0 24px;
    margin: 25px 0;
    height:auto;
    font-family: 'Raleway', sans-serif;
    width:100%;
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
`
const ButtonsWrapper = styled.div`
    display: flex;
    width:100%;
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

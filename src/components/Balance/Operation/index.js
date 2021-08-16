import styled from "styled-components"
import dayjs from "dayjs"

export default function Operation({operation}){
	return(
		<Conteiner operation={operation.operation === "cashin"}>
			<Wrapper >
				<p>{dayjs(operation.date).format("DD/MM")}</p>
				<p>{operation.description}</p>
			</Wrapper>
			<p>{(operation.ammount/100).toLocaleString("pt-BR", {style:"currency", currency:"BRL"})}</p>
		</Conteiner>
	)

}

const Conteiner = styled.div`
    display:flex;
    justify-content: space-between;
    font-family: 'Raleway', sans-serif;
    font-size: 16px;
    margin-bottom: 10px;
    p{
        color:${props => props.operation? "#03AC00": "#C70000"};
    }
`

const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    p:first-child{
        color:#c6c6c6;
        margin-right: 8px ;
    }
    p:last-child{
        color:black;
        word-break:break-all;
    }
`
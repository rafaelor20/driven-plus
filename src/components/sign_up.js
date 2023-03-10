import styled from "styled-components";
import { Link, useNavigate } from 'react-router-dom';
import { useState } from "react";
import axios from "axios";
import { registerPostUrl, registerPostObj } from "./apiUrls.js";

export default function SignUp() {
    const [disableInput, setDisableInput] = useState(false);
    const [user, setUser] = useState(registerPostObj);
    const userProps = { user: user, setUser: setUser }
    const navigate = useNavigate();

    return (
        <RegisterDiv>
            <InputBox data-identifier="user-name-input" placeholder="nome" onChange={e => updateName(e.target.value, userProps)} disabled={disableInput}></InputBox>
            <InputBox data-identifier="user-image-input" placeholder="cpf" onChange={e => updateCpf(e.target.value, userProps)} disabled={disableInput}></InputBox>
            <InputBox data-identifier="email-input" placeholder="email" onChange={e => updateEmail(e.target.value, userProps)} disabled={disableInput}></InputBox>
            <InputBox data-identifier="password-input" placeholder="senha" onChange={e => updatePassword(e.target.value, userProps)} disabled={disableInput}></InputBox>
            <LoginButton data-identifier="signup-btn" onClick={() => Register(userProps, navigate, setDisableInput)} disable={disableInput}>
                <FontButton>
                    Cadastrar
                </FontButton>
            </LoginButton>
            <Link to="/" style={{ textDecoration: 'none' }}>
                <OtherPage data-identifier="login-link">Já tem uma conta? Faça login!</OtherPage>
            </Link>
        </RegisterDiv>
    );
}

function Register(userProps, navigate, setDisableInput) {
    setDisableInput(true);
    const request = axios.post(registerPostUrl, userProps.user);
    request.then(() => { navigate('/') });
    request.catch((error) => error.response.data);
    request.catch(() => console.log(userProps.user));
    request.catch((error) => { alert("Erro no cadastro") });
    setDisableInput(false);
}

function updateEmail(email, userProps) {
    const setUser = userProps.setUser;
    const user = userProps.user;
    setUser(
        {
            email: email,
            name: user.name,
            cpf: user.cpf,
            password: user.password
        }
    );
}

function updatePassword(password, userProps) {
    const setUser = userProps.setUser;
    const user = userProps.user;
    setUser(
        {
            email: user.email,
            name: user.name,
            cpf: user.cpf,
            password: password
        }
    );
}

function updateName(name, userProps) {
    const setUser = userProps.setUser;
    const user = userProps.user;
    setUser(
        {
            email: user.email,
            name: name,
            cpf: user.cpf,
            password: user.password
        }
    );
}

function updateCpf(cpf, userProps) {
    const setUser = userProps.setUser;
    const user = userProps.user;
    setUser(
        {
            email: user.email,
            name: user.name,
            cpf: cpf,
            password: user.password
        }
    );
}

const RegisterDiv = styled.div`
display: flex;
flex-direction: column;
align-items:center;
justify-content:center;
`

const InputBox = styled.input`
box-sizing: border-box;
width: 298px;
height: 45px;
background: #FFFFFF;
border: 1px solid #D5D5D5;
border-radius: 5px;
padding: 0px 10px;
margin: 5px 0px;
::placeholder{
font-family: 'Roboto';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 16px;
color: #5E5E5E;
}
`

const LoginButton = styled.button`
box-sizing: border-box;
width: 298px;
height: 52px;
background: #FF4791;
border-radius: 8px;
display: flex;
justify-content:center;
align-items:center;
margin: 5px 0px;
`
const FontButton = styled.p`
font-family: 'Roboto';
font-style: normal;
font-weight: 700;
font-size: 14px;
line-height: 16px;
color: #FFFFFF;
`

const OtherPage = styled.p`
font-family: 'Roboto';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 16px;
text-decoration-line: underline;
color: #FFFFFF;
margin: 20px 0px;
`
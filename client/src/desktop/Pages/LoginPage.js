import styled from "@emotion/styled";
import { Button, Divider, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useRef, useContext } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Data } from "../../App";


const Content = styled("div") ({
    position: 'absolute',
    width: '100vw', maxWidth: '100vw',
    height: '100vh', maxHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
})
const FormBox = styled("div") ({
    position: 'relative',
    marginTop: '50px',
    width: '400px',
    boxShadow: '0px 3px 8px 0px rgba(0, 0, 0, 0.2)',
    padding: '1.5em 2em 0.75em',
    borderRadius: '15px',
    border: '1px solid #eee',
    background: 'white',
    boxSizing: 'border-box',
    display: 'grid',
    gridTemplateColumns: '1fr',
    gridRowGap: '25px'
})

export default function LoginPage () {
    const data = useContext(Data);
    const inputLogin = useRef(null);
    const inputPassword = useRef(null);
    const navigate = useNavigate();

    const auth = async () => {
        const login = inputLogin.current.value;
        const password = inputPassword.current.value;
        console.log('values: ', login, ', ', password)
        try {
            axios.post('/auth', {login: login, password: password})
                .then(res => {
                    console.log(res.data.access_token)
                    data.setter({
                        auth: true,
                        access_token: res.data.access_token,
                        avatar: res.data.user.avatar,
                        username: res.data.user.username,
                        user_id: res.data.user.id
                    })
                    console.log(data.user)
                    navigate('/dashboard')
                    toast.success('Успешная авторизация. Перенаправление...')
                })
        } catch (error) {
            if (error.response)
                if (error.response.status === 401)
                    toast.error("Неверные логин и/или пароль")
                else {
                    toast.error("Неизвестная ошибка. Попробуйте позже");
                    axios.post('/backlog', {code: error.response.status, error: error.response.data, type: 'response'})
                }
            else {
                console.log("Внутренняя ошибка сайта. Попробуйте позже", error);
                axios.post('/backlog', {error: error, type: 'request'})
            }
        }
    }
    
    return (
        <Content>
            <FormBox>
                <center>
                    <Typography variant="h4">Авторизация</Typography>
                </center>
                <TextField variant="outlined" label="Логин" inputRef={inputLogin} />
                <TextField variant="outlined" label="Пароль" inputRef={inputPassword} type="password"/>
                <center>
                    <Button 
                        variant="contained" 
                        sx={{ width: '90%' }} 
                        onClick={auth}
                    > Войти </Button>
                </center>
                <center>
                    <Divider sx={{margin: '5px'}} />
                    <sup>
                        Пароли и логины можно получить в 306 кабинете
                    </sup>
                </center>
            </FormBox>
        </Content>
    );
}
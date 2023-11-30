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
    padding: '1.5em 2em 0.75em',
    borderRadius: '15px',
    border: '2px solid #eee',
    background: 'white',
    boxSizing: 'border-box',
    display: 'grid',
    gridTemplateColumns: '1fr',
    gridRowGap: '25px'
})

export default function LoginPage () {
    const navigate = useNavigate();
    const { user, setter } = useContext(Data);
    const inputLogin = useRef(null);
    const inputPassword = useRef(null);

    const auth = async () => {
        const login = inputLogin.current.value;
        const password = inputPassword.current.value;

        if (login.trim() === "" || password.trim() === "") {
            toast.error("Логин или пароль не заполнены корректно.");
            return;
        }

        try {
            const response = await axios.post('/auth', {login: login, password: password});
            toast.success(responses[200]);
            setter({
                ...user,
                token: response.data.access_token,
                auth: true, 
                username: response.data.user.username, 
                avatar: response.data.user.avatar
            });
            navigate('/dashboard');
        } catch (error) {
            toast.error(
                error.reponse && error.response.status ? 
                responses[error.response.status] : responses.custom(error)
            );
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

const responses = {
    custom: (error) => `Внутренняя ошибка сайта. ${error}`,
    200: "Успешная авторизация. Перенаправление...",
    401: "Неверные логин и/или пароль",
    404: "Пользователь не зарегестрирован",
    500: "Неизвестная ошибка. Попробуйте позже"
}
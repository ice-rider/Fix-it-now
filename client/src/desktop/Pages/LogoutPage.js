import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { toast } from "react-toastify";
import { styled } from '@mui/system';
import { Data } from '../../App';
import { Button, Typography } from '@mui/material';

export default function LogoutPage () {
    const navigate = useNavigate();
    const { setter } = useContext(Data);

    const logout = () => {
        setter({ auth: false, token: null, username: null, avatar: null });
        navigate('/login');
        toast.success("Вы успешно вышли")
    }

    return (
        <Content>
            <Typography>Вы уверены, что хотите выйти?</Typography>
            <Button onClick={logout} variant="contained" color="error">Выйти</Button>
        </Content>
    )
}

const Content = styled("div") ({
    position: 'relative',
    width: '40vw',
    left: '30vw',
    top: '90px',
    marginBottom: '125px',
    padding: '1.5em 2em',
    background: 'whitesmoke',
    boxShadow: '0px 3px 8px 0px rgba(0, 0, 0, 0.3)',
    borderRadius: '1em',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
})
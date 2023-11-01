import styled from "@emotion/styled"
import { Button, Typography, Avatar, List, ListItemButton, Divider, Popover } from "@mui/material"
import { red } from '@mui/material/colors';
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const HeaderBox = styled("div") ({
    position: 'fixed', width: '100vw', height: '60px', zIndex: '5',
    display: 'flex', justifyContent: 'space-between',
    borderBottom: '2px solid #eee'
})
const LogoBox = styled("div") ({
    position: 'relative',
    top: '3px',
    display: 'flex',
    alignItems: 'center',
    marginLeft: '30px',
    cursor: "pointer"
})
const LogoImg = styled("img") ({
    position: 'relative', height: '40px', margin: '0 10px 5px 0'
})
const AuthButtonsWrapper = styled("div") ({
    display: 'flex',
    alignItems: 'center',
    marginRight: '30px'
})

export default function Header () {
    const navigate = useNavigate();
    return (
        <HeaderBox>
            <LogoBox onClick={()=>{navigate('/')}}>
                <LogoImg src="/logo.png" alt="Logo Icon" />
                <Typography variant="h5">Fix it now</Typography>
            </LogoBox>
            <AuthBox />
        </HeaderBox>
    )
}

function AuthBox () {
    const [isAuthed, setIsAuthed] = useState();
    useEffect(() => {
        const handleAuthValue = (auth) => {
            return auth === "true"
        }
        setIsAuthed(
            handleAuthValue(localStorage.auth)
        );

        const handleStorageChange = () => {
            handleAuthValue(localStorage.auth)
        }

        window.addEventListener('storage', handleStorageChange)

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, [])
    
    return (
        <>
            {
                isAuthed ?
                <AccountButton />
                :
                <AuthButtonsWrapper>
                    <LinkButton variant="contained" src="/login" label="Log in" />
                    <LinkButton variant="outlined" src="/register" label="Sign in" />
                </AuthButtonsWrapper>
            }
        </>
    )
}

function LinkButton (props) {
    const navigate = useNavigate();
    const { variant, src, label } = props;
    return (
        <Button
            sx={{margin: '0 5px'}}
            variant={variant} 
            onClick={() => navigate(src)}
        > {label} </Button>
    )
}

const AccountButtonWrapper = styled("div") ({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    cursor: "pointer",
    padding: '0 30px',
    ':hover': {
        background: 'whitesmoke'
    }
})

function AccountButton () {
    const [isPopOver, setIsPopOver] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const avatar_link = localStorage.avatar;
    const username = localStorage.username;

    return (
        <>
            <AccountButtonWrapper onClick={(event)=>{ setAnchorEl(event.currentTarget); setIsPopOver(true); }}> 
                <Avatar alt={username} src={avatar_link} sx={{ width: 35, height: 35, marginRight: '10px' }}/>
                <Typography variant="h6">{ username }</Typography>
            </AccountButtonWrapper>
            <Popover
                open={isPopOver}
                anchorEl={anchorEl}
                onClose={()=>{setIsPopOver(false)}}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                >
                <AccountMenu />
            </Popover>
        </>
    )
}


function AccountMenu () {
    const navigate = useNavigate();

    return (
        <List sx={{width: 200 }}>
            <ListItemButton onClick={()=>{navigate("/profile")}}>Профиль</ListItemButton>
            <ListItemButton onClick={()=>{navigate("/settings")}}>Настройки</ListItemButton>
            <ListItemButton onClick={()=>{navigate("/my-tickets")}}>Мои заявки</ListItemButton>
            <Divider />
            <ListItemButton onClick={()=>{navigate("/logout")}} sx={{color: red[500]}}>Выйти</ListItemButton>
        </List>
    )
}
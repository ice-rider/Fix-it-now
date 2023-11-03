import LazyLoading from "./LazyLoadingImage";

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
                <LazyLoading 
                    bigImg='/logo.png'
                    previewImg='/logo._min_.png'
                    alt="logo"
                    boxStyle={{
                        position: 'relative',
                        height: '40px',
                        margin: '0 5px 5px 0',
                        minWidth: '35px'
                    }}
                />
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
                    <LinkButton variant="contained" src="/login" label="Вход" />
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

    const closeMenu = () => { setIsPopOver(false) }

    return (
        <>
            <AccountButtonWrapper onClick={(event)=>{ setAnchorEl(event.currentTarget); setIsPopOver(true); }}> 
                <Avatar alt={username} src={avatar_link} sx={{ width: 35, height: 35, marginRight: '10px' }}/>
                <Typography variant="h6">{ username }</Typography>
            </AccountButtonWrapper>
            <Popover
                open={isPopOver}
                anchorEl={anchorEl}
                onClose={closeMenu}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <AccountMenu onClose={closeMenu} />
            </Popover>
        </>
    )
}


function AccountMenu (props) {
    const { onClose } = props;
    const navigate = useNavigate();

    const clickHandler = (url) => {
        console.log(url)
        navigate(url);
        onClose();
    }

    const LinkButton = (props) => {
        const { url, text, sx } = props;
        return <ListItemButton onClick={()=>{ clickHandler(url) }} sx={sx}> {text} </ListItemButton>
    }

    return (
        <List sx={{width: 200 }}>
            <LinkButton url="/profile" text="Профиль" />
            <LinkButton url="/settings" text="Настройки" />
            <LinkButton url="/my-tickets" text="Мои заявки" />
            <Divider />
            <LinkButton url="/logout" text="Выйти"  sx={{color: red[500]}} />
        </List>
    )
}
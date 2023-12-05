import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Typography, List, ListItemButton, Divider, Popover } from "@mui/material";
import { red } from '@mui/material/colors';
import LazyLoading from "./LazyLoadingImage";
import { Data } from "../../App";
import './Header.css';

// Header component
export default function Header() {
    const user = useContext(Data);
    const navigate = useNavigate();

    return (
        <div className="HeaderBox">
            <div 
                className="LogoBox" 
                onClick={() => { navigate(user["auth"] ? "/dashboard" : "/") }}
            >
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
            </div>
            <AuthenticationBox />
        </div>
    )
}

// Component for handling Authentication Box
function AuthenticationBox() {
    const { user } = useContext(Data);
    const navigate = useNavigate();

    return (
        <>
            { user["auth"] === true ?
                <div className="right-part">
                    <Button variant="contained" onClick={ ()=>{navigate('/new-ticket')} }>Создать заявку</Button>
                    <UserAccountButton />
                </div>
                :
                <div className="AuthButtonsWrapper">
                    <NavigationButton variant="contained" src="/login" label="Вход" />
                </div>
            }
        </>
    )
}

// Component for handling User Account Button
function UserAccountButton() {
    const { user } = useContext(Data);
    const avatar = user["avatar"];
    const username = user["username"];
    
    const [isPopOver, setIsPopOver] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const closeMenu = () => { setIsPopOver(false) };
    const makeAvatar = () => defaultImgNmb <= 15 ? 
        `/avatars/men${defaultImgNmb}.png` : `/avatars/women${defaultImgNmb-15}.png`
    
    const makePrevAvatar = () => defaultImgNmb <= 15 ? 
        `/avatars/men${defaultImgNmb}.blur.png` : `/avatars/women${defaultImgNmb-15}.blur.png`
    
    return (
        <>
            <div className="AccountButtonWrapper"
                onClick={(event) => { 
                    setAnchorEl(event.currentTarget); 
                    setIsPopOver(true); // show popover
                }}
            >
                <LazyLoading 
                    alt={username}
                    bigImg={avatar === "default" ? makeAvatar() : avatar}
                    previewImg={avatar === "default" ? makePrevAvatar() : avatar}
                    boxStyle={{
                        position: 'relative',
                        height: '35px',
                        margin: '0 10px 0 0',
                        minWidth: '35px',
                        borderRadius: '50%'
                    }}
                    blur={1}
                />
                <Typography variant="h6">{ username }</Typography>
            </div>
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
                <UserAccountMenu onClose={closeMenu} />
            </Popover>
        </>
    )
}
const defaultImgNmb = Math.floor(Math.random() * (23)) + 1;

// Component for handling User Account Menu
function UserAccountMenu({ onClose }) {
    const navigate = useNavigate();

    const redirect = (url) => {
        navigate(url);
        onClose();
    }

    const MenuItem = ({ url, text, warning = false }) => {
        return (
            <ListItemButton 
                sx={warning ? { color: red[500] } : {}}
                onClick={() => { redirect(url) }}
            >
                {text}
            </ListItemButton>
        )
    }

    return (
        <List sx={{ width: 200 }}>
            <MenuItem url="/profile" text="Профиль" />
            <MenuItem url="/settings" text="Настройки" />
            <MenuItem url="/my-tickets" text="Мои заявки" />
            <Divider />
            <MenuItem url="/logout" text="Выйти" warning />
        </List>
    )
}

// Component for handling Navigation Button
function NavigationButton(props) {
    const navigate = useNavigate();
    const { variant, src, label } = props;

    return (
        <Button
            sx={{ margin: '0 5px' }}
            variant={variant} 
            onClick={() => navigate(src)}
        >
            {label}
        </Button>
    )
}

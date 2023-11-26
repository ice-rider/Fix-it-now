import { Typography } from '@mui/material';
import styled from '@emotion/styled';
import { UserData } from "../../App";
import { useContext, useState } from "react";

const Wrapper = styled("div") ({
    position: 'absolute',
    width: '100vw',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
})

export default function MainPage () {
    const userData = useContext(UserData);
    const test = useState(userData["text"])
    return (
        <>
            <Wrapper>
                <Typography variant="h4">Fix-It-Now {test}</Typography>
            </Wrapper>
        </>
        
    );
}
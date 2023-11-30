import { Typography } from '@mui/material';
import styled from '@emotion/styled';

const Wrapper = styled("div") ({
    position: 'absolute',
    width: '100vw',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
})

export default function MainPage () {
    return (
        <>
            <Wrapper>
                <Typography variant="h4">Fix-It-Now</Typography>
            </Wrapper>
        </>
        
    );
}
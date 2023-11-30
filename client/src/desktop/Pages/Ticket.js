import { Card, CardHeader } from "@mui/material";

export default function Ticket() {
    return (
        <Card sx={{ maxWidth: 350 }}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        R
                    </Avatar>
                }
                title={title} />
            <CardMedia
                component="img"
                height="200"
                image={image} //todo: create image spinner
                alt="Paella dish"
            />
        </Card>
    );
}
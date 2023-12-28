import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

import { List, ListItem, ListItemButton, ListItemText } from '@mui/material';


export default function DashboardPage () {
    const [data, setData] = useState([]);
    const [hasResponse, setHasResponse] = useState(false);
    
    useEffect(() => {
        axios.get('/ticket-list')
        .then((response) => {
            setData(response.data.ticket_list);
            setHasResponse(true);
        })
        .catch((error) => {
            toast.error(error)
        })
    }, [])
    

    return hasResponse ? (
        data.length > 0 ? (
            <List>
                {data.map((ticket, index) => (
                    <ListItem key={index}>
                        <ListItemButton>
                            <ListItemText primary={`${ticket.section} | ${ticket.location}`} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        ) : (
            <p>Problems not found</p>
        )
    ) : (
        <p>Loading...</p>
    );
}
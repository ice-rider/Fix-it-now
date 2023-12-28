import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

import { List, ListItem, ListItemButton, ListItemText } from '@mui/material';


export default function DashboardPage () {
    const [data, setData] = useState([]);
    
    axios.get('/ticket-list')
    .then((response) => {
        setData(response.data.ticket_list)
    })
    .catch((error) => {
        toast.error(error)
    })

    return (
        <>
            {
                data ?
                <List>
                    { data.map((ticket, index) => {
                        return (<ListItem key={index}>
                            <ListItemButton>
                                <ListItemText primary={ticket.section + " | " + ticket.location} />
                            </ListItemButton>
                        </ListItem>)
                    })}
                </List>
                :
                <p>Problems not found</p>
            }
        </>
    );
}
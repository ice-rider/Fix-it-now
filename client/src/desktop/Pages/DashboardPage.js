import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import './DashboardPage.css';
import Ticket from '../components/Ticket'


export default function DashboardPage () {
    const [activeTicket, setActiveTicket] = useState(-1);
    const [data, setData] = useState([]);
    const [hasResponse, setHasResponse] = useState(false);
    useEffect(() => {
        axios.get('/ticket-list')
        .then((response) => {
            setData(response.data.ticket_list);
            setHasResponse(true);
        })
        .catch((error) => {
            toast.error(error);
            setHasResponse(true);
        })
    }, [])
    
    if (!hasResponse)
        return <p>Loading...</p>
    
    if (data.length === 0)
        return <p>Problems not found</p>
        
    return (
        <div className="DashboardPage">
            <div className="TicketList">
                {
                    data.map((ticket, index) => {
                        return <TicketListElem
                            ticket={ticket} 
                            key={index} 
                            onClick={() => {setActiveTicket(index);}}
                        />
                    })
                }
            </div>
            {
                activeTicket != -1 ?
                    <Ticket ticket={data[activeTicket]} />
                    :
                    <div className="bb" caption="Выберите проблему из списка" />
            }
        </div>
    );
}

function TicketListElem({ ticket, onClick }) {
    return (
        <div className={ticket.status + " TicketBox"} onClick={onClick}>
            <div className="Section">{ticket.section}</div>
            <div className="Description">{ticket.description}</div>
            <div className="Location">{ticket.location}</div>
        </div>

    );
}
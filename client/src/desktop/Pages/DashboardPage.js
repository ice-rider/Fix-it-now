import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import './DashboardPage.css';


export default function DashboardPage () {
    const [data, setData] = useState([]);
    const [hasResponse, setHasResponse] = useState(false);
    useEffect(() => {
        axios.get('/ticket-list')
        .then((response) => {
            setData(response.data.ticket_list);
            // setData([...data,
            //     {
            //         "id": 123,
            //         "section": "Электрика",
            //         "teacher_id": 1,
            //         "worker_id": null,
            //         "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod lorem turpis, vel dapibus risus tincidunt vel. Ut ac hendrerit nisl. Morbi at lectus id enim luctus euismod vitae et nunc. Cras consectetur dolor non ligula placerat, eu sagittis eros vulputate. Phasellus non lacus ac arcu lacinia ultrices. Mauris feugiat sem in luctus ultricies. Sed vel leo elit. Donec fringilla nulla sed ante volutpat, in pellentesque urna efficitur. Proin sit amet neque vel nunc pulvinar tristique. Maecenas lacinia, erat vitae scelerisque vestibulum, neque nulla varius dui, et dapibus lectus dui nec dui. Cras in elit non massa pharetra tempus. Donec ullamcorper sollicitudin mauris vitae rutrum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nulla facilisi. Vivamus vel sapien sed quam ultricies vehicula. Praesent lacinia elit in nunc rhoncus, ut venenatis tortor eleifend. Ut vitae commodo risus. Nunc malesuada consectetur nibh, eget feugiat lorem tempor eu. Nam sed lacus vitae lectus facilisis pellentesque. Duis nec felis quis turpis volutpat cursus. Donec ac dapibus nisi. Integer sed orci at lorem hendrerit accumsan in at mauris. Mauris molestie, orci eget sagittis tristique, velit dolor pretium ligula, vel efficitur ex tellus id erat. Morbi id luctus ligula. Duis egestas, urna non posuere lacinia, purus lacus mollis ligula, sit amet pharetra sem nisl et magna. ulla facilisi. Nam at ultricies arcu. Aenean vitae tortor et ligula dictum volutpat eget ac mi. Nullam non blandit tellus. Sed varius, tortor eu ullamcorper malesuada, mi mi pharetra metus, et hendrerit quam ipsum eu nisi. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Aliquam quis purus ac odio condimentum fermentum. Mauris aliquam, tortor vitae mollis auctor, urna diam sagittis velit, at mattis ligula lacus non justo. Proin molestie nisl id tellus malesuada, quis tincidunt purus laoreet. Aliquam cursus turpis at malesuada tempor. Quisque eu ultrices ex. Sed sed orci ac sem viverra finibus in eu nulla. Donec nec sem vehicula, dapibus odio eu, cursus nunc. Suspendisse efficitur, augue sit amet scelerisque gravida, tortor leo porta est, sed varius odio arcu in nisi. Fusce non ligula id purus tincidunt ullamcorper.",
            //         "location": "404",
            //         "status": "open"
            //     }
            // ])
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
        {
            data.map((ticket) => {
                return (
                    <div className="TicketBox">
                        <div class="Section">{ticket.section}</div>
                        <div class="Description">{ticket.description}</div>
                        <div class="Location">{ticket.location}</div>
                    </div>
                );
            })
        }
        </div>
    );
}
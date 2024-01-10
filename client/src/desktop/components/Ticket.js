import { useEffect } from "react";


export default function Ticket({ ticket }) {
    const [author, setAuthor] = useState({});

    useEffect(() => {
        axios.get(`/user/${ticket.teacher_id}`)
            .then((response) => {
                setAuthor(response.data);
            })
    }, [])

    return (
        <div className="TicketCard">
            <div className='TicketAuthorBlock'>
                <div className="TicketAuthorAvatar"></div>
                <div className="TicketAuthorName">{author.username}</div>
                <div className="TicketDate">{ticket.}</div>
            </div>
            <div className="TicketPhotoBlock">
                <img className="TicketPhotoImage" src={ticket.photo} />
            </div>
            <div className="TicketInfo" data-id={ticket.id}>
                <div className="TicketSection">{ticket.section}</div>
                <div className="TicketLocation">{ticket.location}</div>
            </div>
        </div>
    );
}
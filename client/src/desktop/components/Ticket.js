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
        <div className="TicketView">
            <div className="TicketPhotoWrapper">
                <img className="TicketPhoto" src={ticket.photo_url} />
            </div>
            <div className="TicketInfo">
                <div className="TicketSection"> {ticket.title} </div>
                <div className="TicketDescription"> {ticket.description} </div>
                <div className="TicketAuthor"> Автор: {author.name} </div>
            </div>
        </div>
    );
}
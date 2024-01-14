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
        </div>
    );
}
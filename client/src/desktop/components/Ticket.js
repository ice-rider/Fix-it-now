import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Data } from "../../App";
import { toast } from "react-toastify";

import "./Ticket.css"


export default function Ticket({ ticket }) {
    const [author, setAuthor] = useState({});
    const { user } = useContext(Data);

    useEffect(() => {
        axios.get(`/user/${ticket.teacher_id}`)
            .then((response) => {
                setAuthor(response.data);
            })
    }, [ticket])

    const close_ticket = () => {
        axios.patch('/ticket', {
            status: 'closed',
            ticket_id: ticket.teacher_id
        }).then(
            res => toast.success("Заявка успешно закрыта")
        ).catch(
            err => {
                toast.error("Что-то пошло не так. Попробуйте позже.")
                toast.error(err.message)
            }
        )
    }
    return (
        <div className="TicketView" visible={ticket.status}>
            <div className="TicketPhotoWrapper">
                <img className="TicketPhoto" src={ticket.photo_url} alt="photo of ptoblem" />
            </div>
            <div className="TicketInfo">
                <div className="TicketSection"> {ticket.section} </div>
                <div className="TicketDescription"> {ticket.description} </div>
                <div className="TicketAuthor"> Автор: {author.username} </div>
                <div>Статус: {ticket.status} </div>
            </div>
            { user.user_id-0 === ticket.teacher_id &&
                <div className="close-btn-wrapper" onClick={close_ticket}>
                    Проблема решена, закрыть заявку.
                </div>
            }
        </div>
    );
}
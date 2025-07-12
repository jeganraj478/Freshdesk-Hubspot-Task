import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Axios from '../utils/axiosConfig';
import Spinner from './Spinner';
import { status_labels, priority_labels } from '../utils/ticketLabels';
import '../styles/TicketDetail.css';
import PulseLoader from './PulseLoader';

const TicketDetail = () => {
    const { id } = useParams();
    const [ticket, setTicket] = useState(null);
    const [conversations, setConversations] = useState([]);
    const [contact, setContact] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadTicketAndContact = async () => {
            try {
                const res = await Axios.get(`api/ticket/${id}`);
                setTicket(res.data.ticket);
                setConversations(res.data.conversations);
                const requesterEmail = res.data.ticket?.requester?.name;
                if (requesterEmail) {
                    const hubspotRes = await Axios.get(`api/hubspot/contact?email=${requesterEmail}`);
                    setContact(hubspotRes.data);
                }
            } catch (err) {
                console.error('Error loading ticket or contact:', err);
            } finally {
                setLoading(false);
            }
        };

        loadTicketAndContact();
    }, [id]);

    if (loading) {
        return (
            <div className="ticket-detail-container">
                <PulseLoader/>
            </div>
        );
    }
    if (!ticket) return <p>Ticket not found.</p>;

    return (
        <div className="ticket-detail-container">
            <h2>🎫 Ticket #{ticket.id}: {ticket.subject}</h2>
            <p>
                Status:
                <span className={`badge ${status_labels[ticket.status]?.color}`}>
                    {status_labels[ticket.status]?.text || 'Unknown'}
                </span>
            </p>
            <p>
                Priority:
                <span className={`badge ${priority_labels[ticket.priority]?.color}`}>
                    {priority_labels[ticket.priority]?.text || 'Unknown'}
                </span>
            </p>
            <p><strong>Description:</strong> {ticket.description_text}</p>

            <h3>📨 Conversations</h3>
            <ul className="conversation-list">
                {conversations.map((conv, idx) => (
                    <li key={idx} className="conversation-item">
                        <strong>{conv.from_email || conv.support_email}</strong>
                        <p>{conv.body_text}</p>
                    </li>
                ))}
            </ul>

            {contact && (
                <>
                    <h3>👤 HubSpot Contact</h3>
                    <p><strong>Name:</strong> {contact.name}</p>
                    <p><strong>Email:</strong> {contact.email}</p>
                    <p><strong>Phone:</strong> {contact.phone}</p>
                    <p><strong>Company:</strong> {contact.company}</p>
                    <p><strong>Stage:</strong> {contact.lifecycleStage}</p>
                </>
            )}
        </div>
    );
};

export default TicketDetail;

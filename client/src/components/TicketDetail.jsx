import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Axios from '../utils/axiosConfig';
import { status_labels, priority_labels } from '../utils/ticketLabels';
import '../styles/TicketDetail.css';
import PulseLoader from './PulseLoader';

const TicketDetail = () => {
    const { id } = useParams();
    const [ticket, setTicket] = useState(null);
    const [conversations, setConversations] = useState([]);
    const [contact, setContact] = useState(null);
    const [ticketLoading, setTicketLoading] = useState(true);
    const [contactLoading, setContactLoading] = useState(false);

    useEffect(() => {
        const loadTicket = async () => {
            try {
                const res = await Axios.get(`api/ticket/${id}`);
                setTicket(res.data.ticket);
                setConversations(res.data.conversations);
                setTicketLoading(false);

                const requesterEmail = res.data.ticket?.requester?.email;
                if (requesterEmail) {
                    setContactLoading(true);
                    const hubspotRes = await Axios.get(`api/hubspot/contact?email=${requesterEmail}`);
                    setContact(hubspotRes.data);
                }
            } catch (err) {
                console.error('Error loading ticket or contact:', err);
                setTicketLoading(false);
                setContactLoading(false);
            } finally {
                setContactLoading(false);
            }
        };

        loadTicket();
    }, [id]);

    if (ticketLoading) {
        return (
            <div className="ticket-detail-container">
                <PulseLoader />
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

            <h3>👤 HubSpot Contact</h3>
            {contactLoading ? (
                <p>Loading contact details...</p>
            ) : contact ? (
                <>
                    <p><strong>Name:</strong> {contact.name}</p>
                    <p><strong>Email:</strong> {contact.email}</p>
                    <p><strong>Phone:</strong> {contact.phone}</p>
                    <p><strong>Company:</strong> {contact.company}</p>
                    <p><strong>Stage:</strong> {contact.lifecycleStage}</p>
                </>
            ) : (
                <p>No contact found.</p>
            )}
        </div>
    );
};

export default TicketDetail;

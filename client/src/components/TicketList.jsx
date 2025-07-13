import { useEffect, useState } from 'react';
import Axios from '../utils/axiosConfig';
import '../styles/Tickets.css';
import { useNavigate } from 'react-router-dom';

import { status_labels, priority_labels } from '../utils/ticketLabels'
import PulseLoader from './PulseLoader';

const TicketList = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    Axios.get('api/tickets')
      .then((res) => setTickets(res.data))
      .catch((err) => console.error('Failed to fetch tickets:', err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="ticket-container">
      <h2>🎫 Freshdesk Tickets</h2>

      {loading ? (
        <PulseLoader />
      ) : tickets.length === 0 ? (
        <p>No tickets available</p>
      ) : (
        <ul className="ticket-list">
          {tickets.map((t) => (
            <li key={t.id} className="ticket-item">
              <div className="ticket-header">
                <h4>{t.subject}</h4>
                <button className="view-button" onClick={() => navigate(`/tickets/${t.id}`)}>
                  View Details
                </button>
              </div>

              <div className="ticket-meta">
                <p>
                  <strong>Status:</strong>
                  <span className={`badge ${status_labels[t.status]?.color}`}>
                    {status_labels[t.status]?.text || 'Unknown'}
                  </span>
                </p>
                <p>
                  <strong>Priority:</strong>
                  <span className={`badge ${priority_labels[t.priority]?.color}`}>
                    {priority_labels[t.priority]?.text || 'Unknown'}
                  </span>
                </p>
                <p>
                  <strong>Requester:</strong> {t.requester?.name || 'N/A'}
                </p>
              </div>
            </li>

          ))}
        </ul>
      )}
    </div>
  );
};


export default TicketList;

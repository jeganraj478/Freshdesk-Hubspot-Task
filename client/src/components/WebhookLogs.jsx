import { useEffect, useState } from 'react';
import Axios from '../utils/axiosConfig';
import '../styles/WebhookLogs.css';

const WebhookLogs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Axios.get('/webhook/logs')
      .then((res) => setLogs(res.data))
      .catch((err) => console.error('Failed to fetch logs:', err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="webhook-container">
      <h2 className="webhook-heading">📜 Freshdesk Webhook Logs</h2>

      {loading ? (
        <div className="webhook-loader">
          <div className="pulse-line" />
          <div className="pulse-line" />
          <div className="pulse-line" />
        </div>
      ) : logs.length === 0 ? (
        <p className="webhook-empty">No logs found.</p>
      ) : (
        <ul className="webhook-log-list">
          {logs.map((log, index) => (
            <li key={index} className="webhook-log-item">
              <div className="webhook-log-meta">
                <span className="log-type">{log.type}</span>
                <span className="log-time">
                  {new Date(log.timestamp).toLocaleString()}
                </span>
              </div>
              <pre className="log-payload">
                {JSON.stringify(log.payload, null, 2)}
              </pre>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default WebhookLogs;

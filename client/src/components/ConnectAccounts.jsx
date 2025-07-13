import { useState } from 'react';
import '../styles/Auth.css';
import { useNavigate } from 'react-router-dom';
import Axios from '../utils/axiosConfig';

const ConnectAccounts = () => {
  const navigate = useNavigate();
  const [freshdeskKey, setFreshdeskKey] = useState('');
  const [freshdeskDomain, setFreshdeskDomain] = useState('');
  const [hubspotKey, setHubspotKey] = useState('');
  const [loading, setLoading] = useState(false);

  const handleConnect = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await Axios.post('api/auth/save-keys', {
        freshdeskKey,
        freshdeskDomain,
        hubspotKey,
      });

      if (res.status === 200) {
        navigate('/tickets');
      } else {
        alert('Failed to save keys');
      }
    } catch (err) {
      const msg = err.response?.data?.message || 'Error saving keys';
      alert(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <h2>🔑 Connect Freshdesk & HubSpot</h2>
      <form className="auth-form" onSubmit={handleConnect}>
        <input
          type="text"
          placeholder="Freshdesk API Key"
          value={freshdeskKey}
          onChange={(e) => setFreshdeskKey(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Freshdesk Domain (e.g., yourcompany.freshdesk.com)"
          value={freshdeskDomain}
          onChange={(e) => setFreshdeskDomain(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="HubSpot Private App Token"
          value={hubspotKey}
          onChange={(e) => setHubspotKey(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Saving...' : 'Save & Continue'}
        </button>
      </form>
    </div>
  );
};

export default ConnectAccounts;

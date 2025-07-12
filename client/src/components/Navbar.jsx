import { Link, useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div>
      <nav className="navbar">
        <div>FreshDesk-Tickets</div>
        <div>
        <Link to="/connect">Connect</Link>
        <Link to="/tickets">Tickets</Link>
        <Link to="/webhook-logs">Webhook Logs</Link>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

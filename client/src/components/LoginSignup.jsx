import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from '../utils/axiosConfig';
import '../styles/Auth.css';

const LoginSignup = ({ type = 'login' }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await Axios.post(`api/auth/${type}`, formData);
      if (res.data.token) {
        localStorage.setItem('token', res.data.token);
        if(res.data.isApiKeyPresent){
        navigate('/tickets');
        }else{
        navigate('/connect');
        }
      } else {
        alert('Unexpected response from server');
      }
    } catch (err) {
      const message = err.response?.data?.message || 'Authentication failed';
      alert(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <h2>{type === 'login' ? 'Login' : 'Signup'}</h2>
      <form className="auth-form" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          required
          value={formData.email}
          onChange={(e) =>
            setFormData({ ...formData, email: e.target.value })
          }
        />
        <input
          type="password"
          placeholder="Password"
          required
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />
        <button type="submit" disabled={loading}>
          {loading
            ? `${type === 'login' ? 'Logging in...' : 'Signing up...'}`
            : `${type === 'login' ? 'Login' : 'Sign Up'}`}
        </button>
      </form>

      <div className="auth-toggle">
        {type === 'login' ? (
          <p>
            New user?{' '}
            <button onClick={() => navigate('/signup')} className="link-button">
              Sign up
            </button>
          </p>
        ) : (
          <p>
            Already have an account?{' '}
            <button onClick={() => navigate('/login')} className="link-button">
              Login
            </button>
          </p>
        )}
      </div>
      <div className='auth-message'>
        Note: The server may take a few seconds to respond if it's been inactive, 
        due to free hosting limitations.
      </div>
    </div>
  );
};

export default LoginSignup;

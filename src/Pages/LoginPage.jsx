import { useState, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { FaLeaf } from 'react-icons/fa';

const LoginPage = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/dashboard');
    }
    catch (err) {
      alert('Login Failed. Check credentials.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-96 border border-green-100">
        <div className="text-center mb-8">
          <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}>
            <img
              src="/logonew.png"
              alt="logo"
              style={{
                width: "50px",
                height: "50px",
                borderRadius: "10px"
              }}
            />
          </div>

          <h2 className="text-2xl font-bold text-dark">System Login</h2>
          <p className="text-gray-500 text-sm">Enter your credentials to access</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none" type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
          <input className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
          <button type="submit" className="w-full bg-green-500 text-white py-3 rounded-lg font-bold shadow-lg hover:bg-green-600 transition">
            Secure Login
          </button>
        </form>

        <div className="mt-6 text-center text-sm">
          <p className="text-gray-500">New employee?</p>
          <Link to="/register" className="text-primary font-bold hover:underline">Create an account</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
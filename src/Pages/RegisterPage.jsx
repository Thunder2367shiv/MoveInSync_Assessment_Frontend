import { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const RegisterPage = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'operator'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:4000/api/auth/register', formData);
      alert("Registration Successful! Please Login.");
      navigate('/');
    } catch (err) {
      alert('Registration Failed: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-96 border border-green-100">
        <div className="text-center mb-6">
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

          <h2 className="text-2xl font-bold text-dark">Create Account</h2>
          <p className="text-gray-500 text-sm">Join the monitoring team</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Full Name</label>
            <input name="name" required onChange={handleChange} className="w-full p-2 border border-gray-300 rounded focus:border-primary outline-none" placeholder="John Doe" />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Email</label>
            <input name="email" type="email" required onChange={handleChange} className="w-full p-2 border border-gray-300 rounded focus:border-primary outline-none" placeholder="john@test.com" />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Password</label>
            <input name="password" type="password" required onChange={handleChange} className="w-full p-2 border border-gray-300 rounded focus:border-primary outline-none" placeholder="******" />
          </div>

         <div className="mt-6 text-center text-sm">
            <p className="text-gray-500">Already an employee?</p>
            <Link to="/" className="text-primary font-bold hover:underline">
              Log in to your account
            </Link>
          </div>


          <button type="submit" className="w-full bg-green-500 text-white py-3 rounded-lg font-bold shadow-lg hover:bg-green-600 transition">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
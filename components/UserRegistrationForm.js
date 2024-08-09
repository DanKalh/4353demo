// components/UserRegistrationForm.js
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const RegistrationForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('/api/auth/register', { email, password });
      setMessage('Registration successful!');
      router.push('/login');
    } catch (error) {
      console.error('Error:', error);
      if (error.response && error.response.data) {
        setMessage(error.response.data.error || error.response.data.errors);
      } else {
        setMessage('An unexpected error occurred.');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </div>
      <button type="submit">Register</button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default RegistrationForm;

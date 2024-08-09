// pages/login.js
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styles from '../styles/HomePage.module.css'; // Import CSS module

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('/api/auth/login', { email, password });
      const data = response.data;
      localStorage.setItem('token', data.token); // Store token
      setMessage('Login successful!');
      router.push('/profile');
    } catch (error) {
      console.error('Error:', error);
      if (error.response && error.response.data) {
        setMessage(error.response.data.error || 'Login failed');
      } else {
        setMessage('An unexpected error occurred.');
      }
    }
  };

  return (
    <div className={styles.container}>
      <nav className={styles.nav}>
        <Link href="/">Home</Link>
        <Link href="/register">Register</Link>
      </nav>
      <div className={styles.content}>
        <h1>Login</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={styles.input} // Apply wider input box style
            />
          </div>
          <div className={styles.formGroup}>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={styles.input} // Apply wider input box style
            />
          </div>
          <button type="submit" className={styles.button}>Login</button>
          {message && <p>{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
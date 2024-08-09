// pages/register.js
import UserRegistrationForm from '../components/UserRegistrationForm';
import Link from 'next/link';
import styles from '../styles/HomePage.module.css'; // Import CSS module

export default function RegisterPage() {
  return (
    <div className={styles.container}>
      <nav className={styles.nav}>
        <Link href="/">Home</Link>
        <Link href="/login">Login</Link>
      </nav>
      <div className={styles.content}>
        <h1>Register</h1>
        <div className={styles.form}>
          <UserRegistrationForm />
        </div>
      </div>
    </div>
  );
}
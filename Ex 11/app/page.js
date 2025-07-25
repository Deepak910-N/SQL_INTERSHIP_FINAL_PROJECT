'use client'
import { useRouter } from 'next/navigation'

export default function HomePage() {
  const router = useRouter()

  return (
    <main style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>🍱 Food Rescue Platform</h1>
        <p style={styles.subtitle}>Connecting restaurants with NGOs to reduce food waste</p>
        <div style={styles.buttonContainer}>
          <button onClick={() => router.push('/login')} style={styles.button}>Login</button>
          <button onClick={() => router.push('/register')} style={styles.buttonSecondary}>Register</button>
        </div>
      </div>
    </main>
  )
}

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#e8f5e9', // Light green background
    padding: '1rem',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: '24px',
    padding: '2.5rem',
    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    maxWidth: '400px',
    width: '100%',
  },
  title: {
    fontSize: '2rem',
    fontWeight: '700',
    marginBottom: '1rem',
    color: '#2e7d32' // Deep green
  },
  subtitle: {
    fontSize: '1rem',
    color: '#555',
    marginBottom: '2rem'
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  },
  button: {
    padding: '0.75rem',
    fontSize: '1rem',
    backgroundColor: '#43a047', // Green
    color: '#fff',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  },
  buttonSecondary: {
    padding: '0.75rem',
    fontSize: '1rem',
    backgroundColor: '#c8e6c9', // Light green
    color: '#2e7d32',
    border: '2px solid #2e7d32',
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  }
}

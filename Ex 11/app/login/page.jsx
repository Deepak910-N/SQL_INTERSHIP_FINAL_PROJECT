'use client'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { auth, db } from '@/firebase/config'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleLogin = async () => {
    const userCred = await signInWithEmailAndPassword(auth, email, password)
    const userRef = doc(db, 'users', userCred.user.uid)
    const userSnap = await getDoc(userRef)
    const role = userSnap.data().role
    router.push(role === 'restaurant' ? '/restaurant' : '/ngo')
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Welcome Back 👋</h2>
        <input
          style={styles.input}
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Email"
          type="email"
        />
        <input
          style={styles.input}
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Password"
          type="password"
        />
        <button onClick={handleLogin} style={styles.button}>Login</button>
      </div>
    </div>
  )
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#e8f5e9',
    padding: '1rem',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: '24px',
    padding: '2.5rem',
    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '400px',
    textAlign: 'center',
  },
  title: {
    fontSize: '1.8rem',
    marginBottom: '1.5rem',
    color: '#2e7d32',
  },
  input: {
    width: '100%',
    padding: '0.75rem 1rem',
    marginBottom: '1rem',
    borderRadius: '12px',
    border: '1px solid #ccc',
    fontSize: '1rem',
  },
  button: {
    width: '100%',
    padding: '0.75rem',
    backgroundColor: '#43a047',
    color: '#fff',
    fontSize: '1rem',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'background 0.3s',
  }
}

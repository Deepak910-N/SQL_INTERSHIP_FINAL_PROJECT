'use client'
import { auth, db } from '@/firebase/config'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function RegisterPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('restaurant')
  const router = useRouter()

  const handleRegister = async () => {
    const userCred = await createUserWithEmailAndPassword(auth, email, password)
    await setDoc(doc(db, 'users', userCred.user.uid), {
      email,
      role
    })
    router.push(role === 'restaurant' ? '/restaurant' : '/ngo')
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Create Your Account 🌱</h2>
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
        <select
          style={styles.select}
          value={role}
          onChange={e => setRole(e.target.value)}
        >
          <option value="restaurant">Restaurant</option>
          <option value="ngo">NGO</option>
        </select>
        <button onClick={handleRegister} style={styles.button}>Register</button>
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
  select: {
    width: '100%',
    padding: '0.75rem 1rem',
    marginBottom: '1.5rem',
    borderRadius: '12px',
    border: '1px solid #ccc',
    fontSize: '1rem',
    backgroundColor: '#f9f9f9',
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

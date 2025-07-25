'use client'
import { useState, useEffect } from 'react'
import { db } from '@/firebase/config'
import { collection, addDoc, doc, getDoc } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { useRouter } from 'next/navigation'

export default function RestaurantPage() {
  const [restaurantName, setRestaurantName] = useState('')
  const [foodItem, setFoodItem] = useState('')
  const [quantity, setQuantity] = useState('')
  const [userRole, setUserRole] = useState(null)
  const [isClient, setIsClient] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (isClient) {
      const user = getAuth().currentUser
      if (user) {
        const userRef = doc(db, 'users', user.uid)
        getDoc(userRef).then(docSnap => {
          if (docSnap.exists()) {
            const userData = docSnap.data()
            setUserRole(userData.role)
          }
        })
      }
    }
  }, [isClient])

  useEffect(() => {
    if (isClient && userRole && userRole !== 'restaurant') {
      router.push('/login')
    }
  }, [userRole, isClient, router])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await addDoc(collection(db, 'leftoverfood'), {
        restaurantName,
        foodItem,
        quantity,
        claimedBy: null,
        createdAt: new Date()
      })
      alert('Food details added successfully!')
      setRestaurantName('')
      setFoodItem('')
      setQuantity('')
    } catch (error) {
      console.error('Error adding document: ', error)
    }
  }

  if (!isClient) return null

  return (
    <main style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>🍽️ Restaurant Dashboard</h1>
        <p style={styles.subtitle}>Upload leftover food details to share with NGOs.</p>

        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            placeholder="Restaurant Name"
            value={restaurantName}
            onChange={(e) => setRestaurantName(e.target.value)}
            required
            style={styles.input}
          />
          <input
            type="text"
            placeholder="Food Item"
            value={foodItem}
            onChange={(e) => setFoodItem(e.target.value)}
            required
            style={styles.input}
          />
          <input
            type="number"
            placeholder="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
            style={styles.input}
          />
          <button type="submit" style={styles.button}>Submit</button>
        </form>
      </div>
    </main>
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
    padding: '2.5rem',
    borderRadius: '24px',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
    maxWidth: '420px',
    width: '100%',
    textAlign: 'center',
  },
  title: {
    fontSize: '1.8rem',
    color: '#2e7d32',
    marginBottom: '0.5rem',
  },
  subtitle: {
    fontSize: '1rem',
    color: '#555',
    marginBottom: '1.5rem',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  input: {
    padding: '0.75rem 1rem',
    fontSize: '1rem',
    borderRadius: '12px',
    border: '1px solid #ccc',
    width: '100%',
  },
  button: {
    padding: '0.75rem',
    fontSize: '1rem',
    backgroundColor: '#43a047',
    color: '#fff',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'background 0.3s',
  },
}

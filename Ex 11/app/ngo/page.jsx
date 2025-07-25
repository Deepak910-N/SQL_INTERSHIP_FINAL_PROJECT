'use client'
import { useEffect, useState } from 'react'
import { db } from '@/firebase/config'
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore'

const ngoEmail = 'AnnaiTrust@gmail.com'

export default function NGODashboard() {
  const [foodList, setFoodList] = useState([])

  const fetchData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'leftoverfood'))
      const items = []
      querySnapshot.forEach(docSnap => {
        items.push({ id: docSnap.id, ...docSnap.data() })
      })
      setFoodList(items)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  const handleClaim = async (id) => {
    try {
      const foodRef = doc(db, 'leftoverfood', id)
      await updateDoc(foodRef, {
        claimedBy: ngoEmail
      })
      fetchData()
    } catch (error) {
      console.error('Error claiming food:', error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <main style={styles.container}>
      <h1 style={styles.title}>📦 Available Food Items</h1>
      {foodList.length === 0 ? (
        <p style={styles.noData}>No food data available.</p>
      ) : (
        <div style={styles.cardList}>
          {foodList.map(item => (
            <div key={item.id} style={styles.card}>
              <p><strong>Restaurant:</strong> {item.restaurantName}</p>
              <p><strong>Food:</strong> {item.foodItem}</p>
              <p><strong>Quantity:</strong> {item.quantity}</p>
              {item.claimedBy ? (
                <p style={styles.claimed}><strong>Claimed by:</strong> {item.claimedBy}</p>
              ) : (
                <button style={styles.button} onClick={() => handleClaim(item.id)}>Claim</button>
              )}
            </div>
          ))}
        </div>
      )}
    </main>
  )
}

const styles = {
  container: {
    padding: '2rem',
    backgroundColor: '#e3f2fd',
    minHeight: '100vh',
  },
  title: {
    textAlign: 'center',
    fontSize: '1.8rem',
    color: '#1565c0',
    marginBottom: '1.5rem',
  },
  noData: {
    textAlign: 'center',
    fontSize: '1rem',
    color: '#555',
  },
  cardList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
    maxWidth: '500px',
    margin: '0 auto',
  },
  card: {
    backgroundColor: '#fff',
    padding: '1.25rem',
    borderRadius: '16px',
    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
  },
  claimed: {
    color: 'green',
    marginTop: '0.5rem',
    fontWeight: 'bold',
  },
  button: {
    marginTop: '1rem',
    padding: '0.6rem 1.2rem',
    backgroundColor: '#0288d1',
    color: '#fff',
    border: 'none',
    borderRadius: '12px',
    fontSize: '1rem',
    cursor: 'pointer',
  },
}

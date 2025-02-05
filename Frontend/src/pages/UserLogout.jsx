import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const UserLogout = () => {
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem('token')
        
        axios.get(`${import.meta.env.VITE_BASE_URL}/users/logout`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((response) => {
            if (response.status === 200) {
                localStorage.removeItem('token')
                navigate('/login')
            }
        })
        .catch((error) => {
            console.error('Logout failed:', error)
            navigate('/login') // Redirect anyway for safety
        })
        .finally(() => {
            setLoading(false)
        })
    }, [navigate])

    return (
        <div>
            {loading ? 'Logging out...' : 'Redirecting...'}
        </div>
    )
}

export default UserLogout
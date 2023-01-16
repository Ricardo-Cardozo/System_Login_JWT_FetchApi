import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"

export const useAuth = () => {
  const navigate = useNavigate()

  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [authenticated, setAuthenticated] = useState(false)

  useEffect(() => {
    
    const fetchApi = async () => {
      const response = await fetch('http://localhost:5000')

      const responseData =  await response.json()

      console.log(responseData);
    }

    return fetchApi
    
  }, [])
  

  const register = async (user) => {
    setIsLoading(true)

    try {
      const response = await fetch('http://localhost:5000/users/register', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(user)
      })

      const responseData = await response.json()

      if (!response.ok) {
        throw new Error(responseData.message)
      }

      setIsLoading(false)

      setSuccess(responseData.message)

      setTimeout(() => {
        setSuccess('')
      }, 1500);

      console.log(responseData);
      console.log(response)

      authUser(responseData) 

      navigate("/login")

    } catch (error) {
      setIsLoading(false)

      setError(error.message);

      setTimeout(() => {
        setError('')
      }, 1500);
    }
  }

  const authUser = async (data) => {
    setAuthenticated(false)

    localStorage.setItem('token', JSON.stringify(data.token))

    console.log(localStorage)
  }

  const logout = () => {
    setAuthenticated(false)

    localStorage.removeItem('token') 

    console.log(localStorage)
  }

  const login = async (user) => {
    setIsLoading(true)

    try {
      const response = await fetch('http://localhost:5000/users/login', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(user)
      })

      const responseData = await response.json()

      if (!response.ok) {
        throw new Error(responseData.message)
      }

      setIsLoading(false)

      setSuccess(responseData.message)

      setTimeout(() => {
        setSuccess('')
      }, 1500);

      console.log(responseData);
      console.log(response)

      authUser(responseData) 

      navigate("/")

    } catch (error) {
      setIsLoading(false)

      setError(error.message);

      setTimeout(() => {
        setError('')
      }, 1500);
    }
  }

  return { register, error, success, isLoading, authenticated, logout, login }
}

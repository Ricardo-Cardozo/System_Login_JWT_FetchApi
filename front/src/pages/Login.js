import { Link } from 'react-router-dom'
import styles from '../components/form/Form.module.css'
import Input from '../components/form/Input'
import { useState, useContext } from 'react'
import { AuthContext } from '../context/UserContext'
import { useFetch } from '../hooks/useFetch'
import Message from '../components/message/Message'
import Button from '../components/form/Button'

const Login = () => {
  const [user, setUser] = useState([])
  const auth = useContext(AuthContext)
  const { sendRequest, error } = useFetch();

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const responseData = await sendRequest(
        "http://localhost:5000/users/login",
        "POST",
        {"Content-Type": "application/json"},
        JSON.stringify(user)
      )

      console.log(responseData)
      auth.login(responseData.userId, responseData.token)
    } catch (err) {}
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit} className={styles.formContainer}>
        <Input
          label='E-mail:'
          type='email'
          name='email'
          placeholder='Digite o seu e-mail...'
          onChange={handleChange}
        />
        <Input
          label='Senha:'
          type='password'
          name='password'
          placeholder='Digite a sua senha...'
          onChange={handleChange}
        />
        <Button/>
        <p>Ainda não tem cadastro? <Link to='/register'>Cadastre-se!</Link></p>
      </form>
      {error && <Message type='error'>{error}</Message>}
    </div>
  )
}

export default Login
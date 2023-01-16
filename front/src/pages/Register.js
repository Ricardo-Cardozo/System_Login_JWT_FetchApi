import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import styles from "../components/form/Form.module.css";
import Input from "../components/form/Input";
import { AuthContext } from "../context/UserContext";
import { useFetch } from "../hooks/useFetch";
import Message from "../components/message/Message";
import Button from "../components/form/Button";

const Register = () => {
  const [user, setUser] = useState([]);
  const auth = useContext(AuthContext);
  const { sendRequest, error } = useFetch();

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const responseData = await sendRequest(
        "http://localhost:5000/users/register",
        "POST",
        {'Content-Type': 'application/json'},
        JSON.stringify(user)
      )
      console.log(responseData.userId, responseData.token)
      auth.login(responseData.userId, responseData.token)
    } catch (err) {}
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit} className={styles.formContainer}>
        <Input
          label="Nome:"
          type="text"
          name="name"
          placeholder="Digite o seu nome..."
          onChange={handleChange}
        />
        <Input
          label="E-mail:"
          type="email"
          name="email"
          placeholder="Digite o seu e-mail..."
          onChange={handleChange}
        />
        <Input
          label="Senha:"
          type="password"
          name="password"
          placeholder="Digite a sua senha..."
          onChange={handleChange}
        />
        <Input
          label="Confirmação de senha:"
          type="password"
          name="confirmpassword"
          placeholder="Confirme a sua senha..."
          onChange={handleChange}
        />
        <Button/>
        <p>
          Já tem cadastro? <Link to="/login">Faça o login!</Link>
        </p>
      </form>
      {error && <Message type="error">{error}</Message>}
    </div>
  );
};

export default Register;

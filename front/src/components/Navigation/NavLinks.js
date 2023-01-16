import { NavLink } from "react-router-dom";
import styles from "./NavLinks.module.css";
import { AuthContext } from "../../context/UserContext";
import { useContext } from "react";

const NavLinks = () => {
  const auth = useContext(AuthContext)
 
  return (
    <ul className={styles.navLink}>
      {auth.isLoggedIn && <li>
        <NavLink to="/">Home</NavLink>
      </li>}
      {!auth.isLoggedIn && <li>
        <NavLink to="/login">Login</NavLink>
      </li>}
      {!auth.isLoggedIn && <li>
        <NavLink to="/register">Register</NavLink>
      </li>}
      {auth.isLoggedIn && <li>
        <NavLink onClick={auth.logout}>Logout</NavLink>
      </li>
      }
    </ul>
  )
};

export default NavLinks;

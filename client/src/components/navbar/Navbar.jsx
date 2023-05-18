import "./navbar.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
const Navbar = () => {
  const { user, dispatch } = useContext(AuthContext);
 const logout = () => {
  dispatch({ type: "LOGOUT"});
  localStorage.setItem('user', '')
 }
  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <span className="logo">lamabooking</span>
        </Link>
        {user ? <div style={{display: 'flex'}}>
          <div style={{marginRight: '10px'}}> {user.username} </div>
          <button onClick={logout}>Logout</button>
          </div> 
          : (
          <div className="navItems">
            <button className="navButton">Register</button>
            <Link to="/login"><button className="navButton">Login</button></Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;

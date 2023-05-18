import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./login.scss";

import {signInWithEmailAndPassword } from 'firebase/auth'
import {auth} from '../../firebase';

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
    isAdmin: true //my
  });

  const { loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("http://localhost:8800/api/auth/login", credentials, {withcredentials: true}
      );
      console.log(res);
      //if (res.data.isAdmin) {
        if (res) {
       // dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });

        navigate("/");
      } else {
        dispatch({
          type: "LOGIN_FAILURE",
          payload: { message: "You are not allowed!" },
        });
      }
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };
  const [email, setEmail] = useState('')
  const [password1, setPassword1] = useState('')
  const [error1, setError] = useState(false)

  const handlLogin = (e) => {
    e.preventDefault();
  //createUserWithEmailAndPassword(auth, email, password)
  signInWithEmailAndPassword(auth, email, password1)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      console.log(user); navigate("/");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
  }
  
  return (
    <div className="login">
      <div className="lContainer">
        <input
          type="text"
          placeholder="username"
          id="username"
          onChange={handleChange}
          className="lInput"
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          onChange={handleChange}
          className="lInput"
        />
        <button disabled={false}
         onClick={handleClick} className="lButton">
          Login
        </button>
        {error && <span>{error.message}</span>}
      </div>
      {/* <div className="lContainer">
         <input type="text"  placeholder="email" id="email" className="lInput"
          onChange={(e)=>setEmail(e.target.value)}
        /> 
        <input type="password" placeholder="password1"id="password1" className="lInput"
          onChange={(e)=>setPassword1(e.target.value)}
        />
        <button disabled={false} onClick={handlLogin} className="lButton">
          Login
        </button>
        {error && <span>{error.message}</span>}
      </div> */}
    </div>
  );
};

export default Login;

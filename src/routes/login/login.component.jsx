import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.styles.css";
import Footer from "../../components/footer/footer.component";
import Header from "../../components/header/header.component";
import { authenticateUser } from "../../backend/user";
import { useDispatch } from "react-redux";
import { saveSession } from "../../store/user/userSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [credentials, setCredentials] = useState({ username: "", password: "" });

  const handleLogin = async (event) => {
    event.preventDefault();

    if (!credentials.username) {
      setError("No username was given.");
      return;
    }

    if (!credentials.password) {
      setError("No password was given.");
      return;
    }

    try {
      const response = await authenticateUser(credentials);
      if (response.status == 200) {
        dispatch(
          saveSession({ username: credentials.username, role: response.data.role, session: response.data.session }),
        );
        navigate("/admin");
      }
    } catch (error) {
      console.error(error);
      setError(error?.response?.data);
    }
  };

  return (
    <>
      <Header />
      <h1 className="login-title">Sisäänkirjautuminen</h1>
      <form>
        <input
          type="text"
          name="username"
          placeholder="Käyttäjänimi"
          value={credentials.username}
          onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Salasana"
          value={credentials.password}
          onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
          required
        />

        <p className="error">{error}</p>

        <input type="submit" className="btn" value="Kirjaudu" onClick={async (e) => await handleLogin(e)} />
      </form>
      <Footer />
    </>
  );
};

export default Login;

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./header.styles.css";
import { clearSession } from "../../store/user/userSlice";

const Header = ({ isAuthenticated }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const handleLogout = () => {
    dispatch(clearSession());
    navigate("/login");
  };

  return isAuthenticated ? (
    <header>
      <a href="/">
        <img src="/media/logo.png" alt="Retro Game House" />
      </a>
      <button className="btn" onClick={handleLogout}>
        Kirjaudu ulos ({user.username})
      </button>
    </header>
  ) : (
    <header>
      <a href="/">
        <img src="/media/logo.png" alt="Retro Game House" />
      </a>
      <a href="/login" className="btn">
        Kirjaudu
      </a>
    </header>
  );
};

export default Header;

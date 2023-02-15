import { Link } from "react-router-dom";
import "./Nav.css";
import { useDispatch } from "react-redux";
import { logout } from "../../../redux/action/auth";

const NavAdmin = () => {
  const dispatch = useDispatch();
  const handleLogOut = () => {
    dispatch(logout());
  };
  return (
    <>
      <nav className="nav">
        <Link to="/" className="site-title">
          KA
        </Link>
        <ul>
          <li>
            <Link to="/users">Users</Link>
          </li>
          <li>
            <Link to="/products">Products</Link>
          </li>
          <li>
            <Link to="/histories">Histories</Link>
          </li>
          <li>
            <Link to="/sales">Sales</Link>
          </li>
          <li>
            <Link to="/" onClick={handleLogOut}>
              Logout
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default NavAdmin;

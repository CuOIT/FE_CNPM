import { Link } from "react-router-dom";
import "./Nav.css";
import { useDispatch } from "react-redux";
import { logout } from "../../../redux/action/auth";

const NavStaff = () => {
  const dispatch = useDispatch();
  const handleLogOut = () => {
    dispatch(logout());
  };
  return (
    <>
      <nav className="navStaff">
        <Link to="/" className="site-title">
          KA
        </Link>
        <ul>
          <li>
            <Link to="/product">Product</Link>
          </li>
          <li>
            <Link to="/sales">Sales</Link>
          </li>
          <li>
            <Link to="/" onClick={handleLogOut}>
              Logout
            </Link>
          </li>
            <div className="cart">
              <Link to="/cart">Cart</Link>
            </div>
        </ul>
      </nav>
    </>
  );
};

export default NavStaff;

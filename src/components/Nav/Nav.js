import { Link } from "react-router-dom";
import "./Nav.css";

const Nav = () => {
  return (
    <>
      <nav className="nav">
        <Link to="/" className="site-title">
          KA
        </Link>
        <ul>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <Link to="/product">Product</Link>
          </li>
          <li>
            <Link to="/history">History</Link>
          </li>
          <li>
            <Link to="/sale">Sale</Link>
          </li>
          <li>
            <Link to="/logout">Logout</Link>
          </li>
        </ul>
        <div className="cart">
          <Link to="/cart">Cart</Link>
        </div>
      </nav>
    </>
  );
};

export default Nav;

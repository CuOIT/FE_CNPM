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
      <div>
        <title>Website menu 05</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <link href="https://fonts.googleapis.com/css?family=Roboto:400,100,300,700" rel="stylesheet" type="text/css" />
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" />
        <link rel="stylesheet" href="css/style.css" />
        <section className="ftco-section">
          <div className="container">
            <nav className="navbar navbar-expand-lg ftco_navbar ftco-navbar-light" id="ftco-navbar">
              <div className="container">
                <a className="navbar-brand" href="/">KA COFFEE</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#ftco-nav" aria-controls="ftco-nav" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="fa fa-bars" /> Menu
                </button>
                <div className="collapse navbar-collapse" id="ftco-nav">
                  <ul className="navbar-nav ml-auto mr-md-3">                                  
                    <li className="nav-item"><a href="/product" className="nav-link">Products</a></li>
                    <li className="nav-item"><a href="/sale" className="nav-link">Sales</a></li>
                    <li className="nav-item"><a href="/" className="nav-link" onClick={handleLogOut} >Logout</a></li>
                    <li className="dropdown nav-item d-md-flex align-items-center">
                      <a href="/Cart" className="dropdown-toggle nav-link d-flex align-items-center justify-content-center icon-cart p-0" id="dropdown04" >
                        <i className="fa fa-shopping-cart" />                        
                      </a>           
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
            {/* END nav */}
          </div>
        </section>
      </div>
    </>
  );
};

export default NavStaff;

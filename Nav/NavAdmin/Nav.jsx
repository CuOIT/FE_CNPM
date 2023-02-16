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
       <div>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <link href="https://fonts.googleapis.com/css?family=Roboto:400,100,300,700" rel="stylesheet" type="text/css" />
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" />
        <link rel="stylesheet" href="css/style.css" />
        <section className="ftco-section">
          <div className="container">
            <nav className="navbar navbar-expand-lg ftco_navbar ftco-navbar-light" id="ftco-navbar">
              <div className="container">
                <a className="navbar-brand" href="/">KA Coffee</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#ftco-nav" aria-controls="ftco-nav" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="fa fa-bars" /> Menu
                </button>
                <div className="collapse navbar-collapse" id="ftco-nav">
                  <ul className="navbar-nav ml-auto mr-md-3">

                    <li className="nav-item"><a href="/users" className="nav-link">User</a></li>
                    <li className="nav-item"><a href="/products" className="nav-link">Product</a></li>
                    <li className="nav-item"><a href="/history" className="nav-link">Histories</a></li>
                    <li className="nav-item"><a href="/sales" className="nav-link">Sales</a></li>
                    <li className="nav-item"><a href="/" onClick={handleLogOut} className="nav-link">Logout</a></li>
                                       
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

export default NavAdmin;

import { FaSearch } from "react-icons/fa";
import "../Bases/Styles/Navbar.scss";

export default function Navbar(props){
    return(
        <div className = "navbar">
            <div className = "navbar-search">
                <input type="text" placeholder="Tìm kiếm ..." />
                <FaSearch style={{position: "absolute", left: 210 + "px", top: 8 + "px"}} />
            </div>
            {
                props.typicals ? (<div className = "navbar-filter">
                {
                    props.typicals.map((element, key) => <div className = "navbar-filter-radio">
                        <input type="checkbox" key={key} />
                        <label>{element}</label>
                    </div>)
                }
                </div>) : null
            } 
        </div>
    )
}
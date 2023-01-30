import { AiOutlineShoppingCart } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";
import Icon from "../Assets/images/logo.png"; 

import "./Styles/Header.scss";

export default function Header(){
    return(
        <div className = "header">
            <div className = "header-icon">
                <img src = {Icon} alt = "shop-icon" />
            </div>
            <div className = "header-user-cart">
                <AiOutlineShoppingCart size={30} />
                <FaUserCircle size={40} style={{color: "#b11818"}} />
            </div>
        </div>
    )
}
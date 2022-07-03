import React from "react";
import { Link } from "react-router-dom";
import logo from "../Assets/LWlogo.jpg";

const Navigation = props => {
    return (
        <div className="nav">
            <div className="enterButtons">
                <Link to="/login" className="enterButton">LOGIN</Link>
                <Link to="/register" className="enterButton">REGISTER</Link>
            </div>

            <div className="logo">
                <Link to="/">
                    <img className="nav_img" src={logo} alt="Leipzig Wardrobe logo" />
                </Link>
            </div>
            <nav>
                <ul>
                    <li >
                        <Link to="/" className="liNav">HOME</Link>
                    </li>

                    <li className="liNav">
                        <Link to="/workshops" className="liNav">WORKSHOPS</Link>
                    </li>

                    <li className="liNav">
                        <Link to="/create" className="liNav">CREATE</Link>
                    </li>
                
                </ul>
            </nav>

        </div>
    )
}

export default Navigation
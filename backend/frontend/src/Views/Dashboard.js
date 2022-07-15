import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
    return (
        <div>
            <h1>Welcome to your Dashboard</h1>
            <div className="enterButtons">
                <Link to="/login" className="enterButton">LOGIN</Link>
                <Link to="/register" className="enterButton">REGISTER</Link>
            </div>
        </div>
    )
}

export default Dashboard
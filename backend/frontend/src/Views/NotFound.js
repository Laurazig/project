import React from "react"
import { Link } from "react-router-dom";

const NotFound = () =>{
    return(
        <div className="not-found">
            <h2>404 Error -page Not Found!</h2>
            <Link to="/">Go home</Link>
        </div>
    )
}
export default NotFound
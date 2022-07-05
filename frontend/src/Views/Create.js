import React from "react";
import Pattern from "../Assets/pattern.jpg"

const Create = () => {
    return (
        <div>
            <h1>Make your own clothes</h1>
            <div >Tips and resources about fabric shopping and buying / fixing a machine</div>
            <img className="img" src={Pattern} alt="cutting material with a pattern"/>            
        </div>
    )
}

export default Create
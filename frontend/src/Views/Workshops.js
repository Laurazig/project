// passing props from app.js to workshopList.js
//shows title & image
import React, { useState } from "react";
import Sewing from "../Assets/sewing.JPG"
import WorkshopList from "./WorkshopList";
//import SearchResults from "./Components/SearchResults"

const Workshops = props => {
    return (
        <div className="workshopContainer" >
            <h1>Workshops in Leipzig</h1>
            <img className="img" src={Sewing} alt="sewing machines in a workshop" />
            <WorkshopList workshops={props.workshops} />
            
            {/* <SearchResults 
                workshops={props.workshops}
                searchTerm={searchTerm}
                handleChangeSearch={handleChangeSearch}
            
            
            /> */}
        </div>
    )
}
export default Workshops
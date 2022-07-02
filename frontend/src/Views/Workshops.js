import React, { useState } from "react";
import Sewing from "../Assets/sewing.JPG"
// import { Link } from "react-router-dom";
import WorkshopList from "./WorkshopList";
import FormRegister from "../Components/FormRegister";
//import SearchResults from "./Components/SearchResults"

const Workshops = props => {
    

    return (
        <div className="workshopContainer" >
            <h1>Workshops in Leipzig</h1>
            <img className="img" src={Sewing} alt="sewing machines in a workshop" />
            <WorkshopList
                workshops={props.workshops}
                name={props.name}
                workshop={props.workshop}
                location={props.location}
                date={props.date}
                price={props.price}
                link={props.link}
                updateName={props.updateName}
                updateWorkshop={props.updateWorkshop}
                updateLocation={props.updateLocation}
                updateDate={props.updateDate}
                updatePrice={props.updatePrice}
                updateLink={props.updateLink}
                update={props.update}
            />
            <FormRegister />
            {/* <SearchResults 
                workshops={props.workshops}
                searchTerm={searchTerm}
                handleChangeSearch={handleChangeSearch}
            
            
            /> */}
        </div>
    )
}
export default Workshops
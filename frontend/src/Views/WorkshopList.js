//these are the workshop cards on the home page

import React from "react";
// import { Link } from "react-router-dom";
// import Form from "../components/Form";

const WorkshopList = props => {
    return (
        <div className="cardContainer">
            <ul id="workshopListUL">
                {
                    props.workshops.map(obj => {
                        return (
                            <li className="workshopLi" key={obj.id} >
                                <div className="workshopCard">
                                (workshoplist.js)
                                    <div><strong>Name: </strong> {obj.name} </div>
                                    <div><strong>Workshop:</strong> {obj.workshop} </div>
                                    <div><strong>Location:</strong> {obj.location}</div>
                                    <div><strong>Date:</strong> {obj.date}</div>
                                    <div><strong>Price:</strong> {obj.price}</div>
                                    
                                        <a className="buttonCard"target="_blank" href={obj.link} ><div className="buttonCardDiv">Click here to visit their website</div></a>
                                </div>
                            </li>
                        )
                    })
                }
            </ul>
            
        </div>
    )
}
export default WorkshopList
import React from "react";
// import { Link } from "react-router-dom";
import Form from "../Components/Form";

const WorkshopList = props => {
    return (
        <div className="cardContainer">
            <ul id="workshopListUL">
                {
                    props.workshops.map(obj => {
                        return (
                            <li className="workshopLi" key={obj.id} >
                                <div className="workshopCard">
                                    <div><strong>Name: (workshoplist.js)</strong> {obj.name} </div>
                                    <div><strong>Workshop:</strong> {obj.workshop} </div>
                                    <div><strong>Location:</strong> {obj.location}</div>
                                    <div><strong>Date:</strong> {obj.date}</div>
                                    <div><strong>Price:</strong> {obj.price}</div>
                                    <div className="button"><a target="_blank" href={obj.link} >link</a></div>
                                </div>
                            </li>
                        )
                    })
                }
            </ul>
            <Form
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
        </div>
    )
}
export default WorkshopList
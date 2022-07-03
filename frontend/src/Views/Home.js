import React from "react";
import { Link } from "react-router-dom";


const Home = () => {
    return (
        <div>
            <h1>A Circular Economy Project</h1>
            <div className="homeP1">
            <p>A guide for dressing only in clothes made in Leipzig. </p>
            <p>How to make your own and where to buy locally produced clothing.</p>
            <p> On our workshop page you can see a list of current clothesmaking courses in the city</p>

            </div>


{/* map triggers get erros in console */}
            {/* <div className="map">
                <iframe id="iFrame_Map" src="https://www.google.com/maps/d/embed?mid=16Rp_3MkkmZqyOnMjoBz6a6aGaL9gRkeo&ehbc=2E312F"
                    width="640" height="480"></iframe>
            </div> */}


            <h2>Create an account</h2>
            <div className="enterButtons">
                <Link to="/register" className="enterButton">REGISTER</Link>
            </div>
            
            <p>
                Are you offering clothes making courses in Leipzig? Sign up to add them to our workshops page!
            </p>
            <p>
                Want to keep track of which courses you are registered on? Log in to see your homepage to find out!
            </p>
            {/* <div className="enterButtons">
               <Link to="/login" className="enterButton">LOGIN</Link> 
            </div> */}
            



        </div>
    )
}

export default Home
import React from "react";
import ShiboriShirt from "../Assets/shiboriShirt.png"

const Home = () => {
    return (
        <div>
            <h1>A Circular Economy Project</h1>
            <div className="homeP1">
            <p>A guide for dressing only in clothes made in Leipzig. </p>
            <p>How to make your own and where to buy locally produced clothing.</p>
            <p> On our workshop page you can see a list of current clothesmaking courses in the city</p>

            </div>
            {/* <img className="img" src={ShiboriShirt} alt="beautiful T-shirt made from bedsheet and tye-dyed" /> */}

            <div class="map">
                <iframe id="iFrame_Map" src="https://www.google.com/maps/d/embed?mid=16Rp_3MkkmZqyOnMjoBz6a6aGaL9gRkeo&ehbc=2E312F"
                    width="640" height="480"></iframe>
            </div>
            <h2>Create an account</h2>
            
            <button className="register">REGISTER</button>
            <p>
                Are you offering clothes making courses in Leipzig? Log in to add them to our workshps page!
            </p>
            <p>
                Want to keep track of which courses you are signed up to? Log in  and find out!
            </p>
            <button className="login">LOGIN</button>



        </div>
    )
}

export default Home
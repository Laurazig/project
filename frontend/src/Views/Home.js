import React from "react";
import ShiboriShirt from "../Assets/shiboriShirt.png"

const Home = () => {
    return (
        <div>
            <h1>A Circular Economy Project</h1>
            <p>A guide for dressing only in clothes made in Leipzig. </p>
            <p>How to make your own and where to buy locally produced clothing.</p>
            {/* <img className="img" src={ShiboriShirt} alt="beautiful T-shirt made from bedsheet and tye-dyed" /> */}

            <div class="map">
                <iframe id="iFrame_Map" src="https://www.google.com/maps/d/embed?mid=16Rp_3MkkmZqyOnMjoBz6a6aGaL9gRkeo&ehbc=2E312F"
                    width="640" height="480"></iframe>
            </div>



        </div>
    )
}

export default Home
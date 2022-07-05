import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect, } from "react-router-dom";
import Navigation from "./components/Navigation";
import Home from "./Views/Home";
import Create from "./Views/Create";
import Workshops from "./Views/Workshops";
import NotFound from "./Views/NotFound";
import Register from "./Views/Register";
import Login from "./Views/Login";
import Courses from "./Views/Courses.js";  //Albums
import './App.css';

//state for: add new workshop (form.js)
const App = () => {
  const [workshops, setWorkshops] = useState([]);
  const [name, setName] = useState("");
  const [workshop, setWorkshop] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [price, setPrice] = useState("");
  const [link, setLink] = useState("");
  // When the app first renders, no user is logged in
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUserId, setCurrentUserId] = useState("");
  const [showLogin, setShowLogin] = useState(true);
  const [token, setToken] = useState(false);

  // const [ searchTerm, setSearchTerm ] =useState("");

  //export const FormContext = createContext();

  useEffect(() => {
    setWorkshops(pretendFetch)
  }, []);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("data"));
    if (data && data.token && data.id && data.expiry) {
      const tokenExpiry = new Date(data.expiry);
      const now = new Date();

      if (tokenExpiry > now) {
        login(data.token, data.id);
      } else {
        logout();
      }
    } else {
      logout();
    }
  }, []);

  const pretendFetch = () => {
    return [
      {
        id: "1",
        name: "Volkshochschule",
        workshop: "Tailoring basics",
        location: "City center",
        date: "26.04.22",
        price: "20€",
        link: "https://www.vhs-leipzig.de/programm/kunst-kultur-kreativitaet.html?action%5B92%5D=category&cat_ID=495-CAT-KAT168"
      },
      {
        id: "2",
        name: "Daniela Witt",
        workshop: "Alladin trousers",
        location: "Leutzsch",
        date: "23.04.22",
        price: "60€",
        link: "https://dawitt.de/naehkurse-leipzig/"
      },
      {
        id: "3",
        name: "Susanne Welle - SW Handmade ",
        workshop: "Hoodie",
        location: "Plagwitz",
        date: "27.04.22",
        price: "37€",
        link: "https://sw-handmade.de/start.html"
      },
    ]
  }

  const updateWorkshopName = newName => {
    setName(newName);
  }

  const updateWorkshopWorkshop = newWorkshop => {
    setWorkshop(newWorkshop);
  }
  const updateWorkshopLocation = newLocation => {
    setLocation(newLocation);
  }
  const updateWorkshopDate = newDate => {
    setDate(newDate);
  }
  const updateWorkshopPrice = newPrice => {
    setPrice(newPrice);
  }
  const updateWorkshopLink = newLink => {
    setLink(newLink);
  }


  const updateWorkshop = newWorkshop => {
    setWorkshops(workshops.concat(newWorkshop));
    setName("");
    setWorkshop("");
    setLocation("");
    setDate("");
    setPrice("");
    setLink("");
  }

  // const handleChangeSearch =(event) =>{
  //     setSearchTerm(event.target.value)
  // }


  const login = (token, id) => {
    setToken(token);
    setCurrentUserId(id);
    setIsLoggedIn(true);
  }
  const logout = () => {
    localStorage.removeItem("data")
    setToken(false);
    setCurrentUserId("");
    setIsLoggedIn(false);
    setShowLogin(true);
  }

  const deregister = async () => {
    const settings = {
      method: "DELETE",
      headers: {
        "authorisation": "Bearer " + token
      }
    }
    // Let's pretend the current user has an id of 1234abcd
    // The DELETE request will be sent to:
    // http://localhost:3001/users/1234abcd
    const response = await fetch(process.env.REACT_APP_SERVER_URL + `/users/${currentUserId}`, settings);
    const parsedRes = await response.json();

    try {
      if (response.ok) {
        alert(parsedRes.message);
        setIsLoggedIn(false);
        setShowLogin(true);
        setCurrentUserId("");
      } else {
        throw new Error(parsedRes.message);
      }
    } catch (err) {
      alert(err.message);
    }
  }



  return (
    <div className="App">
      <Router>
        <header className="App-header">
          <Navigation />
        </header>
        <main>
          <Switch>
            {/* <Route path="/" exact component={Home} /> */}
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/create" exact>
              <Create />
            </Route>
            <Route path="/workshops" exact>
              <Workshops
                workshops={workshops}



              // searchTerm={searchTerm}
              // handleChangeSearch={handleChangeSearch}
              />

              {/* <FormContext.Provider value={{
                name:name
            }} >
              <Workshops />
            </FormContext.Provider> */}
            </Route>
            <Route path="/login" exact>
              {/* {isLoggedIn? <Redirect to="/courses" /> : <Home />} */}
              {/* <Login setShowLogin={setShowLogin} setIsLoggedIn={setIsLoggedIn} setCurrentUserId={setCurrentUserId} /> */}
              {isLoggedIn ? <Redirect to="/courses" /> : <Login setShowLogin={setShowLogin} setIsLoggedIn={setIsLoggedIn} setCurrentUserId={setCurrentUserId} login={login}  />}

            </Route>
            <Route path="/register" exact>
              {/* <Register setShowLogin={setShowLogin} setIsLoggedIn={setIsLoggedIn} setCurrentUserId={setCurrentUserId} /> */}
              {isLoggedIn ? <Redirect to="/courses" /> : <Register setShowLogin={setShowLogin} setIsLoggedIn={setIsLoggedIn} setCurrentUserId={setCurrentUserId} login={login}  />}
            </Route>
            <Route path="/courses" exact>
              <Courses
                name={name}
                workshop={workshop}
                location={location}
                date={date}
                price={price}
                link={link}
                updateName={updateWorkshopName}
                updateWorkshop={updateWorkshopWorkshop}
                updateLocation={updateWorkshopLocation}
                updateDate={updateWorkshopDate}
                updatePrice={updateWorkshopPrice}
                updateLink={updateWorkshopLink}
                update={updateWorkshop}
                logout={logout} 
                deregister={deregister} 
                token={token}
              />
            </Route>

            <Route path="*" component={NotFound} />
          </Switch>
        </main>
      </Router>
    </div>
  );

  // if (!isLoggedIn) {
  //     if (showLogin) {
  //         return <Login setShowLogin={setShowLogin} setIsLoggedIn={setIsLoggedIn} setCurrentUserId={setCurrentUserId} />
  //     } else {
  //         return <Register setShowLogin={setShowLogin} setIsLoggedIn={setIsLoggedIn} setCurrentUserId={setCurrentUserId} />
  //     }
  //  }
  // else {
  //     return <Albums currentUserId={currentUserId} logout={logout}/>   // replace with new workshops and bring in code below
  // return <Workshops />    
  // }
}
export default App;




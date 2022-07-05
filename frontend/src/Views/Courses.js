//adding new course to list on users page

import React, { useState, useEffect } from "react";
import Logout from "../components/Logout.js";
import Deregister from "../components/Deregister.js";
import UsersData from "../components/UsersData.js";
import FormRegister from "../components/FormRegister";
import Form from "../components/Form";

const Courses = props => {
    const [firstName, setFirstName] = useState("");
    const [school, setSchool] = useState("");           //band
    const [courseTitle, setCourseTitle] = useState(""); //albumTitle
    const [courseDate, setCourseDate] = useState("");   //albumYear
    const [courses, setCourses] = useState([]);        //albums
    const [teacher, setTeacher] = useState(false);
    
//console error:  React Hook useEffect has a missing dependency: 'props.token'. Either include it or remove the dependency array

    useEffect(() => {
        console.log("token from app.js state", props.token)
    }, [])

    // When the <Courses /> component first renders...
    // GET relevant data about the user who logged in, and update state...
    // So the user can see their name and current list of courses immediately after they log in/register
    useEffect(() => {
        const fetchUserData = async () => {
            // const settings = 
            // Make a GET request to the "/users/:id" endpoint in our server...
            // ... and then handle the response from the server
            const response = await fetch(process.env.REACT_APP_SERVER_URL + `/users/${props.currentUserId}`, {credentials: "include"});
            const parsedRes = await response.json();
            try {
                // If the request was successful...
                if (response.ok) {
                    console.log("Server response", parsedRes);
                    setFirstName(parsedRes.firstName);
                    setCourses(parsedRes.courses);
                    setTeacher(parsedRes.teacher);
                } else {
                    throw new Error(parsedRes.message);
                }
            } catch (err) {
                alert(err.message);
            }
        }
        fetchUserData();
    }, [props.currentUserId])

    // Function to update the value of an input
    const updateData = event => {
        switch (event.target.name) {
            case "school":
                setSchool(event.target.value);
                break;
            case "title":
                setCourseTitle(event.target.value);
                break;
            case "date":
                setCourseDate(event.target.value);
                break;
            default:
                break;
        }
    }

    // Function to create a new course in the current user's "courses" array in the db
    // Make a POST request to the "/users/:id/courses" endpoint in our server...
    // ... and then handle the response from the server
    const createNewCourse = async event => {   //submitAlbum
        event.preventDefault();
        const newCourse = {
            school: school,
            courseTitle: courseTitle,
            courseDate: courseDate,
            token:props.token
        }
        const settings = {
            method: "POST",
            body: JSON.stringify(newCourse),
            headers: {
                "Content-Type": "application/json",
                "Authorisation": "Bearer " + props.token
            },
            Credentials: "include"
        }

        // Make a request to create the new course in the "courses" collection (if needed)...
        // And get the course's id back in the server's response
        const response = await fetch(process.env.REACT_APP_SERVER_URL + `/courses`, settings);
        const parsedRes = await response.json();

        try {
            // * Task 14 solution begins here!
            // If the first fetch request was successful...
            if (response.ok) {
                const settings = {
                    method: "PATCH",
                    body: JSON.stringify({ id: parsedRes.id }),
                    headers: {
                        "Content-Type": "application/json",
                        //"Authorisation": "Bearer " + props.token
                    },
                    Credentials: "include"
                }

                // Make a second fetch request to add the new course id to the user's "courses" array
                const secondResponse = await fetch(process.env.REACT_APP_SERVER_URL + `/users/${props.currentUserId}/courses`, settings);
                const secondParsedRes = await secondResponse.json();

                // If the second request was successful...
                // Update the "courses" state variable with the user's up-to-date "courses" array (containing course ids)
                // This will re-render the app, and the new array will be mapped in the JSX below
                if (secondResponse.ok) {
                    console.log("Add course server response", secondParsedRes.courses);
                    setCourses(secondParsedRes.courses);
                    setSchool("");
                    setCourseTitle("");
                    setCourseDate("");

                    // If the second fetch request was unsuccessful...
                } else {
                    throw new Error(secondParsedRes.message);
                }
                // If the first fetch request was unsuccessful...
            } else {
                throw new Error(parsedRes.message);
            }
        } catch (err) {
            alert(err.message);
        }
    }

    // Function to delete all the current user's courses from the db
    // Make a DELETE request to the "/users/:id/courses" endpoint in our server...
    // ... and then handle the response from the server.
    const deleteAllCourses = async event => {
        event.preventDefault();
        const settings = {
            method: "DELETE",
            headers: {
                "Authorisation": "Bearer " + props.token
            }, 
            Credentials: "include"
        }

        const response = await fetch(process.env.REACT_APP_SERVER_URL + `/users/${props.currentUserId}/courses`, settings);
        const parsedRes = await response.json();

        try {
            // If the request was successful...
            if (response.ok) {
                setCourses(parsedRes);
            } else {
                throw new Error(parsedRes.message);
            }
        } catch (err) {
            alert(err.message);
        }
    }
    const deleteOneCourse = async event => {
        const courseId = event.target.parentElement.id;

        const settings = {
            method: "DELETE",
            headers: {
                "Authorisation": "Bearer " + props.token
            }
        }
        //                             userid      albumid
        // http://localhost:3001/users/1234/albums/5678

        const response = await fetch(process.env.REACT_APP_SERVER_URL + `/users/${props.currentUserId}/courses/${courseId}`, settings);
        const parsedRes = await response.json();

        try {
            if (response.ok) {
                setCourses(parsedRes);
            } else {
                throw new Error(parsedRes.message);
            }
        } catch (err) {
            alert(err.message);
        }
    }

    
    return (
        <div>
            <h1>Courses Dashboard</h1>
            <h2 id="greeting">Welcome {firstName}!</h2>
            {/*logout button -GET error 404 courses  /unexpected < */}
            <Logout logout={props.logout} />  
            {/* deregister button - popup :not auth  -  app.js 403*/}
            <Deregister deregister={props.deregister} />
            {/* view button -popup :not auth  / GET error 403 usersData L12  */}
            {teacher && < UsersData currentUserId={props.currentUserId} token={props.token} />}
            
            <h2>1. Learner? Courses you are registered on show below! </h2>
            <div className="currentCoursesContainer">

            
            <div className="currentCourses">
                <h2>List of Current Courses</h2>
                <ul>
                    {
                        courses.map(course => {
                            return <li key={course._id} id={course._id}>{course.courseTitle} by {course.school} ({course.courseDate})
                                <span onClick={deleteOneCourse}>X</span>
                            </li>
                        })
                    }
                </ul>
            </div>
             </div> 
              <div className="form">

                <form onSubmit={createNewCourse}>
                    <h2>Add one to the list</h2>
                    <div >
                        <label className="formCourse">School</label>
                        <input name="school" onChange={updateData} value={school} />
                    </div>
                    <div >
                        <label className="formCourse">Title</label>
                        <input name="title" onChange={updateData} value={courseTitle} />
                    </div>
                    <div >
                        <label className="formCourse">Date</label>
                        <input name="date" onChange={updateData} value={courseDate} />
                    </div>
                    <button className="enterButton">Submit Course</button>
                </form>
            </div>
            <button className="enterButton" onClick={deleteAllCourses}>Delete all courses!</button>
          
            
            <h2>2. Teacher? Add your course to the workshops page!!</h2>
            
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
            <h2>3. Learner? Register for a workshop</h2>
            <FormRegister />
        </div>
    )
}
export default Courses;
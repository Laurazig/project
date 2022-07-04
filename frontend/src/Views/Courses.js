//adding new course to list on users page

import React, { useState, useEffect } from "react";
import Logout from "../Components/Logout.js"

const Courses = props => {
    const [firstName, setFirstName] = useState("");
    const [school, setSchool] = useState("");           //band
    const [courseTitle, setCourseTitle] = useState(""); //albumTitle
    const [courseDate, setCourseDate] = useState("");   //albumYear
    const [courses, setCourses] = useState([]);        //albums

    // When the <Courses /> component first renders...
    // GET relevant data about the user who logged in, and update state...
    // So the user can see their name and current list of albums immediately after they log in/register
    useEffect(() => {
        const fetchUserData = async () => {
            // Make a GET request to the "/users/:id" endpoint in our server...
            // ... and then handle the response from the server
            const response = await fetch(process.env.REACT_APP_SERVER_URL + `/users/${props.currentUserId}`);
            const parsedRes = await response.json();
            try {
                // If the request was successful...
                if (response.ok) {
                    setFirstName(parsedRes.firstName);
                    setCourses(parsedRes.courses);
                } else {
                    throw new Error(parsedRes.message);
                }
            } catch (err) {
                alert(err.message);
            }
        }
        fetchUserData();
    }, [props.currentUserId])


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
            courseDate: courseDate
        }
        const settings = {
            method: "POST",
            body: JSON.stringify(newCourse),
            headers: {
                "Content-Type": "application/json"
            }
        }
        const response = await fetch(process.env.REACT_APP_SERVER_URL + `/users/${props.currentUserId}/courses`, settings);
        const parsedRes = await response.json();

        try {
            // If the request was successful...
            if (response.ok) {
                setCourses(parsedRes)
                setSchool("");
                setCourseTitle("");
                setCourseDate("");
                // If the request was unsuccessful...
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
            method: "DELETE"
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
            method: "DELETE"
        }

        const response = await fetch(process.env.REACT_APP_SERVER_URL + `/users/${props.currentUserId}/albums/${courseId}`, settings);        
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
            <h2 id="greeting">Welcome {firstName}!</h2>
            <Logout logout={props.logout} />
            <h1>Courses you are signed up to show below!</h1>
            <h2>Add one to the list</h2>
            <form onSubmit={createNewCourse}>
                <div>
                    <label>School</label>
                    <input name="school" onChange={updateData} value={school} />
                </div>
                <div>
                    <label>Title</label>
                    <input name="title" onChange={updateData} value={courseTitle} />
                </div>
                <div>
                    <label>Date</label>
                    <input name="date" onChange={updateData} value={courseDate} />
                </div>
                <button>Submit Course</button>
            </form>
            <button onClick={deleteAllCourses}>Delete all courses!</button>
            <div>
                <h2>Current Courses</h2>
                <ul>
                    {
                        courses.map(course => {
                            return <li key={course._id}id={course._id}>{course.courseTitle} by {course.school} ({course.courseDate})
                             <span onClick={deleteOneCourse}>X</span>
                            </li>
                        })
                    }
                </ul>
            </div>
        </div>
    )
}
export default Courses;
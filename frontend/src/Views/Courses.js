//adding new course to list on users page

import React, { useState, useEffect } from "react";
import Logout from "../Components/Logout.js"

const Courses = props => {
    const [firstName, setFirstName] = useState("");
    const [school, setSchool] = useState("");           //band
    const [courseTitle, setCourseTitle] = useState(""); //albumTitle
    const [courseDate, setCourseDate] = useState("");   //albumYear
    const [courses, setCourses] = useState([]);        //albums
    useEffect(() => {
        // const settings = {
        //     method: "GET"
        // }
        fetch(`http://localhost:3001/users/${props.currentUserId}`)
            .then(response => response.json())
            .then(data => {
                setFirstName(data.firstName);
                setCourses(data.courses);
            })
    }, [])
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
    const createNewCourse = event => {   //submit course
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
        fetch(process.env.REACT_APP_SERVER_URL + `/users/${props.currentUserId}/courses`, settings)
            .then(response => response.json())
            .then(data => {
                console.log("New course created", data);
                console.log(data)
                setCourses(data);
                setSchool("");
                setCourseTitle("");
                setCourseDate("");
            })
    }

    
    const deleteCourse = () => {
        const settings = {
            method: "DELETE",
        }
        fetch(process.env.REACT_APP_SERVER_URL + `/users/${props.currentUserId}/courses`, settings)
            .then(response => response.json())
            .then(data => {
                console.log("All courses deleted", data);
                setCourses([]);
            })
            //asnc await taken from login_reg - const deleteAllAlbums = async event => { ........
            // const response = await fetch(process.env.REACT_APP_SERVER_URL + `/users/${props.currentUserId}/albums`, settings);
            // const parsedRes = await response.json();
    
            // try {
            //     // If the request was successful...
            //     if (response.ok) {
            //         setAlbums(parsedRes);
            //     // If the request was unsuccessful...
            //     } else {
            //         throw new Error(parsedRes.message);
            //     }
            // } catch (err) {
            //     alert(err.message);
            // }
    }

    return (
        <div>
            <h2 id="greeting">Welcome {firstName}!</h2>
            <Logout logout={props.logout} />
            <h1>Courses you are signed up to show below!</h1>
            <h2>Add one to the list.</h2>
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
            <button onClick={deleteCourse}>Delete all courses!</button>
            <div>         
                <h2>Current Courses</h2>
                <ul>   {courses.map(course => {
                    return <li key={course.id}>{course.courseTitle} by {course.school} ({course.courseDate})</li>
                })}
                </ul>
            </div>
        </div>)
}
export default Courses;
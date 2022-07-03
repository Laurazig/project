//form to register for workshop

import React, { useState, useEffect, createRef } from "react";
//import Workshops from "../Views/Workshops";

const FormRegister = props => {

    const [userName, setUserName] = useState("")
    const [userEmail, setUserEmail] = useState("")
    const [num, setNum] = useState("")
    const [select, setSelect] = useState("")
    const [comment, setComment] = useState("")
    const [newsLetter, setNewsLetter] = useState("")
    const [nameChanged, setNameChanged] = useState(false)
    const [emailChanged, setEmailChanged] = useState(false)
    const [numChanged, setNumChanged] = useState(false)
    const [commentChanged, setCommentChanged] = useState(false)
    const [newsLetterChanged, setNewsLetterChanged] = useState(false)


    const nameErrorDiv = createRef();
    const emailErrorDiv = createRef();
    const numErrorDiv = React.createRef();
    const commentLengthErrorDiv = React.createRef();

 
    // useEffect(() => {
    //     if (num.length === 0) {
    //         console.log("num is empty")
    //     } else {
    //         console.log("num has some value")
    //     }
    // })

    const updateData = event => {
        switch (event.target.name) {
            case "user_name":
                setUserName(event.target.value);
                setNameChanged(true);
                break;
            case "user_email":
                setUserEmail(event.target.value);
                setEmailChanged(true);
                break;
            case "num":
                setNum(event.target.value);
                setNumChanged(true);
                break;
            case "select":
                setSelect(event.target.value);
                break;
            case "comment":
                setComment(event.target.value);
                setCommentChanged(true);
                break;
            case "news_letter":
                setNewsLetter(event.target.value);
                setNewsLetterChanged(true)
                break;
            default:
                break;
        }
    }

    const checkEmailFormat = () => {
        if(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+\.[A-Za-z]+$/.test(userEmail)) {
            emailErrorDiv.current.className = "errorNotVisible"
        } else {
            emailErrorDiv.current.className = "errorVisible"
        }
    }

    const checkCommentLength =()=> {
        if (comment.length < 20) {
            commentLengthErrorDiv.current.className = "errorVisible"
        } else {
            commentLengthErrorDiv.current.className = "errorNotVisible"
        }
    }


            // const userData = event => {
            //     event.preventDefault();
            //     console.log("userName", userName);
            //     console.log("num", num);
            //     console.log("select", select);
            //     console.log("comment", comment);
            //     console.log("newsLetter", newsLetter);
            //     setUserName("");
            //     setNameChanged(false)
            //     setUserEmail("");
            //     setNum("");
            //     setNumChanged(false)
            //     setSelect("default");
            //     setComment("");
                
            // }; 
    const submitForm = event => {
        event.preventDefault();
        if ( userName.length > 0 
            && /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+\.[A-Za-z]+$/.test(userEmail) 
            && num.length > 0 
            && comment.length > 20 
            && select !=="default"   ) {
                console.log("userName", userName);
                console.log("num", num);
                console.log("select", select);
                console.log("comment", comment);
                console.log("newsLetter", newsLetter);
                setUserName("");
                setNameChanged(false)
                setUserEmail("");
                setEmailChanged(false);
                setNum("");
                setNumChanged(false)
                setSelect("default");
                setComment("");
                setCommentChanged(false); 
        } else {
            if (userName.length ===0 ) {
                alert("Please enter your name")
            }
            if (userEmail.length === 0 ) {
                alert("please enter your email")
            }
            if (/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+\.[A-Za-z]+$/.test(userEmail) === false ) {
                alert("please enter your email in the correct format")
            }
            if (num.length === 0 ) {
                alert("please state how many people are going")
            }
            if (comment.length <21 ) {
                alert("Comment length should be over 20 characters long")
            }
            if (select === "default" ) {
                alert("please select your workshop")
            } else{
                alert("there is a problem with the data you entered")
            }
            //console.log("problem")
        }

    }

    

    // const checkNameOnBlur = () => {
    //     console.log("the name input lost focus")
    //     console.log(userName.length)
    //     if (userName.trim().length === 0) {
    //         nameErrorDiv.current.style.display = "block";
    //     } else {
    //         nameErrorDiv.current.style.display = "none";
    //     }
    // }


    return (
        <div className="divFormReg">
            <form className="formReg" onSubmit={submitForm} >
                <h2>Register for a workshop (formRegister.js)</h2>
                <div>
                    <label className="workshopFormBlock" htmlFor="user_name">Name:</label>
                    <input id="user_name" name="user_name" onChange={updateData} placeholder="Enter name" />
                    <div className={userName.trim().length === 0 && nameChanged ? "errorVisible" : "errorNotVisible"} ref={nameErrorDiv}>Please enter your name</div>
                </div>

                <div>
                    <label className="workshopFormBlock" htmlFor="user_email">Email: </label>
                    <input  id="user_email" name="user_email" onChange={updateData} onBlur={checkEmailFormat} value={userEmail} placeholder="Enter email"/>
                    <div className="errorNotVisible" ref={emailErrorDiv}>Please enter a correct email address</div>

                    
                </div>

                <div>
                    <label className="workshopFormBlock" htmlFor="num">Number of people:</label>
                    <input  id="num" name="num"  onChange={updateData} value={num} placeholder="Enter number"/>
                    <div className={num.length === 0 && numChanged ? "errorVisible" : "errorNotVisible"} >Please state how many people are going</div>
                    <div className={isNaN(num) && numChanged ? "errorVisible" : "errorNotVisible"} >Please enter a number</div>
                    <div className={num > 10 && numChanged ? "errorVisible" : "errorNotVisible"} >No more than 10 participants per workshop</div>
                </div>

                <div>
                    <label className="workshopFormBlock" htmlFor="select" name="select">Workshop:   </label>
                    <select id="select" name="select" onChange={updateData} value={select}>
                        <option value="default">Please select workshop</option>
                        <option value="vhs">Tailoring basics (VHS)</option>
                        <option value="Daniela">Alladin trousers (Daniela)</option>
                        <option value="Susanne">Hoodie (Susanne)</option>
                    </select>
                </div>

                <div>
                    <label className="workshopFormBlock" htmlFor="comment">Comment:   </label>
                    <textarea  id="comment" name="comment" onChange={updateData} onBlur={checkCommentLength} value={comment} placeholder="Enter comment"></textarea>
                    <div className="errorNotVisible" ref={commentLengthErrorDiv}>Minimum characters: 20</div>
                </div>

                <div>
                    <label className="workshopFormBlock">Signup for the newsletter !</label>
                    <input className="radio_input radio_input_right" type="radio" name="news_letter" onClick={updateData} value="yes" />
                    <label className="radio_label">Yes</label>
                    <input className="radio_input radio_input_left" type="radio" name="news_letter" onClick={updateData} value="no" />
                    {/* why is checked on no?  checked={newsLetter !== "yes"}*/}
                    <label className="radio_label">Maybe later</label>
                </div>
                <div className="form_div">
                    <button id="buttonAdd" >Submit</button>
                </div>

            </form>
        </div>
    )
}
export default FormRegister
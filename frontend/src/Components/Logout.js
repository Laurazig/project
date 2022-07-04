const Logout = props => {
    return (

        
        <button className="enterButton" onClick={props.logout}>Log out</button>
       // localStorage.removeItem(key)
    );
}

export default Logout;
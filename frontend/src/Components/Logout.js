const Logout = props => {
    return (
        <button className="logout-btn" onClick={props.logout}>Log out</button>
       // localStorage.removeItem(key)
    );
}

export default Logout;
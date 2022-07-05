//admin can click button and see number of users


const UsersData = props => {
    const showUserCount = async ()=>{
        const settings = {
            // headers: {
            //     "Authorization": "Bearer " + props.token
            // }
            Credentials: "include"
        }
        const response = await fetch(process.env.REACT_APP_SERVER_URL + `/teacher/${props.currentUserId}/count`, settings);
        const parsedRes = await response.json();

        try {
            if (response.ok) {
                alert(`current number of users: ${parsedRes.count}. COMPONENTS: UserData.js`);
            } else {
                throw new Error(parsedRes.message);
            }
        } catch {
            alert(parsedRes.message);
        }
    }
    return (
        <button className="enterButton" onClick={showUserCount}>View User's Data</button> 
    );
}
export default UsersData;

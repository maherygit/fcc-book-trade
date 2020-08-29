import React, {useState, useEffect, useContext } from 'react';
import userService from '../utils/userService';
import { useStateValue } from '../state/appStateProvider';
import CButton from './UI/CButton'

const Users = (props) => {
  const [users, setUsers] = useState([]);
  const [,setFlashMessage] = useStateValue().flash;

  useEffect(() => {
    retrieveUsersList()
  }, [props.location]);
  
  const retrieveUsersList = async () => {
    const usersList = await userService.getUsers();
    console.log(usersList)
    setUsers(usersList? usersList : []);
  }
  
  async function deleteAllUsers (){
    try{
      let res = await userService.clearUsers();
      console.log("deleteAllUsers res", res)
      retrieveUsersList();
      if(res.status === "OK") { 
        setFlashMessage({kind: 'success', message: `${res.details.data.deletedCount} users successfully deleted`});
      } else {
        console.log('returned from deleteAllUsers', res)
        setFlashMessage({kind: 'error', message: "Problem with the user deletion"});  
      }
    } catch(err){
      console.log("error while deleting users", err);
      setFlashMessage({kind: 'error', message: err.response.error});      
    }
  }
  
 
  return (
    <div className="users_container">
      <nav className="users_toolbar"><CButton onClick={deleteAllUsers}>Clear</CButton></nav>
      <h1> Users </h1>
      <ul className="users_list">
        {
          (users && (users.length > 0))
          && users.map((user,i) => (<li key={i} className="user_item"> { JSON.stringify(users) } </li>))  
          (users && users.length <= 0) && (<p>"No users"</p>)
        }
      </ul>
    </div>
  );
};

export default Users;
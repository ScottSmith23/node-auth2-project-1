import React, { useState, useEffect } from "react";
import {axiosWithAuth} from '../utils/axioswithAuth';

const UserPage = () => {
  const [userList, setUserList] = useState([]);



  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = () => {

    axiosWithAuth()
    .get('http://localhost:5000/api/users')
    .then(res => {
      console.log(res.data);
      setUserList(res.data)
    });

}

  return (
    <>
    <h1>User list</h1>
    <div className='userstuff'>
      
      <div className="userlist">
      {userList.length ? (
        userList.map(user =>
          <>
          <div className="usercard">
             <p>Username: {user.username}</p>
             <p>Department: {user.department}</p>
             </div>
             </>
             )
      ) : (
        <p>you are logged isn't</p>
      )}
      </div>
    </div>
    </>
  );
};

export default UserPage;

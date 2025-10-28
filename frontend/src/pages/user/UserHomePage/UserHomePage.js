import React from 'react';
import {UserDetailsComponent} from "../../../components/UsersComponent/UserDetailsComponent";
import {NavigationComponent} from "../../../components/NavigationComponent/NavigationComponent";


const UserHomePage = () => {
  const userId = localStorage.getItem('userId');

  return (
    <div>
      <h1>Your Home Page</h1>
      <NavigationComponent/>
      <UserDetailsComponent userId={userId}/>
    </div>
  );
};

export { UserHomePage };






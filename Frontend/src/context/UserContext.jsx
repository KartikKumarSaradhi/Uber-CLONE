import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const UserDataContext = createContext()



const UserContext = ({children}) => {

  const [user, setUser] = useState({
    email:'',
    fullName:{
      firstName:'',
      lastName:''
    }
  })

  return (
    <UserDataContext.Provider value={{ user, setUser }}>
      {children}
    </UserDataContext.Provider>
  )
}
UserContext.propTypes = {
  children: PropTypes.node.isRequired,
};

0
export default UserContext
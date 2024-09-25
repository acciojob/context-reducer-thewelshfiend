import React, { useContext } from 'react'
import { AppContext } from './App';

const User = () => {
    const info = useContext(AppContext);

    return (
        <h4 id='current-user'>
            Current user:{info.isLoggedIn ? info.name : ''}, isAuthenticated: {info.isLoggedIn ? 'Yes' : 'No'}
        </h4>
    )
}

export default User
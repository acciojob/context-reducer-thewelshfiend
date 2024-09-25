import React, { useContext } from 'react'
import { AppContext } from './App';

const Display = ({text, id, dispatch}) => {
    const info = useContext(AppContext);

    return (
        <div style={{display: 'flex', gap: '20px', alignItems: 'center'}}>
            <h2 id={`item-${id}`}>{text}</h2>
            <button id={`remove-${id}`} onClick={() => {
                if(info.isLoggedIn)
                {
                    return dispatch({type: 'REMOVE', id: id});
                }
            }}>Remove</button>
        </div>
    )
}

export default Display
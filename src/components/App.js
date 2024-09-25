import React, { createContext, useReducer, useState } from 'react'
import User from './User';
import Display from './Display';

export const AppContext = createContext();

export function dataReducer(state, action)
{
    switch(action.type)
    {
        case 'LOGIN':
            return ({
                ...state,
                isLoggedIn: true
            });
        case 'SIGNOUT':
            return ({
                ...state,
                isLoggedIn: false
            });
        case 'ADD':
            const text = action.item;
            const id = text.toLowerCase().split(' ').join('_');

            return ({
                ...state,
                items: [...state.items, {text, id}]
            });
        case 'CLEAR':
            return ({
                ...state,
                items: []
            });
        case 'REMOVE':
            const tag = action.id;
            return ({
                ...state,
                items: state.items.filter((obj) => obj.id !== tag)
            });
    }
}

function App()
{
    const [data, dispatch] = useReducer(dataReducer, {
        name: 'rohan',
        isLoggedIn: false,
        items: []
    });
    const [value, setValue] = useState('');

    return (
        <AppContext.Provider value={data}>
        <div>
            <div>
                {data.items && data.items.map((obj) => {
                    return <Display key={`item-${obj.id}`} id={obj.id} text={obj.text} dispatch={dispatch} />
                })}
            </div>
            <User />
            <button id='login-btn' onClick={() => dispatch({type: 'LOGIN'})}>Login</button>
            <button id='signout' onClick={() => dispatch({type: 'SIGNOUT'})}>Signout</button>
            <br />
            <input id='shopping-input' type='text' value={value} onChange={(e) => {
                setValue(e.target.value);
            }} />
            <button onClick={() => {
                if(data.isLoggedIn)
                {
                    return dispatch({type: 'ADD', item: value}) && setValue('');
                }
            }} onMouseLeave={() => setValue('')}>Add</button>
            <br />
            <button id='clear-list' onClick={() => {
                if(data.isLoggedIn)
                    {
                        return dispatch({type: 'CLEAR'});
                    }
            }}>Clear List</button>
        </div>
        </AppContext.Provider>
    )
}

export default App
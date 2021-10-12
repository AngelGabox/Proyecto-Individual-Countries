import React from 'react'
import { useHistory } from 'react-router';

const Landing = () => {
    const history = useHistory();
    const handleOnClick = () => history.push('/main')
    return (
        <div> 
            <button onClick={handleOnClick}>Welcome to the jungle</button>
        </div>
    )
}

export default Landing

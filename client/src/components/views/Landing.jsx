import React from 'react'
import { useHistory } from 'react-router';
import '../css/Landing.modules.css'

const Landing = () => {
    const history = useHistory();
    const handleOnClick = () => history.push('/main?from=0')
    return (
        <div> 
            <button class='btn third' onClick={handleOnClick}>Welcome to the jungle</button>
        </div>
    )
}

export default Landing

import React from 'react'
import { Route, Switch } from 'react-router-dom'
import CreateActivity from '../components/form/CreateActivity'
import Nav from '../components/Nav/Nav'
import Home from '../components/views/Home'
import Landing from '../components/views/Landing'
import './index.css'
const index = () => {
    return (
        <div className='divIndex'>
        <header className='header'>    
        <Route path='/main' component={Nav}/>
        </header>
        <Switch>
            <Route exact path='/' component={Landing}/> 
            <Route exact path='/main' component={Home}/>
            <Route path='/main/create_activity' component={CreateActivity}/>
        </Switch>
        </div>
    )
}

export default index

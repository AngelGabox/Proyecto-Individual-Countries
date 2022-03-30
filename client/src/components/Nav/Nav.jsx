import React from 'react'
import SearchBar from './SearchBar'
import { useHistory } from 'react-router'
import styles from '../css/Nav.module.css'

const Nav = () => {
    const history = useHistory()
    return (
        <div className={styles.divContainer}>
            <div className={styles.menu}>   
           <img className={styles.img} src="data:image/png;base64,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"/>
            <h2 className={styles.h2}>Filter by</h2>
            <ul>
                <li>
                    <a onClick={() => history.push(`/main?continent=america&from=0`)}>America</a>
                    <a onClick={() => history.push(`/main?continent=africa&from=0`)}>Africa</a>
                    <a onClick={() => history.push(`/main?continent=europe&from=0`)}>Europe</a>
                    <a onClick={() => history.push(`/main?continent=asia&from=0`)}>Asia</a>
                    <a onClick={() => history.push(`/main?continent=oceania&from=0`)}>Oceania</a>
                </li>
                {/* <li><a onClick={() => history.push('/main')}>Qlo</a></li> */}
            </ul>
            </div>
            <a className={styles.el} onClick={() => history.push('/main?name=&continent=&from=0')}><h2 className={styles.h2}>Home</h2> </a>
            <a className={styles.el} onClick={() => history.push('/main/create_activity')}> <h2 className={styles.h2}>CreateActivity</h2> </a>
            <div>
                <SearchBar/>
            </div>
        </div>
    )
}

export default Nav

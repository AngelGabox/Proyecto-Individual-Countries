import React from 'react'
import { useHistory } from 'react-router'
import styles from './css/CountryCards.module.css'


const CountryCards = ({country}) => {
    const history = useHistory()
    return (
        <div onClick={()=> history.push(`/main?name=${country.name}`)} id={styles.card}>
            <img src={country.flag} alt={country.name} className={styles.img}/>
            <h4>{country.name}</h4>
            <h6>{country.continent}</h6>
        </div>
    )
}

export default CountryCards



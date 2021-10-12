import React from 'react'
import { useHistory } from 'react-router'
import styles from './css/CountryCard.module.css'


const CountryCard = ({country}) => {
    const history = useHistory()
    return (
        <div onClick={()=> history.push(`/main?name=${country.name}`)} id={styles.card}>
            <img src={country.flag} alt={country.name} className={styles.img1}/>
            <h4>{country.id}</h4>
            <h5>{country.name}</h5>
            <ul>
                <li>Capital: {country.capital}</li>
                <li>Subregion: {country.subregion}</li>
                <li>Area: {country.area/1000} Km²</li>
                {
                country.activities.length > 0 &&    
                <li>Actividades Turisticas: </li>
                }
                {country.activities.map(el => (<li>-{el.name}</li>))}
            </ul>
        </div>
    )
}

export default CountryCard
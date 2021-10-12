import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { getAllCountries, byName, byContinent, unmountAllCountries } from '../Redux/actions';
import CountryCard from './CountryCard'
import CountryCards from './CountryCards'
import Pagination from './Pagination'
import styles from './css/Countries.module.css'

const Countries = () => {
    const query = new URLSearchParams(useLocation().search.slice(1))
    const dispatch = useDispatch()  
    const { countries } = useSelector(state => state);
    const name = query.get('name')
    const continent = query.get('continent')
    const from = parseInt(query.get('from'))

    useEffect(() => {
        name? dispatch(byName(name))
        : continent? dispatch(byContinent(continent))                               
        : dispatch(getAllCountries())
        return () => {dispatch(unmountAllCountries())}
    }, [ dispatch, name, continent ])

    return (
        <div className={styles.container}> 
            <div>
           {   
            name && countries.length===1?
            (
                <div className={styles.content}>
                {
                    countries.map(c => <CountryCard key={c.id} country={c} />)    
                }
                </div>
            )          
            :name || continent?
            countries.length<=5?
            (
                <div className={styles.country}>
                <div className={styles.content}>{
                    countries.map(c => <CountryCards key={c.id} country={c} />)    
                    }</div>
                <Pagination className={styles.pagination} countries={countries}/>
                </div>
            )
            :
            (
                <div className={styles.country}>
                <div className={styles.content}>{
                    countries.slice(from, from +5).map(c => <CountryCards key={c.id} country={c}/>)    
                    }</div>
                    <div className={styles.content}>{
                    countries.slice(from+5, from===0? from+9:from+10).map(c => <CountryCards key={c.id} country={c}/>)    
                    }</div>
                <Pagination className={styles.pagination} countries={countries}/>
                </div>
            ):
            countries  && (
                <div className={styles.country}>
                    <div className={styles.content}>{
                        countries.slice(from, from+5).map(c => <CountryCards key={c.id} country={c} />)    
                    }</div>
                    <div className={styles.content}>{
                        countries.slice(from + 5, from===0? from + 9: from+ 10).map(c => <CountryCards key={c.id} country={c} />)    
                    }</div>
                    <Pagination className={styles.pagination} countries={countries}/>
                </div>
            )
            }
            </div>
         </div>
    )
}

export default Countries

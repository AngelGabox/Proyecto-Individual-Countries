import React from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import styles from './css/Pagination.module.css'

const Pagination = ({countries}) => {
    const query = new URLSearchParams(useLocation().search.slice(1))
    const history = useHistory()
    const name = query.get('name')
    const from = query.get('from')
    const continent = query.get('continent')
    const arr = Array(Math.ceil(countries.length/10)).fill(0).map((el, index)=> index)
    const ind = from/10 + 1
    return ( 
    <div id={styles.contain}>
        <div className={styles.container}>  
        {from && from > 0?<button className={styles.flecha} onClick={()=> history.push(`/main?name=${name?name:''}&continent=${continent?continent:''}&from=${parseInt(from)-10}`)}>{'<'}</button>:null}
        {
            arr.length > 1 && arr.map(el =>
                <button className={from && ind-1===el?styles.select:styles.number} key={el} onClick={()=> history.push(`/main?name=${name?name:''}&continent=${continent?continent:''}&from=${el*10}`)}>{el + 1}</button>
                ).slice(from>0? from/10 -1: 0, from===0? from/10 + 3 : from/10 + 2)
        }
        {from/10<arr.length-1?<button className={styles.flecha} onClick={()=> history.push(`/main?name=${name?name:''}&continent=${continent?continent:''}&from=${parseInt(from? from: -10)+10}`)}>{'>'}</button>:null}
        </div>
    </div>         
    )
}

export default Pagination

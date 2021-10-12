import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Countries from '../Countries'
import { byOrder } from '../../Redux/actions'
import styles from '../css/Home.module.css'

const Home = () => {
    const {countries} = useSelector(state => state)
    const dispatch = useDispatch()
    const handleOrder = (e) => {
        e.preventDefault();
        dispatch(byOrder(e.target.value))
    }
    return (
        <div className={styles.home}>
            {
            countries.length > 2 && 
            <select className={styles.order} onChange={handleOrder} >
                <option className={styles.option} value="-">Order</option>
                <option className={styles.option} value="a-z">Asc</option>
                <option className={styles.option} value="z-a">Desc</option>
                <option className={styles.option} value="menorMAYOR">AreaAsc</option>
                <option className={styles.option} value="MAYORmenor">AreaDesc</option>
            </select>
            }
            <Countries/>
        </div>
    )
}

export default Home

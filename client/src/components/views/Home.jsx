import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Countries from '../Countries'
import { byOrder, byActivity } from '../../Redux/actions'
import styles from '../css/Home.module.css'

const Home = () => {
    const {countries, activities} = useSelector(state => state)
    const dispatch = useDispatch()
    const handleOrder = (e) => {
        e.preventDefault();
        dispatch(byOrder(e.target.value))
    }
    const handleActivity = (e) => {
        e.preventDefault();
        dispatch(byActivity(e.target.value))
    }
    return (
        <div className={styles.home}>
            {
            countries.length > 1 && 
            <select className={styles.order} onChange={handleOrder} >
                <option className={styles.option} value="-">Order</option>
                <option className={styles.option} value="a-z">Asc</option>
                <option className={styles.option} value="z-a">Desc</option>
                <option className={styles.option} value="menorMAYOR">AreaAsc</option>
                <option className={styles.option} value="MAYORmenor">AreaDesc</option>
            </select>
            }
            {
            activities.length>0 &&
            <select className={styles.order} onChange={handleActivity} >
                <option className={styles.option} value="">Activity</option>
                {
                    activities.map(el => (<option className={styles.option} value={el}>{el}</option>) )
                }
            </select>
            }
            <Countries/>
        </div>
    )
}

export default Home

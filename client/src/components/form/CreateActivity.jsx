import React, { useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { createActivity, countriesForActivity, unmountCountriesForActivity} from '../../Redux/actions'
import styles from '../css/CreateActivity.module.css'

const CreateActivity = () => {
    const dispatch = useDispatch()
    const { allCountries , countriesAct } = useSelector(state => state);
    const [values, setValues] = useState({
        name:'',
        difficulty:'',
        duration:'',
        season:'',
        country: ''
    })

    const handleChange = ({target: {name, value }}) => {
        setValues({
            ...values,
            [name]: value,
        });
    };
    const handleElim = (e) => {
        e.preventDefault();
        dispatch(unmountCountriesForActivity())
    }
    const handleOnSubmitCountry = (e) => {
        e.preventDefault();
        dispatch(countriesForActivity(values.country))
    }
    const handleOnSubmit = (e) => {
        e.preventDefault();
        console.log('Values:', values)
        if(values.name!==''&&values.difficulty!==''&&values.duration!==''&&values.season!==''&&countriesAct.length >0){
            dispatch(createActivity({...values, countriesAct}))
            setValues({
                name:'',
                difficulty:'',
                duration:'',
                season:'',
                country: ''
            })
            alert('actividad creada con exito')
        }else{
            alert('no se pudo crear la actividad, revisa los datos no pueden estar vacios')
        }
    }

    return (
        <div className={styles.contentForm}>
            <form className={styles.form} onSubmit={handleOnSubmit}>
                <label style={{fontSize:'20px'}}>Name of the activity</label>
                <input className={styles.formu1} name='name' onChange={handleChange} type='text' value={values.name}/>
                <label style={{fontSize:'20px'}}>Difficulty</label>
                <input className={styles.formu2} name='difficulty' onChange={handleChange} type='number' min='1' max='5' value={values.difficulty}/>
                <label style={{fontSize:'20px'}}>Duration</label>
                <input className={styles.formu3} name='duration' onChange={handleChange} type='number' min='5' max='200'value={values.duration} placeholder='Minutos'/>
                <label style={{fontSize:'20px'}}>Season</label>
                <select className={styles.select1} name="season" onChange={handleChange} value={values.season}>
                    <option value="">-</option>
                    {
                        ['Verano', 'Otoño', 'Invierno', 'Primavera', 'Cualquiera'].map(s => (
                            <option className={styles.option1} key={s} value={s}>{s}</option>
                        ))
                    }
                </select>
                    <button className={styles.crear}>Crear</button>  
            </form>
            <div className={styles.form1}>
                <label style={{fontSize:'14px', margin: '0px 0px 0px 150px'}}>Countries</label>
                <div className={styles.orden}>
                <select className={styles.select2} name="country" onChange={handleChange} value={values.country}>
                    <option value=''>-</option>
                    {
                        allCountries.map(s => (
                            <option className={styles.option1} key={s.name} value={s.name}>{s.name}</option>
                            ))
                        }
                </select>
                <button className={styles.sum} onClick={handleOnSubmitCountry}>+</button>
                <botton className={styles.sum} onClick={handleElim}>eliminar</botton>
                </div>
                <div>{countriesAct.map(el => (<li>{el}</li>))}</div>
            </div>
        </div>
    )
}

export default CreateActivity

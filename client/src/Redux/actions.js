import axios from 'axios'

export const GET_ALL_COUNTRIES = 'GET_ALL_COUNTRIES';
export const GET_COUNTRY = 'GET_COUNTRY';
export const CREATE_ACTIVITY = 'CREATE_ACTIVITY';
export const BY_NAME = 'BY_NAME';
export const BY_CONTINENT = 'BY_CONTINENT' 
export const BY_ACTIVITY = 'BY_ACTIVITY'
export const UNMOUNT_ALL_COUNTRIES ='UNMOUNT_ALL_COUNTRIES'
export const COUNTRIES_FOR_ACTIVITY = 'COUNTRIES_FOR_ACTIVITY'
export const UNMOUNT_COUNTRIES_FOR_ACTIVITY = 'UNMOUNT_COUNTRIES_FOR_ACTIVITY'
export const ORDER= 'ORDER'
export const DB_ACTIVITIES = 'DB_ACTIVITIES'
export const getAllCountries = () => dispatch => {
    try {
        return axios.get(`/countries`)
        .then(res => {
            console.log('Countries:', res.data)
            return dispatch({type: GET_ALL_COUNTRIES, payload: res.data})})
    } catch (error) {
        console.log(error)
    }
}
export const byName = (name) => dispatch => {
    try {
        return axios.get(`/countries?name=${name}`)
            .then(res => dispatch({type: BY_NAME, payload: res.data}))
    } catch (error) {
        console.log(error)
    }
}

export const byContinent = (continent) => dispatch => {
    try {
        return axios.get(`/countries?continent=${continent}`)
        .then(res => dispatch({type: BY_CONTINENT, payload: res.data})) 
    } catch (error) {
        console.log(error)
    }
}
export const byActivity = (activity) => dispatch => {
    try {
        return axios.get(`/countries?activity=${activity}`)
            .then(res => dispatch({type: BY_ACTIVITY, payload: res.data}))
    } catch (error) {
        console.log(error)
    }
}
export const activitiesDb = (activity) => dispatch => {
    try {
        return axios.get(`/activity`)
            .then(res => dispatch({type: DB_ACTIVITIES, payload: res.data}))
    } catch (error) {
        console.log(error)
    }
}


export const createActivity = values => dispatch => {
    try{
        return axios.post(`/activity/add`, {...values})
            .then(res => {
                return dispatch({type:CREATE_ACTIVITY, payload: res.data})})
    }catch(err){
        console.log(err)
    }
}
export function byOrder(payload) {
    return {
        type: ORDER,
        payload
    }
}
export const countriesForActivity = payload => ({type:COUNTRIES_FOR_ACTIVITY, payload})
export const unmountCountriesForActivity  = () =>({type:UNMOUNT_COUNTRIES_FOR_ACTIVITY})
export const unmountAllCountries = () =>({type:UNMOUNT_ALL_COUNTRIES})

// export const getCountryById = (id) => dispatch => {
//     try {
//         return axios.get(`'${}/countries/:${id}`)
//             .then(res => dispatch({type: GET_COUNTRY, payload: res.data}))
//     } catch (error) {
//         console.log(error)
//     }
// }

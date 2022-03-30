import { GET_ALL_COUNTRIES,
         BY_NAME, BY_CONTINENT,
         UNMOUNT_ALL_COUNTRIES,
         CREATE_ACTIVITY,
         UNMOUNT_COUNTRIES_FOR_ACTIVITY, 
         COUNTRIES_FOR_ACTIVITY,
         ORDER,
         BY_ACTIVITY,
         DB_ACTIVITIES
         } from "./actions"

const inicialState = {
    allCountries: [],
    countries: [],
    countriesAct: [],
    activities: []
}


function rootReducer(state = inicialState, action){
    switch(action.type){
        case GET_ALL_COUNTRIES:
        return{
            ...state,
            countries: action.payload, 
            allCountries: action.payload.sort((a,b) =>a.name.toLowerCase().localeCompare(b.name.toLowerCase()))
        }
        case CREATE_ACTIVITY:
            console.log('action.payload:', action.payload)
            return{
                ...state,
                countriesAct: []
            }
        case COUNTRIES_FOR_ACTIVITY:
            return action.payload === ''? state : state.countriesAct.includes(action.payload)? state : {
                ...state,
                countriesAct: [ ...state.countriesAct, action.payload]
            }
        case DB_ACTIVITIES:
            return {
                ...state,
                activities: action.payload.map(el => el.name)
            }            
        case BY_NAME:
            return{
                ...state,
                countries: action.payload
            }
        case BY_ACTIVITY:
            return{
                ...state,
                countries: action.payload
            }
        case ORDER:
            const orderName = action.payload === 'a-z' ?
            state.countries.sort(function(a, b) {
                if(a.name > b.name) {
                    return 1;
                }
                if(b.name > a.name) {
                    return -1;
                }
                return 0;
            }) : action.payload === 'z-a'?
            state.countries.sort(function(a, b) {
                if(a.name > b.name) {
                    return -1;
                }
                if(b.name > a.name) {
                    return 1;
                }
                return 0;
            }) : action.payload === 'menorMAYOR'?
            state.countries.sort(function(a, b) {
                if(a.area > b.area) {
                    return -1;
                }
                if(b.area > a.area) {
                    return 1;
                }
                return 0;
            }): action.payload === 'MAYORmenor'?
            state.countries.sort(function(a, b) {
                if(a.area > b.area) {
                    return 1;
                }
                if(b.area > a.area) {
                    return -1;
                }
                return 0;
            }): state.countries
            return {
                ...state,
                characters: orderName
            }
        case BY_CONTINENT:
            return{
                ...state,
                countries: action.payload
            }
        case UNMOUNT_COUNTRIES_FOR_ACTIVITY:
            return{
                ...state,
                countriesAct: []
            }
        case UNMOUNT_ALL_COUNTRIES:
            return{
                ...state,
                // countries: []
            }
        default: return state
    }
}

export default rootReducer
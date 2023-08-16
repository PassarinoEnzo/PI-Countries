import { 
    FETCHCOUNTRIES, 
    ADDACTIVITY, 
    ONSEARCH, 
    ORDER, 
    RESET, 
    PAGE, 
    GETACTIVITY, 
    FILTERCONT, 
    FILTERACT,
    DELETEACTIVITY,
    UPDATEACTIVITY
} from "../actions/actions";

const initialState = {
    allCountries: [],
    pageCountries: [],
    currentPage: 1,
    activity: [],
    filtered: []
}

export default function rootReducer(state=initialState, action){
    switch (action.type) {
        case FETCHCOUNTRIES:
            return {
            ...state,
            allCountries: action.payload,
            pageCountries: action.payload,
            }

        case PAGE:
            return {
                ...state,
                currentPage: action.payload,
            }

        case ADDACTIVITY:
            return {
                ...state,
                activity: action.payload,
            }

        case DELETEACTIVITY:
            return {
                ...state, 
                activity: action.payload,
            }

        case UPDATEACTIVITY:
            return {
                ...state, 
                activity: action.payload,
            }

        case GETACTIVITY:
            return {
                ...state,
                activity: action.payload,
            }

        case ONSEARCH:
            return {
                ...state,
                pageCountries: action.payload,
                filtered: action.payload
            }

        case ORDER:
            let order = state.pageCountries.sort((a,b)=>{
                if(action.payload === "A"){
                    if(a.name > b.name) return 1
                    if(a.name < b.name) return -1
                    return 0
                }else if(action.payload === "Z"){
                    if(a.name > b.name) return -1
                    if(a.name < b.name) return 1
                    return 0
                }else if(action.payload === "MA"){
                    if(a.population > b.population) return -1
                    if(a.population < b.population) return 1
                    return 0
                }else if(action.payload === "ME"){
                    if(a.population > b.population) return 1
                    if(a.population < b.population) return -1
                    return 0
                }
            })
            let orderFilter = state.filtered.sort((a,b)=>{
                if(action.payload === "A"){
                    if(a.name > b.name) return 1
                    if(a.name < b.name) return -1
                    return 0
                }else if(action.payload === "Z"){
                    if(a.name > b.name) return -1
                    if(a.name < b.name) return 1
                    return 0
                }else if(action.payload === "MA"){
                    if(a.population > b.population) return -1
                    if(a.population < b.population) return 1
                    return 0
                }else if(action.payload === "ME"){
                    if(a.population > b.population) return 1
                    if(a.population < b.population) return -1
                    return 0
                }
            })
            return {
                ...state, 
                pageCountries: order,
                filtered: orderFilter,
                currentPage: 1
            }

        case FILTERCONT:
            return {
                ...state, 
                filtered: state.filtered.length ? state.filtered.filter((c) => c.continent === action.payload)
                : state.allCountries.filter((c) => c.continent === action.payload),
                currentPage: 1
            }

        case FILTERACT:
            return {
                ...state, 
                filtered: state.filtered.length ? state.filtered.filter((c) => c.Activities.some((a) => a.name === action.payload))
                 : state.allCountries.filter((c) => c.Activities.some((a) => a.name === action.payload)),
                currentPage: 1
            }

        case RESET:
            return {
                ...state, 
                pageCountries: state.pageCountries,
                filtered: []
            }
    
        default:
            return {
                ...state
            }
    }
}
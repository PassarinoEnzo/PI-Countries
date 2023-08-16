import axios from "axios";

export const FETCHCOUNTRIES = "FETCHCOUNTRIES"
export const GETACTIVITY = "GETACTIVITY"
export const FILTERCONT = "FILTERCONT"
export const DELETEACTIVITY = "DELETE"
export const UPDATEACTIVITY = "UPDATE"
export const FILTERACT = "FILTERACT"
export const ONSEARCH = "ONSEARCH"
export const ADDACTIVITY = "ADD"
export const RESET = "RESET"
export const ORDER = "ORDER"
export const PAGE = "PAGE"

export function fetchCountries(){
    const endpoint = "http://localhost:3001/countries"

    return async (dispatch) => {
        try {
            const response = await axios(endpoint);
            const { data } = response;
            return dispatch({
                type: FETCHCOUNTRIES,
                payload: data,
            })
        } catch (error) {
            alert(error.message)
        }   
    }
}

export function pageHome(page){
    return { type: PAGE, payload: page }
}

export function addActivity(activity){
    const endpoint = "http://localhost:3001/activities"

    return async (dispatch) => {
        try {
            const response = await axios.post(endpoint, activity)
            const { data } = response;
            console.log(data);
            return dispatch({
                type: ADDACTIVITY,
                payload: data
            });
        } catch (error) {
            alert(error.message)
        }
        
    }
}

export function deleteActivity(id){
    const endpoint = "http://localhost:3001/activities/" + id;

    return async (dispatch) => {
      try {
        const response = await axios.delete(endpoint)
        const { data } = response
      return dispatch({
        type: DELETEACTIVITY,
        payload: data,
      });
      } catch (error) {
        alert(error.message)
      }
    };
}

export function updateActivity(id, body){
    const endpoint = "http://localhost:3001/activities/" + id;
    
    return async (dispatch) => {
      try {
        const response = await axios.put(endpoint, body)
        const { data } = response
      return dispatch({
        type: UPDATEACTIVITY,
        payload: data,
      });
      } catch (error) {
        alert(error.message)
      }
    };
}

export function getActivity(){
    const endpoint = "http://localhost:3001/activities"

    return async (dispatch) => {
        try {
            const response = await axios(endpoint)
            const { data } = response;
            return dispatch({
                type: GETACTIVITY,
                payload: data
            })
        } catch (error) {
            alert(error.message)
        }
    }
}

export function onSearch(name){
    const endpoint = "http://localhost:3001/countries/name?name=" + name;

    return async (dispatch) => {
        try {
            const response = await axios(endpoint)
            const { data } = response;
            return dispatch({
                type: ONSEARCH,
                payload: data,
            })
        } catch (error) {
            alert(error.message)
        }
    }
}

export function orderCountries(order){
    return { type: ORDER, payload: order }
}

export function filterContinent(continent){
    return { type: FILTERCONT, payload: continent }
}

export function filterActivity(name){
    return { type: FILTERACT, payload: name }
}

export function reset(){
    return { type: RESET }
}
import axios from "axios";
import store from "./main.js";

axios.defaults.showloader=true;
const URL = "http://localhost:8080/";
export const ENDPOINT = {

    LOGIN: URL + "auth/login",
    USER: URL + "user/",
    GROUP: URL + "group",
    TICKET: URL + "ticket/",
    SIGNOUT: URL + "auth/signOut",
}

export default () =>{
    let headers= {
        'sessionId': store.state.session,
        'token': store.state.token
    };
    const instance = axios.create({
            baseUrl:URL,
            headers,
        }
    );
  return instance;
}
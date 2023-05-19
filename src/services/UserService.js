import axios from "axios";

const USER_API_BASE_URL="http://localhost:8080/api/v1/"

class UserService{
    saveUser(user){
        return axios.post(USER_API_BASE_URL+"register", user);
    }
    loginUser(user){
        return axios.post(USER_API_BASE_URL+"login",user,{withCredentials:true});
    }
    authorizeUser(){
        return axios.get(USER_API_BASE_URL+"auth",{withCredentials:true});
    }
}
// eslint-disable-next-line
export default new UserService();
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
    addVisit(id,body){
        return axios.post(USER_API_BASE_URL+"addVisit/"+id, body);
    }
    addPrescription(id,body){
        return axios.post(USER_API_BASE_URL+"addPrescription/"+id, body);
    }
    getVisits(id){
        return axios.get(USER_API_BASE_URL+"getVisits/"+id);
    }
    getPrescriptions(id){
        return axios.get(USER_API_BASE_URL+"getPrescriptions/"+id)
    }
}
// eslint-disable-next-line
export default new UserService();
import React from 'react'
import {useEffect, useState} from 'react'
import PatientService from '../services/PatientService';
import UserService from '../services/UserService';
import { useNavigate } from 'react-router';
import Cookies from 'universal-cookie'
import jwtDecode from 'jwt-decode';
//import {useParams } from 'react-router';


const UserPage = () => {
  //const [id,setId]=useState('');
  //const paramId=useParams(); //żeby id w ścieżce się zgadzało 
  const [patientProfileExistsFlag, setPatientProfileExistsFlag]=useState(false); // na start zakładam że user nie ma pacjenta
  const navigate=useNavigate();
  const[userRole,setUserRole]=useState("")
  //const[authorized,setAuthorized]=useState(false)
  const [patient, setPatient]=useState({
    id: "",
    firstName:"",
    lastName:"",
    emailId:""
});

  useEffect(() => {
    const cookie = new Cookies();
        const cookieValue = cookie.get('jwt');
        if(cookieValue!==undefined){ //jesli znajdzie cookie 
            const decoded = jwtDecode(cookieValue);
            const role=decoded['role'];
            setUserRole(role);
        }

    const storedId=sessionStorage.getItem('id');
    
    //setId(storedId);
    const checkPatient=async()=>{
    try{
    const response = await PatientService.getPatientByUserId(storedId);
    if(response.status===400){
      setPatientProfileExistsFlag(false)
      console.log("pacjenta nie ma")
    }
    else if (response.data){
      setPatient(response.data)
      setPatientProfileExistsFlag(true)
      console.log(response.data)
    }
    }catch(err){
      //console.log(err);
    }
    };
    checkPatient();  
  }, [])

  

  const authorizeUser = async(caller)=>{
    try{
        const response = await UserService.authorizeUser();
        if(response.data===true){
            if(userRole==='patient'){
                    //navigate(`/addPatient`); //poki co tutaj (testowo)
                    //setAuthorized(true);
                    switch(caller){
                      case "setPatient":
                        navigate(`/addPatient`);
                        break;
                      case "editPatient":
                        //navigate(`/updatePatient/${patient.id}`);
                        sessionStorage.setItem("patient_id",patient.id);
                        navigate(`/updatePatient`);
                        break;
                      case "deletePatient":
                        PatientService.deletePatient(patient.id)
                        window.location.reload();
                        break;
                      case"viewAppointments":
                        sessionStorage.setItem("patient_id",patient.id);
                        navigate(`/viewAppointments`)
                        break;
                      case "viewPrescriptions":
                        sessionStorage.setItem("patient_id",patient.id);
                        navigate(`/viewPrescriptions`)
                        break
                      default:
                        break;
                    }
            }
        }
    }catch(err){
        console.log(err)
    }
}


  return (
      <div>
          <div className='items-center justify-center h-14 w-full my-4 space-y-4 pt-4'>
                <button
                disabled={patientProfileExistsFlag}
                onClick={()=>authorizeUser("setPatient")}
                className='rounded text-white font-semibold bg-blue-600 hover:bg-blue-900 py-4 px-10 flex mx-auto  disabled:bg-gray-400'>
                    Set patient profile
                </button>
                <button
                disabled={!patientProfileExistsFlag}
                onClick={()=>authorizeUser("editPatient")}
                className='rounded text-white font-semibold bg-blue-600 hover:bg-blue-900 py-4 px-10 flex mx-auto  disabled:bg-gray-400'>
                    Edit patient profile
                </button>
                <button
                disabled={!patientProfileExistsFlag}
                onClick={()=>authorizeUser("deletePatient")}
                className='rounded text-white font-semibold bg-blue-600 hover:bg-blue-900 py-4 px-10 flex mx-auto  disabled:bg-gray-400'>
                    Delete patient profile
                </button>
                <button
                disabled={!patientProfileExistsFlag}
                onClick={()=>authorizeUser("viewAppointments")} 
                className='rounded text-white font-semibold bg-blue-600 hover:bg-blue-900 py-4 px-10 flex mx-auto  disabled:bg-gray-400'>
                    View appointments
                </button>
                <button
                disabled={!patientProfileExistsFlag}
                onClick={()=>authorizeUser("viewPrescriptions")} 
                className='rounded text-white font-semibold bg-blue-600 hover:bg-blue-900 py-4 px-10 flex mx-auto  disabled:bg-gray-400'>
                    View prescriptions
                </button>
        </div>
      </div>
  )
}

export default UserPage
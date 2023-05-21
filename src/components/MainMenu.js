import React from 'react'
import { useNavigate} from 'react-router'
import {useEffect, useState} from 'react'
import Cookies from 'universal-cookie'
import jwtDecode from 'jwt-decode';
import UserService from '../services/UserService';


const MainMenu = () => { //tutaj w main menu odebrać cookie 
    const navigate=useNavigate();
    const [patientFlag,setPatientFlag]=useState(true);
    const [doctorFlag,setDoctorFlag]=useState(true);
    const [workerFlag,setWorkerFlag]=useState(true);
    const [userRole,setUserRole]=useState('');

    const [id,setId]=useState('');

    useEffect(() => {
        const storedId=sessionStorage.getItem('id') //w pamieci przegladarki bedzie informacja o id usera
        setId(storedId);
        const cookie = new Cookies();
        const cookieValue = cookie.get('jwt');
        if(cookieValue!==undefined){ //jesli znajdzie cookie 
            const decoded = jwtDecode(cookieValue);
            const role=decoded['role'];
            setUserRole(role);
            //console.log(role);
            switch(role){
                case 'patient':
                    setPatientFlag(false);
                    break;
                case 'doctor':
                    setDoctorFlag(false);
                    break;
                case 'worker':
                    setWorkerFlag(false);
                    break;
                default:
                    break;
            }
            switch(id){ //musi być jakieś id w pamięci żeby móc przejść do innej zakładki (musimy wiedzieć potem kto korzysta)
                case null:
                    setDoctorFlag(true);
                    setPatientFlag(true);
                    setWorkerFlag(true);
                    break;
                default:
                    break;
            }
        }
    }, [id]);

    const authorizeUser = async()=>{
        try{
            const response = await UserService.authorizeUser();
            if(response.data===true){
                switch(userRole){
                    case 'patient':
                        navigate(`/userPage`); //poki co tutaj (testowo)
                        break;
                    case 'doctor':
                        navigate("/patientList");
                        break;
                    case 'worker':
                        navigate("/patientList");
                        break;
                    default:
                        break;
                }
            }
        }catch(err){
            console.log(err)
        }
    }

    const signOut=()=>{
        sessionStorage.removeItem("id")
        sessionStorage.removeItem("patient_id")
        const cookie = new Cookies();
        cookie.remove("jwt");
        window.location.reload();
    }

  return (
    <div>
        <div className='items-center justify-center h-14 w-full my-4 space-y-4 pt-4'>  
                <button
                disabled={!(doctorFlag&&patientFlag&&workerFlag)}
                onClick={()=> navigate("/login")}
                className='rounded text-white font-semibold bg-blue-600 hover:bg-blue-900 py-4 px-10 flex mx-auto  disabled:bg-gray-400'>
                    Sign in
                </button>
                <button
                disabled={patientFlag}
                onClick={()=>authorizeUser()}
                className='rounded text-white font-semibold bg-blue-600 hover:bg-blue-900 py-4 px-10 flex mx-auto  disabled:bg-gray-400'>
                    Patient Section
                </button>
                <button
                disabled={workerFlag}
                onClick={()=>authorizeUser()}
                className='rounded text-white font-semibold bg-blue-600 hover:bg-blue-900 py-4 px-10 flex mx-auto  disabled:bg-gray-400'>
                    Administration Section
                </button>
                <button 
                disabled={doctorFlag}
                onClick={()=>authorizeUser()} 
                className='rounded text-white font-semibold bg-blue-600 hover:bg-blue-900 py-4 px-10 flex mx-auto  disabled:bg-gray-400'>
                    Doctor Section
                </button>
                <button 
                disabled={(doctorFlag&&patientFlag&&workerFlag)}
                onClick={()=>signOut()} 
                className='rounded text-white font-semibold bg-blue-600 hover:bg-blue-900 py-4 px-10 flex mx-auto  disabled:bg-gray-400'>
                    Sign Out
                </button>
        </div>
    </div>
  )
}

export default MainMenu
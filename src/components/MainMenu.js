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
    //const [token,setToken]=useState("");
    useEffect(() => {
        const cookie = new Cookies();
        const cookieValue = cookie.get('jwt');
        //setToken(cookieValue);
        if(cookieValue!==undefined){ //jesli znajdzie cookie 
            const decoded = jwtDecode(cookieValue);
            const role=decoded['role'];
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
        }
    }, []);

  return (
    <div>
        <div className='items-center justify-center h-14 w-full my-4 space-y-4 pt-4'>
                <button
                onClick={()=> navigate("/login")}
                className='rounded text-white font-semibold bg-blue-600 hover:bg-blue-900 py-4 px-10 flex mx-auto'>
                    Sign in
                </button>
                <button
                disabled={patientFlag}
                onClick={()=>UserService.authorizeUser()}
                className='rounded text-white font-semibold bg-blue-600 hover:bg-blue-900 py-4 px-10 flex mx-auto  disabled:bg-gray-400'>
                    Patient Section
                </button>
                <button
                disabled={workerFlag} 
                className='rounded text-white font-semibold bg-blue-600 hover:bg-blue-900 py-4 px-10 flex mx-auto  disabled:bg-gray-400'>
                    Administration Section
                </button>
                <button 
                disabled={doctorFlag} 
                className='rounded text-white font-semibold bg-blue-600 hover:bg-blue-900 py-4 px-10 flex mx-auto  disabled:bg-gray-400'>
                    Doctor Section
                </button>
        </div>
    </div>
  )
}

export default MainMenu
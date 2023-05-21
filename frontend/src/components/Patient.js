import React from 'react'
import {useEffect, useState} from 'react'
import { useNavigate } from 'react-router';
import UserService from '../services/UserService';
import Cookies from 'universal-cookie'
import jwtDecode from 'jwt-decode';


const Patient = ({patient}) => {
        const navigate=useNavigate(); 
        const[userRole,setUserRole]=useState("")
        
        const addPrescription=(id)=>{
            sessionStorage.setItem('patient_id',id);
            navigate("/addPrescription")
        }

        const addVisit=(id)=>{
            //e.preventDefault();
            sessionStorage.setItem('patient_id',id);
            navigate("/addVisit")
        };

        const authorizeUser = async(id,caller)=>{
            try{
                const response = await UserService.authorizeUser();
                if(response.data===true){
                    
                            //navigate(`/addPatient`); //poki co tutaj (testowo)
                            //setAuthorized(true);
                            switch(caller){
                                case "addVisit":
                                    addVisit(id);
                                    break;
                                case "addPrescription":
                                    addPrescription(id);
                                    break;
                                default:
                                    break;
                            }
                }
            }catch(err){
                console.log(err)
            }
        }
        
        useEffect(() => {
            const cookie = new Cookies();
                const cookieValue = cookie.get('jwt');
                if(cookieValue!==undefined){ //jesli znajdzie cookie 
                    const decoded = jwtDecode(cookieValue);
                    const role=decoded['role'];
                    setUserRole(role);
                }
                
            },[])
  
    return (
    <tr key={patient.id}>
                        <td className="text-left px-6 py-4 whitespace-nowrap">
                            <div className='text-sm text-gray-700' >
                                {patient.firstName}
                            </div>
                        </td>
                        <td className="text-left px-6 py-4 whitespace-nowrap">
                            <div className='text-sm text-gray-700' >
                            {patient.lastName}
                            </div>
                        </td>
                        <td className="text-left px-6 py-4 whitespace-nowrap">
                            <div className='text-sm text-gray-700' >
                            {patient.emailId}
                            </div>
                        </td>
                        <td className="text-right px-6 py-4 whitespace-nowrap font-medium text-small">
                            {userRole==='worker' && (<span 
                            onClick={()=>authorizeUser(patient.id, "addVisit")}
                            className='text-indigo-600 hover:text-indigo-900 px-2 hover:cursor-pointer'>
                                Add Visit</span>)}
                            {userRole==='doctor' && (<span 
                            onClick={()=>authorizeUser(patient.id, "addPrescription")}
                            className='text-indigo-600 hover:text-indigo-900 px-1 hover:cursor-pointer'>
                                Add Prescription</span>)}
                        </td>
    </tr>
  );
};

export default Patient
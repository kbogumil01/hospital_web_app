import React, { useState } from 'react'
import PatientService from '../services/PatientService';
import { useNavigate } from 'react-router';

const AddPatient = () => {
  
    const [patient, setPatient] = useState({
        id: "",
        firstName:"",
        lastName:"",
        emailId:"",
    });

    const navigate=useNavigate();

    const handleChange = (e) =>{
        const value = e.target.value;
        setPatient({...patient, [e.target.name]:value});
    };

    const savePatient = (e) =>{
        e.preventDefault();
        PatientService.savePatient(patient)
        .then((response)=>{
            console.log(response);
            navigate("/patientList")
        })
        .catch((error)=>{
            console.log(error);
        });
    };

    const reset=(e)=>{
        e.preventDefault();
        setPatient({
            id: "",
            firstName:"",
            lastName:"",
            emailId:"",
        });
    }

    return (
    <div className='flex max-w-2xl mx-auto shadow border-b'>
        <div className='px-8 py-8'>
            <div className='font-thin text-2xl tracking-wider'>
                <h1>Register new patient</h1>
            </div>
            <div className='items-center justify-center h-14 w-full my-4'>
                <label className='block text-gray-600 text-sm font-normal'>First Name</label>
                <input
                    type="text" 
                    name="firstName"
                    value={patient.firstName}
                    onChange={(e)=> handleChange(e)}
                    className='h-10 w-96 border mt-2 px-2 py-2'></input>
            </div>
            <div className='items-center justify-center h-14 w-full my-4'>
                <label className='block text-gray-600 text-sm font-normal'>Last Name</label>
                <input
                    type="text"
                    name="lastName"
                    value={patient.lastName} 
                    onChange={(e)=> handleChange(e)}
                    className='h-10 w-96 border mt-2 px-2 py-2'></input>
            </div>
            <div className='items-center justify-center h-14 w-full my-4'>
                <label className='block text-gray-600 text-sm font-normal'>E-mail</label>
                <input 
                    type="email"
                    name="emailId"
                    value={patient.emailId}  
                    onChange={(e)=> handleChange(e)}
                    className='h-10 w-96 border mt-2 px-2 py-2'></input>
            </div>

            <div className='items-center justify-center h-14 w-full my-4 space-x-4 pt-4'>
                <button onClick={savePatient} className='rounded text-white font-semibold bg-green-600  hover:bg-green-900 py-2 px-6'>
                    Register
                </button>
                <button
                onClick={reset} 
                className='rounded text-white font-semibold bg-red-500  hover:bg-red-900 py-2 px-6'>
                    Clear
                </button>
                
            </div>
            <button onClick={()=> navigate("/patientList")}
                className='rounded bg-blue-600 text-white px-6 py-2 font-semibold hover:bg-blue-900 mt-7 block'>
                    View all Patients...
            </button>
            <button onClick={()=> navigate("/mainMenu")}
                className='rounded bg-blue-600 text-white px-6 py-2 font-semibold hover:bg-blue-900 mt-4'>
                    Main Menu
            </button>
        </div>
    </div>
  )
}

export default AddPatient
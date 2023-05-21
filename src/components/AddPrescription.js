import React from 'react'
import {useState} from 'react'
import UserService from '../services/UserService';
import { useNavigate } from 'react-router';


export const AddPrescription = () => {
    const patientId=sessionStorage.getItem("patient_id")
    const navigate=useNavigate();

    const [prescription, setPrescription] = useState('');

    const onInputChange = (e) => {
        e.preventDefault();
        const value = e.target.value;
        setPrescription(value);
        };
        
    
    const authorize = async()=>{
        try{
            const response = await UserService.authorizeUser();
            if(response.data===true){
                    const body={"description": prescription};
                    const resp= await UserService.addPrescription(patientId,body)
                    if(resp.status===200){
                        navigate("/patientList")
                    }
                    //tutaj axios i dodanie wizyty do pacjenta      
            }
        }catch(err){
            console.log(err)
        }
    }


  return (
    <div className='flex max-w-2xl mx-auto shadow border-b'>
        <div className='px-8 py-8'>
            <div className='font-thin text-2xl'>
                <h1>Describe prescription for a Patient</h1>
            </div>
            <div className='items-center justify-center h-14 w-full my-4'>
                <input
                    type="text" 
                    value={prescription}
                    onChange={onInputChange}
                    className='h-10 w-96 border mt-2 px-2 py-2'></input>
            </div>
            <button
                onClick={()=>authorize()} 
                className='rounded text-white font-semibold bg-blue-600  hover:bg-blue-900 py-2 px-6'>
                    Save
            </button>
        </div>
        
    </div>
  )
}
export default AddPrescription
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import PatientService from '../services/PatientService';
import Patient from './Patient';

const PatientList = () => {

    const navigate=useNavigate();

    const[loading, setLoading] = useState(true);
    const[patients, setPatients]=useState(null);
    
    useEffect(() => {
        const fetchData= async()=>{
            setLoading(true);
            try{
                const response= await PatientService.getPatients();
                setPatients(response.data);
            }catch(error){
                console.log(error);
            }
            setLoading(false);
        };
        fetchData();
    }, []);
    
    const deletePatient = (e,id)=>{
        e.preventDefault();
        PatientService.deletePatient(id).then((res)=>{
            if(patients){
                setPatients((prevElement)=>{
                    return prevElement.filter((patient)=> patient.id!==id);
                });
;            }
        });
    };

  return (
    <div className="container mx-auto my-6">
        <div className="h-12">
            <button
             onClick={()=> navigate("/mainMenu")}
             className='rounded bg-blue-600 text-white px-6 py-2 font-semibold hover:bg-blue-900'>Main Menu</button>
        </div>
        <div className="h-12">
            <button
             onClick={()=> navigate("/addPatient")}
             className='rounded bg-blue-600 text-white px-6 py-2 font-semibold hover:bg-blue-900'>Add new patient</button>
        </div>
        <div className='flex shadow border-b'>
            <table className='min-w-full'>
                <thead className='bg-blue-200'>
                    <tr>
                        <th className='text-left font-medium text-blue-950 uppercase tracking-wider py-3 px-6'>
                            First Name
                        </th>
                        <th className='text-left font-medium text-blue-950 uppercase tracking-wider py-3 px-6'>
                            Last Name
                        </th>
                        <th className='text-left font-medium text-blue-950 uppercase tracking-wider py-3 px-6'>
                            Email
                        </th>
                        <th className='text-right font-medium text-blue-950 uppercase tracking-wider py-3 px-6'>
                            Actions
                        </th>
                    </tr>
                </thead>
                {!loading && (
                <tbody className='bg-white'>
                    {patients.map((patient)=>(
                        <Patient patient={patient} 
                        deletePatient={deletePatient} 
                        key={patient.id}></Patient>
                    ))}
                </tbody>)}
            </table>
        </div>
    </div>
  )
}
export default PatientList
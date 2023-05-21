import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import UserService from '../services/UserService';
import Prescription from './Prescription';

const ViewPrescriptions = () => {
    const patientId=sessionStorage.getItem("patient_id");
    const navigate=useNavigate();

    const[loading, setLoading] = useState(true);
    const[prescriptions, setPrescriptions]=useState(null);

    useEffect(() => {
      const fetchData= async()=>{
          setLoading(true);
          try{
              const response= await UserService.getPrescriptions(patientId);
              setPrescriptions(response.data);
              //console.log(response.data)
          }catch(error){
              console.log(error);
          }
          setLoading(false);
      };
      fetchData();
    }, [patientId]);

  
    return (
    <div className="container mx-auto my-6">
      <div className="h-12">
            <button
             onClick={()=> navigate("/userPage")}
             className='rounded bg-blue-600 text-white px-6 py-2 font-semibold hover:bg-blue-900'>
                User Menu</button>
        </div>
        <div className='flex shadow border-b'>
            <table className='min-w-full'>
                <thead className='bg-blue-200'>
                    <tr>
                        <th className='text-left font-medium text-blue-950 uppercase tracking-wider py-3 px-6'>
                            PRESCRIPTION_ID
                        </th>
                        <th className='text-left font-medium text-blue-950 uppercase tracking-wider py-3 px-6'>
                            DESCRIPTION
                        </th>
                    </tr>
                </thead>
                {!loading && (
                <tbody className='bg-white'>
                    {prescriptions.map((prescription)=>(
                        <Prescription prescription={prescription} 
                        key={prescription.id}></Prescription>
                    ))}
                </tbody>)}
            </table>
        </div>
    </div>
  )
}

export default ViewPrescriptions
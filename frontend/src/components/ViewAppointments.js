import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import UserService from '../services/UserService';
import Appointment from './Appointment';

const ViewAppointments = () => {
    const patientId=sessionStorage.getItem("patient_id");
    const navigate=useNavigate();

    const[loading, setLoading] = useState(true);
    const[appointments, setAppointments]=useState(null);

    useEffect(() => {
      const fetchData= async()=>{
          setLoading(true);
          try{
              const response= await UserService.getVisits(patientId);
              setAppointments(response.data);
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
             className='rounded bg-blue-600 text-white px-6 py-2 font-semibold hover:bg-blue-900'>User Menu</button>
        </div>
        <div className='flex shadow border-b'>
            <table className='min-w-full'>
                <thead className='bg-blue-200'>
                    <tr>
                        <th className='text-left font-medium text-blue-950 uppercase tracking-wider py-3 px-6'>
                            VISIT_ID
                        </th>
                        <th className='text-left font-medium text-blue-950 uppercase tracking-wider py-3 px-6'>
                            DATE
                        </th>
                    </tr>
                </thead>
                {!loading && (
                <tbody className='bg-white'>
                    {appointments.map((appointment)=>(
                        <Appointment appointment={appointment} 
                        key={appointment.id}></Appointment>
                    ))}
                </tbody>)}
            </table>
        </div>
    </div>
  )
}

export default ViewAppointments
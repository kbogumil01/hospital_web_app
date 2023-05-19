import React from 'react';
import { useNavigate } from 'react-router';

const WorkerMenu = () => {
    const navigate=useNavigate();
    return (
    <div>
        <div className='items-center justify-center h-14 w-full my-4 space-y-4 pt-4'>
                <button onClick={()=>navigate("/patientList")}
                className='rounded text-white font-semibold bg-blue-600 hover:bg-blue-900 py-4 px-10 flex mx-auto'>
                    View all Patients
                </button>
                <button onClick={()=>navigate("/addPatient")}
                className='rounded text-white font-semibold bg-blue-600 hover:bg-blue-900 py-4 px-10 flex mx-auto'>
                    Register New Patient
                </button>
                <button 
                className='rounded text-white font-semibold bg-blue-600 hover:bg-blue-900 py-4 px-10 flex mx-auto'>
                    Search for Patient...
                </button>
                <button 
                className='rounded text-white font-semibold bg-blue-600 hover:bg-blue-900 py-4 px-10 flex mx-auto'>
                    Sign Out...
                </button>
        </div>
    </div>
  )
}

export default WorkerMenu
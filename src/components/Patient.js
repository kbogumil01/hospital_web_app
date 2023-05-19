import React from 'react'
import { useNavigate } from 'react-router';

const Patient = ({patient, deletePatient}) => {
        const navigate=useNavigate(); 
        
        const editPatient=(e,id)=>{
            e.preventDefault();
            navigate(`/updatePatient/${id}`);
        };

  
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
                            <a href="/#"
                            onClick={(e,id)=>editPatient(e,patient.id)}
                            className='text-indigo-600 hover:text-indigo-900 px-4 hover:cursor-pointer'>
                                Edit</a>
                            <a href="/#"
                            onClick={(e,id)=>deletePatient(e, patient.id)} 
                            className='text-indigo-600 hover:text-indigo-900 hover:cursor-pointer'>
                                Delete</a>
                        </td>
    </tr>
  );
};

export default Patient
import React from 'react'
import { useEffect,useState } from 'react';
import { useNavigate} from 'react-router';
import PatientService from '../services/PatientService';

const UpdatePatient = () => {
    const navigate = useNavigate();
    const id=sessionStorage.getItem("patient_id")
    const [patient, setPatient] = useState({
        id: id,
        firstName:"",
        lastName:"",
        emailId:"",
    });

    const handleChange = (e) =>{
        const value = e.target.value;
        setPatient({...patient, [e.target.name]:value});
    };

    useEffect(() => { //wykonanie od razu przy załadowaniu 
      const fetchData = async()=>{
        try{
            const response= await PatientService.getPatientById(patient.id);
            setPatient(response.data);
        }catch(error){
            console.log(error);
        }
      };
      fetchData();
    }, [patient.id]); //jeśli w brackecie będzie zmienna to useEffect wykona się przy zmianie tej zmiennej
    

    const updatePatient=(e)=>{
        e.preventDefault();
        PatientService.updatePatient(patient, id)
        .then((response)=>{
            navigate("/userPage");
        })
        .catch((error)=>{
            console.log(error);
        });
    };
  return (
    <div className='flex max-w-2xl mx-auto shadow border-b'>
        <div className='px-8 py-8'>
            <div className='font-thin text-2xl tracking-wider'>
                <h1>Update patient</h1>
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
                <button onClick={updatePatient} className='rounded text-white font-semibold bg-blue-600  hover:bg-blue-900 py-2 px-6'>
                    Update
                </button>
                <button
                onClick={()=>navigate("/userPage")}
                className='rounded text-white font-semibold bg-red-500  hover:bg-red-900 py-2 px-6'>
                    Cancel
                </button>
            </div>
        </div>
    </div>
  )
}

export default UpdatePatient;
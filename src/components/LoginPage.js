import React from 'react';
import { useNavigate } from 'react-router';
import {useState} from 'react';
import UserService from '../services/UserService';

const LoginPage = () => {
    const navigate=useNavigate();
    
    const [input, setInput] = useState({
        login: '',
        password: ''
    });

    const [failedLogin, setFailedLogin]= useState(false);

    const onInputChange = (e) => {
        setFailedLogin(false);
        e.preventDefault();
        const { name, value } = e.target;
        setInput(prev => ({
            ...prev,
            [name]: value
        }));
    }

    const loginUser = (e) =>{
        e.preventDefault();
        const user={login:input.login, password:input.password};
        UserService.loginUser(user)
        .then((response)=>{
            console.log(response);
            const id=response.data.id;
            sessionStorage.setItem('id',id);
            navigate(`/`); //na razie tutaj do main menu
        })
        .catch((error)=>{
            setFailedLogin(true)
            console.log(error);
        });
    };

  return (
    <div className='flex max-w-2xl mx-auto shadow border-b'>
        <div className='px-8 py-8'>
            <div className='font-thin text-2xl'>
                <h1>Sign in</h1>
                {failedLogin&&<h1 className='text-red-700 text-lg'>Login failed!</h1>}
            </div>
            <div className='items-center justify-center h-14 w-full my-4'>
                <label className='block text-gray-600 text-sm font-normal'>login</label>
                <input
                    type="text" 
                    name="login"
                    value={input.login}
                    onChange={onInputChange}
                    className='h-10 w-96 border mt-2 px-2 py-2'></input>
            </div>
            <div className='items-center justify-center h-14 w-full my-4'>
                <label className='block text-gray-600 text-sm font-normal'>password</label>
                <input
                    type="password"
                    name="password"
                    value={input.password}
                    onChange={onInputChange}
                    className='h-10 w-96 border mt-2 px-2 py-2'></input>
            </div>
            <div className='items-center justify-center h-14 w-full my-4 space-x-4 pt-4'>
                <button
                onClick={loginUser} 
                className='rounded text-white font-semibold bg-blue-600  hover:bg-blue-900 py-2 px-6  disabled:bg-gray-400'>
                    Sign in
                </button>
                <button
                onClick={()=> navigate("/addUser")}
                className='rounded text-white font-semibold bg-purple-700  hover:bg-gray-900 py-2 px-6'>
                    I don't have an account yet...
                </button>
                
        </div>
        </div>
    </div>
  )
}

export default LoginPage
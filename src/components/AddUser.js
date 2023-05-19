import React from 'react';
import {useState} from 'react';
import { useNavigate } from 'react-router';
import UserService from '../services/UserService';

const AddUser = () => {
    const navigate=useNavigate();

    const[buttonFlag, setButtonFlag]=useState(true);
    
    const [input, setInput] = useState({
        login: '',
        password: '',
        confirmPassword: ''
    });

    const [error, setError] = useState({
        login: '',
        password: '',
        confirmPassword: ''
    });

    const [loginTaken, setLoginTaken]=useState(false);
  
    const onInputChange = (e) => {
        e.preventDefault();
        setLoginTaken(false);
        const { name, value } = e.target;
        setInput(prev => ({
            ...prev,
            [name]: value
        }));
        validateInput(e);
    }
   
    const validateInput = (e) => {
        e.preventDefault()
        let { name, value } = e.target;
        setError(prev => {
          const stateObj = { ...prev, [name]: "" };
       
          switch (name) {
            case "login":
              if (!value) {
                stateObj[name] = "Please enter Login.";
              }
              break;
       
            case "password":
              if (!value) {
                stateObj[name] = "Please enter Password.";
              } else if (input.confirmPassword && value !== input.confirmPassword) {
                stateObj["confirmPassword"] = "wrong Confirmation";
              }else if(value.length<8){
                stateObj[name]= "Type more than 8 characters"
              }else {
                stateObj["confirmPassword"] = input.confirmPassword ? "" : error.confirmPassword;
              }
              break;
       
            case "confirmPassword":
              if (!value) {
                stateObj[name] = "Please confirm Password.";
              } else if (input.password && value !== input.password) {
                stateObj[name] = "wrong Confirmation";
              } 
              break;
       
            default:
              break;
          }
          canButtonBeEnabled();
          return stateObj;
        });
    }

    const canButtonBeEnabled=()=>
    {
        if(input.login!=="" && input.password.length>=8 && input.password===input.confirmPassword){
            setButtonFlag(false);
        }else{
            setButtonFlag(true);
        }
    }

    const saveUser = (e) =>{
      e.preventDefault();
      const user={login:input.login, password:input.password, role:"patient"};
      UserService.saveUser(user)
      .then((response)=>{
          console.log(response);
          navigate("/login");
      })
      .catch((error)=>{
          console.log(error);
          setLoginTaken(true);
      });
  };
  
    return (
    <div className='flex max-w-2xl mx-auto shadow border-b'>
        <div className='px-8 py-8'>
            <div className='font-thin text-2xl'>
                <h1>Register</h1>
                {loginTaken&&<h1 className='text-red-700 text-lg'>Login already taken!</h1>}
            </div>
            <div className='items-center justify-center h-14 w-full my-4'>
                <label className='block text-gray-600 text-sm font-normal'>login</label>
                <input
                    type="text" 
                    name="login"
                    value={input.login}
                    onChange={onInputChange}
                    onBlur={validateInput}
                    className='h-10 w-96 border mt-2 px-2 py-2'></input>
                {error.login && <span className='err px-4 text-red-700 font-thin'>{error.login}</span>}    
            </div>
            <div className='items-center justify-center h-14 w-full my-4'>
                <label className='block text-gray-600 text-sm font-normal'>password</label>
                <input
                    type="password"
                    name="password"
                    value={input.password}
                    onChange={onInputChange}
                    onBlur={validateInput}
                    className='h-10 w-96 border mt-2 px-2 py-2'></input>
                 {error.password && <span className='err px-4 text-red-700 font-thin'>{error.password}</span>}
            </div>
            <div className='items-center justify-center h-14 w-full my-4'>
                <label className='block text-gray-600 text-sm font-normal'>confirm password</label>
                <input
                    type="password"
                    name="confirmPassword"
                    value={input.confirmPassword}
                    onChange={onInputChange}
                    onBlur={validateInput}
                    className='h-10 w-96 border mt-2 px-2 py-2'></input>
                 {error.confirmPassword && <span className='err text-red-700 font-thin px-4'>{error.confirmPassword}</span>}
            </div>
 
            <div className='items-center justify-center h-14 w-full my-4 space-x-4 pt-4'>
                <button
                disabled={buttonFlag}
                name="registerButton"
                onClick={saveUser}
                className='rounded text-white font-semibold bg-blue-600  hover:bg-blue-900 py-2 px-6 mt-4 disabled:bg-gray-400'>
                    Register
                </button>
        </div>
        </div>
        
    </div>
  )
}

export default AddUser
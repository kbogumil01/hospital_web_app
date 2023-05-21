import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import AddPatient from './components/AddPatient';
import Navbar from './components/Navbar';
import PatientList from './components/PatientList';
import UpdatePatient from './components/UpdatePatient';
import ViewAppointments from './components/ViewAppointments';
import ViewPrescriptions from './components/ViewPrescriptions';
import LoginPage from './components/LoginPage';
import AddUser from './components/AddUser';
import AddVisit from './components/AddVisit';
import AddPrescription from './components/AddPrescription';
import MainMenu from './components/MainMenu';
import UserPage from './components/UserPage';
function App() {
  return(
    <>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route index element={<MainMenu/>}/>
          <Route path="/" element={<MainMenu/>}></Route>
          <Route path="/login" element={<LoginPage/>}></Route>
          <Route path="/patientList" element={<PatientList/>}/>
          <Route path="/addPatient" element={<AddPatient/>}/>
          <Route path="/addUser" element={<AddUser/>}/>
          <Route path='/updatePatient' element={<UpdatePatient/>}/>
          <Route path='/viewAppointments' element={<ViewAppointments/>}/>
          <Route path='/viewPrescriptions' element={<ViewPrescriptions/>}/>
          <Route path='/userPage' element={<UserPage/>}/>
          <Route path='/addVisit' element={<AddVisit/>}/>
          <Route path='/addPrescription' element={<AddPrescription/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
